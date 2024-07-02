"use client";

import { addCommentHandler } from "@/app/services/feedback";
import { useParams } from "next/navigation";
import { useNotify } from "@/app/contexts/notificationHooks";
import useUser from "@/app/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import styles from "./AddComment.module.scss";

import Button from "../Button";
import NotLogged from "../NotLogged";

import { EntryDetailed } from "@/app/types";

type Inputs = {
	content: string;
};

const AddComment = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>({ mode: "onSubmit" });

	const commentValue = watch("content");

	const user = useUser();

	const { id }: { id: string } = useParams();

	const notify = useNotify();

	const queryClient = useQueryClient();

	const { mutate: submitComment, isPending } = useMutation({
		mutationKey: ["addComment"],
		mutationFn: ({ content }: { content: string }) => addCommentHandler(id, content),
		onError: error => {
			if (error instanceof Error) {
				notify(error.message);
			} else {
				notify("Something went wrong.");
			}
		},
		onSuccess: async comment => {
			queryClient.setQueryData(["entries", id], (old: EntryDetailed) => {
				return { ...old, comments: old.comments?.concat(comment), commentsCount: ++old.commentsCount };
			});
			reset();
			queryClient.invalidateQueries({ queryKey: ["entries", { status: "suggestion" }] });
		},
	});

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
			<form onSubmit={handleSubmit(content => submitComment(content))}>
				<textarea
					{...register("content", { required: "Can't be empty" })}
					maxLength={250}
					className={errors?.content?.message && styles.error}
				/>
				<span className={styles.errorMessage}>{errors?.content?.message && errors.content.message}</span>
				<div className={styles.bottom}>
					<p>{250 - (commentValue?.length || 0)} characters left</p>
					<Button type="submit" label="Add comment" variant="primary" disabled={isPending} />
				</div>
			</form>
		</div>
	);
};

export default AddComment;
