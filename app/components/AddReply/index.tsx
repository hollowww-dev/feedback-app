"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./AddReply.module.scss";

import NotLogged from "../NotLogged";
import Button from "../Button";
import { addReplyHandler } from "@/app/services/feedback";
import { useNotify } from "@/app/contexts/notificationHooks";
import useUser from "@/app/hooks/useUser";

type Inputs = {
	content: string;
};

const AddReply = ({
	commentId,
	replyingTo,
	setReplyingTo,
}: {
	commentId: string;
	replyingTo: string;
	setReplyingTo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ mode: "onSubmit" });

	const notify = useNotify();

	const user = useUser();

	const submitReply: SubmitHandler<Inputs> = async ({ content }) => {
		try {
			await addReplyHandler(commentId, content, replyingTo);
			setReplyingTo(null);
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
		return <NotLogged />;
	}

	return (
		<form className={styles.addReplyContainer} onSubmit={handleSubmit(submitReply)}>
			<div className={styles.input}>
				<textarea
					{...register("content", { required: "Can't be empty" })}
					maxLength={250}
					className={errors?.content?.message && styles.error}
				/>
				<span className={styles.errorMessage}>{errors?.content?.message && errors.content.message}</span>
			</div>
			<Button label="Reply" type="submit" variant="primary" disabled={isSubmitting} />
		</form>
	);
};

export default AddReply;
