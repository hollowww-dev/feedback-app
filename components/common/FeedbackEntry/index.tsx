"use client";

import { Entry, EntryDetailed, User } from "../../../types";

import { useRouter } from "next/navigation";

import clsx from "clsx";

import Image from "next/image";

import styles from "./FeedbackEntry.module.scss";

import IconArrowUp from "../../../assets/shared/icon-arrow-up";
import IconComments from "../../../assets/shared/icon-comments.svg";

import { CategoryLabel } from "../Button";
import { upvoteHandler } from "@/services/feedback";
import { useNotify } from "@/contexts/notificationHooks";

import useUser from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

export const FeedbackEntrySkeleton = ({
  extend,
  roadmap,
}: {
  extend: boolean;
  roadmap?: boolean;
}) => {
  return (
    <div
      className={clsx(
        `${styles.feedbackEntry}`,
        extend && `${styles.extend}`,
        roadmap && `${styles.roadmap}`
      )}
    >
      <div className={styles.content}>
        <h3 style={{ width: "80%" }}>
          <Skeleton />
        </h3>
        <p style={{ width: "60%" }}>
          <Skeleton />
        </p>
        <Skeleton width={50} height={"1.6em"} />
      </div>
      <div className={clsx(`${styles.votes}`, `${styles.skeleton}`)} />
    </div>
  );
};

const FeedbackEntry = ({
  entry,
  extend,
  link,
  roadmap,
}: {
  entry: Entry;
  extend?: boolean;
  link?: boolean;
  roadmap?: boolean;
}) => {
  const router = useRouter();
  const user = useUser();
  const queryClient = useQueryClient();
  const notify = useNotify();

  const upvoteMutation = useMutation({
    mutationKey: ["upvote"],
    mutationFn: upvoteHandler,
    onMutate: async () => {
      if (!user) {
        return;
      }
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["entries", { status: "suggestion" }],
        }),
        queryClient.cancelQueries({ queryKey: ["entries", entry.id] }),
        queryClient.cancelQueries({ queryKey: ["user"] }),
      ]);

      const oldSuggestions: Entry[] | undefined = queryClient.getQueryData([
        "entries",
        { status: "suggestion" },
      ]);
      const oldEntry: EntryDetailed | undefined = queryClient.getQueryData([
        "entries",
        entry.id,
      ]);
      const oldUser: User | undefined = queryClient.getQueryData(["user"]);

      if (user.upvoted.includes(entry.id)) {
        oldSuggestions &&
          queryClient.setQueryData(
            ["entries", { status: entry.status }],
            (old: Entry[]) => {
              return old.map((e) =>
                e.id === entry.id ? { ...e, upvotes: --e.upvotes } : e
              );
            }
          );
        oldEntry &&
          queryClient.setQueryData(
            ["entries", entry.id],
            (old: EntryDetailed) => {
              return {
                ...old,
                upvotes: --old.upvotes,
              };
            }
          );
        oldUser &&
          queryClient.setQueryData(["user"], (old: User) => {
            return {
              ...old,
              upvoted: old.upvoted.filter((e) => e !== entry.id),
            };
          });
      } else {
        oldSuggestions &&
          queryClient.setQueryData(
            ["entries", { status: entry.status }],
            (old: Entry[]) => {
              return old.map((e) =>
                e.id === entry.id ? { ...e, upvotes: ++e.upvotes } : e
              );
            }
          );
        oldEntry &&
          queryClient.setQueryData(
            ["entries", entry.id],
            (old: EntryDetailed) => {
              return {
                ...old,
                upvotes: ++old.upvotes,
              };
            }
          );
        oldUser &&
          queryClient.setQueryData(["user"], (old: User) => {
            return { ...old, upvoted: old.upvoted.concat(entry.id) };
          });
      }

      return { oldSuggestions, oldEntry, oldUser };
    },
    onError: (error, _variables, context) => {
      if (error instanceof Error) {
        notify(error.message);
      } else {
        notify("Something went wrong.");
      }
      context?.oldSuggestions &&
        queryClient.setQueryData(
          ["entries", { status: entry.status }],
          context.oldSuggestions
        );
      context?.oldEntry &&
        queryClient.setQueryData(
          ["entries", context.oldEntry.id],
          context.oldEntry
        );
      context?.oldUser && queryClient.setQueryData(["user"], context.oldUser);
    },
  });

  return (
    <div
      className={clsx(
        `${styles.feedbackEntry}`,
        extend && `${styles.extend}`,
        link && `${styles.link}`,
        roadmap === true && `${styles.roadmap}`,
        roadmap === true &&
          entry.status !== "suggestion" &&
          styles[entry.status]
      )}
      onClick={() => {
        link && router.push(`/entry/${entry.id}`);
      }}
    >
      <div className={styles.content}>
        <h3>{entry.title}</h3>
        <p>{entry.description}</p>
        <CategoryLabel category={entry.category} />
      </div>
      <button
        className={clsx(
          `${styles.votes}`,
          user?.upvoted.includes(entry.id) && `${styles.active}`
        )}
        onClick={(e) => {
          e.stopPropagation();
          upvoteMutation.mutate(entry.id);
        }}
      >
        <IconArrowUp />
        {entry.upvotes}
      </button>
      <div className={styles.comments}>
        <Image src={IconComments} alt="Comments icon" />
        {entry.commentsCount}
      </div>
    </div>
  );
};

export default FeedbackEntry;
