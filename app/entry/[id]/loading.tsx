import { FeedbackEntrySkeleton } from "@components/common/FeedbackEntry";
import styles from "@components/sections/entry/FeedbackEntryPage.module.scss";
import GoBack from "@components/common/GoBack";
import { CommentsListSkeleton } from "@components/sections/entry/CommentsList";

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
