import { FeedbackEntrySkeleton } from "@/app/components/FeedbackEntry";
import styles from "./FeedbackEntryPage.module.scss";
import GoBack from "@/app/components/GoBack";
import { CommentsListSkeleton } from "@/app/components/CommentsList";

export default function Loading() {
	return (
		<div className={styles.entryContainer}>
			<div className={styles.top}>
				<GoBack />
			</div>
			<FeedbackEntrySkeleton extend={true} />
			<CommentsListSkeleton />
		</div>
	);
}
