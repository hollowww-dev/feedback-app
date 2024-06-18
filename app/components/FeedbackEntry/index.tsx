"use client";

import { Entry } from "../../types";

import { useRouter } from "next/navigation";

import clsx from "clsx";

import Image from "next/image";

import styles from "./FeedbackEntry.module.scss";

import IconArrowUp from "../../../assets/shared/icon-arrow-up";
import IconComments from "../../../assets/shared/icon-comments.svg";

import { CategoryLabel } from "../Button";
import { upvoteHandler } from "@/app/services/feedback";
import { useNotify } from "@/app/contexts/notificationHooks";
import { useUser } from "@/app/contexts/userHooks";
import { SyntheticEvent, useTransition } from "react";
const FeedbackEntry = ({ entry, extend, link }: { entry: Entry; extend?: boolean; link?: boolean }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const user = useUser();

	const notify = useNotify();

	const upvote = (e: SyntheticEvent) => {
		e.stopPropagation();
		startTransition(async () => {
			try {
				await upvoteHandler(entry.id);
			} catch (e) {
				if (e instanceof Error) {
					notify(e.message);
				} else {
					notify("Something went wrong.");
				}
			}
		});
	};

	return (
		<div
			className={clsx(`${styles.feedbackEntry}`, extend && `${styles.extend}`, link && `${styles.link}`)}
			onClick={() => {
				link && router.push(`/entry/${entry.id}`);
			}}>
			<div className={styles.content}>
				<h3>{entry.title}</h3>
				<p>{entry.description}</p>
				<CategoryLabel category={entry.category} />
			</div>
			<button
				className={clsx(`${styles.votes}`, user?.upvoted.includes(entry.id) && `${styles.active}`)}
				onClick={upvote}
				disabled={isPending}>
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
