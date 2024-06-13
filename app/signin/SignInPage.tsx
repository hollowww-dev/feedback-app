"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNotify } from "../contexts/notificationHooks";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../lib/authSchema";
import Cookies from "js-cookie";

import styles from "../components/Form.module.scss";

import Button from "../components/Button";
import { login } from "@/actions";
import { useQueryClient } from "@tanstack/react-query";
import getUser from "../services/getUser";

type Inputs = {
	username: string;
	password: string;
};

const SignInPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ resolver: zodResolver(signInSchema) });

	const notify = useNotify();

	const router = useRouter();

	const queryClient = useQueryClient();

	const submit: SubmitHandler<Inputs> = async (data: Inputs) => {
		try {
			const accessToken = await login(data);
			Cookies.set("currentUser", accessToken);
			const user = await getUser();
			await queryClient.setQueryData(["me"], user);
			router.replace("/");
			notify(`You have been successfully logged in!`);
		} catch (e) {
			if (e instanceof Error) {
				notify(e.message);
				console.log(e);
			} else {
				notify("Something went wrong.");
			}
		}
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit(submit)}>
				<h2>Login</h2>
				<label htmlFor="username">
					<h4>Username</h4>
				</label>
				<div className={styles.input}>
					<input {...register("username")} className={errors?.username?.message ? styles.error : undefined} id="username" />
					<span className={styles.errorMessage}>{errors?.username?.message && errors.username.message}</span>
				</div>
				<label htmlFor="password">
					<h4>Password</h4>
				</label>
				<div className={styles.input}>
					<input {...register("password")} type="password" className={errors?.password?.message ? styles.error : undefined} id="password" />
					<span className={styles.errorMessage}>{errors?.password?.message && errors.password.message}</span>
				</div>
				<div className={styles.buttons}>
					<Button type="submit" label="Login" variant="primary" disabled={isSubmitting} />
					<Button type="button" label="Cancel" variant="secondary" disabled={isSubmitting} onClick={() => router.back()} />
				</div>
			</form>
		</div>
	);
};

export default SignInPage;
