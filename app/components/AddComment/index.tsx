"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AddComment.module.scss";
import Button from "../Button";
import NotLogged from "../NotLogged";
import { addCommentHandler } from "@/app/services/feedback";
import { useParams } from "next/navigation";
import { useNotify } from "@/app/contexts/notificationHooks";
import useUser from "@/app/hooks/useUser";

type Inputs = {
	content: string;
};

const AddComment = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ mode: "onSubmit" });

	const commentValue = watch("content");

	const user = useUser();

	const { id }: { id: string } = useParams();

	const notify = useNotify();

	const submitComment: SubmitHandler<Inputs> = async ({ content }) => {
		try {
			await addCommentHandler(id, content);
			reset();
		} catch (e) {
			if (e instanceof Error) {
				notify(e.message);
			} else {
				notify("Something went wrong.");
			}
		}
	};

	if (!user) {
		return (
			<div className={styles.addCommentContainer}>
				<NotLogged />
			</div>
		);
	}

	return (
		<div className={styles.addCommentContainer}>
			<h3>Add comment</h3>
			<form onSubmit={handleSubmit(submitComment)}>
				<textarea
					{...register("content", { required: "Can't be empty" })}
					maxLength={250}
					className={errors?.content?.message && styles.error}
				/>
				<span className={styles.errorMessage}>{errors?.content?.message && errors.content.message}</span>
				<div className={styles.bottom}>
					<p>{250 - (commentValue?.length || 0)} characters left</p>
					<Button type="submit" label="Add comment" variant="primary" disabled={isSubmitting} />
				</div>
			</form>
		</div>
	);
};

export default AddComment;
