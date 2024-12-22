import { Suspense } from "react";

import EntryPage from "../../../components/sections/entry/EntryPage";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "@components/sections/entry/FeedbackEntryPage.module.scss";

import { FeedbackEntrySkeleton } from "@/components/common/FeedbackEntry";
import GoBack from "@/components/common/GoBack";
import { CommentsListSkeleton } from "@/components/sections/entry/CommentsList";

export default async function Page() {
  return (
    <Suspense
      fallback={
        <div className={styles.entryContainer}>
          <div className={styles.top}>
            <GoBack />
          </div>
          <FeedbackEntrySkeleton extend={true} />
          <CommentsListSkeleton />
        </div>
      }
    >
      <EntryPage />
    </Suspense>
  );
}
