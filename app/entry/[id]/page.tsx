import CommentsList from "@/app/components/CommentsList";
import styles from "./FeedbackEntryPage.module.scss";

import FeedbackEntry from "@/app/components/FeedbackEntry";
import GoBack from "@/app/components/GoBack";
import { getSingleHandler } from "@/app/services/feedback";
import { redirect } from "next/navigation";
import AddComment from "@/app/components/AddComment";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Permitted from "@/app/components/Permitted";
import Button from "@/app/components/Button";

async function EntryLoader({ params }: { params: { id: string } }) {
	const entry = await getSingleHandler(params.id);
	if (!entry) {
		redirect("/");
	}
	return (
		<div className={styles.entryContainer}>
			<div className={styles.top}>
				<GoBack />
				<Permitted>
					<Button type="button" label="Edit feedback" variant="edit" />
				</Permitted>
			</div>
			<FeedbackEntry entry={entry} extend={true} />
			<CommentsList comments={entry.comments || []} />
			<AddComment />
		</div>
	);
}

export default function Page({ params }: { params: { id: string } }) {
	return (
		<Suspense key={params.id} fallback={<Loading />}>
			<EntryLoader params={params} />
		</Suspense>
	);
}
