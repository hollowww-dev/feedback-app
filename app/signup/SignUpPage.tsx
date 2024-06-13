"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "../lib/authSchema";

import styles from "../components/Form.module.scss";

import Button from "../components/Button";
import { createUser } from "../../actions";
import { useNotify } from "../contexts/notificationHooks";
import { useRouter } from "next/navigation";
import { createUserHandler } from "../services/auth";

type Inputs = {
	username: string;
	name: string;
	password: string;
	devPassword?: string;
};

const SignUpPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ resolver: zodResolver(signUpSchema) });

	const notify = useNotify();

	const router = useRouter();

	const submit: SubmitHandler<Inputs> = async (data: Inputs) => {
		try {
			const response = await createUserHandler(data);
			router.replace("/signin");
			notify(`User ${response?.name} (${response?.username}) created!`);
		} catch (e) {
			if (e instanceof Error) {
				notify(e.message);
				console.error(e);
			} else {
				notify("Something went wrong.");
				console.error(e);
			}
		}
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit(submit)}>
				<h2>Register</h2>
				<label htmlFor="username">
					<h4>Username</h4>
				</label>
				<div className={styles.input}>
					<input {...register("username")} className={errors?.username?.message ? styles.error : undefined} id="username" />
					<span className={styles.errorMessage}>{errors?.username?.message && errors.username.message}</span>
				</div>
				<label htmlFor="name">
					<h4>Name</h4>
				</label>
				<div className={styles.input}>
					<input {...register("name")} className={errors?.name?.message ? styles.error : undefined} id="name" />
					<span className={styles.errorMessage}>{errors?.name?.message && errors.name.message}</span>
				</div>
				<label htmlFor="password">
					<h4>Password</h4>
				</label>
				<div className={styles.input}>
					<input {...register("password")} type="password" className={errors?.password?.message ? styles.error : undefined} id="password" />
					<span className={styles.errorMessage}>{errors?.password?.message && errors.password.message}</span>
				</div>
				<label htmlFor="devPassword">
					<h4>Developer Password</h4>
					<p>Leave empty if you are not authorized.</p>
				</label>
				<div className={styles.input}>
					<input {...register("devPassword")} type="password" id="devPassword" />
				</div>
				<div className={styles.buttons}>
					<Button type="submit" label="Register" variant="primary" disabled={isSubmitting} />
					<Button type="button" label="Cancel" variant="secondary" disabled={isSubmitting} onClick={() => router.back()} />
				</div>
			</form>
		</div>
	);
};

export default SignUpPage;
