"use client";

import { useForm } from "react-hook-form";
import { useNotify } from "@/contexts/notificationHooks";
import useUser from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./AddReply.module.scss";

import NotLogged from "../NotLogged";
import Button from "@components/common/Button";

import { addReplyHandler } from "@/services/feedback";

import { EntryDetailed } from "@/types";

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
    formState: { errors },
  } = useForm<Inputs>({ mode: "onSubmit" });

  const notify = useNotify();

  const user = useUser();

  const queryClient = useQueryClient();

  const { mutate: submitReply, isPending } = useMutation({
    mutationKey: ["addReply"],
    mutationFn: ({ content }: { content: string }) =>
      addReplyHandler(commentId, content, replyingTo),
    onError: (error) => {
      if (error instanceof Error) {
        notify(error.message);
      } else {
        notify("Something went wrong.");
      }
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(
        ["entries", response.entry],
        (old: EntryDetailed) => {
          return {
            ...old,
            comments: old.comments?.map((comment) =>
              comment.id === response.reply.comment
                ? {
                    ...comment,
                    replies: comment.replies?.concat(response.reply),
                  }
                : comment
            ),
            commentsCount: ++old.commentsCount,
          };
        }
      );
      reset();
      setReplyingTo(null);
      queryClient.invalidateQueries({
        queryKey: ["entries", { status: "suggestion" }],
      });
    },
  });

  if (!user) {
    return <NotLogged />;
  }

  return (
    <form
      className={styles.addReplyContainer}
      onSubmit={handleSubmit((content) => submitReply(content))}
    >
      <div className={styles.input}>
        <textarea
          {...register("content", { required: "Can't be empty" })}
          maxLength={250}
          className={errors?.content?.message && styles.error}
        />
        <span className={styles.errorMessage}>
          {errors?.content?.message && errors.content.message}
        </span>
      </div>
      <Button
        label="Reply"
        type="submit"
        variant="primary"
        disabled={isPending}
      />
    </form>
  );
};

export default AddReply;
