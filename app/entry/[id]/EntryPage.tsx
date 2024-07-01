"use client";

import styles from "./FeedbackEntryPage.module.scss";
import AddComment from "@/app/components/AddComment";
import Button from "@/app/components/Button";
import CommentsList from "@/app/components/CommentsList";
import FeedbackEntry from "@/app/components/FeedbackEntry";
import GoBack from "@/app/components/GoBack";
import Permitted from "@/app/components/Permitted";
import useUser from "@/app/hooks/useUser";
import { getSingleHandler } from "@/app/services/feedback";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

function EntryPage() {
	const params = useParams<{ id: string }>();

	const { data: entry, isError } = useSuspenseQuery({
		queryKey: ["entries", params.id],
		queryFn: () => getSingleHandler(params.id),
	});

	const user = useUser();

	if (isError || !entry) {
		redirect("/");
	}

	return (
		<div className={styles.entryContainer}>
			<div className={styles.top}>
				<GoBack />
				<Permitted condition={user?.superUser === true || user?.id === entry.user.id}>
					<Link href={`/entry/${params.id}/edit`} replace={true}>
						<Button type="button" label="Edit feedback" variant="edit" />
					</Link>
				</Permitted>
			</div>
			<FeedbackEntry entry={entry} extend={true} />
			<CommentsList comments={entry.comments || []} />
			<AddComment />
		</div>
	);
}

export default EntryPage;
