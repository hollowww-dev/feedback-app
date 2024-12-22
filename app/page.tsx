import { Suspense } from "react";

import styles from "@components/sections/home/FeedbackListPage.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

import Board from "@/components/sections/home/Board";
import { FeedbackListSkeleton } from "@/components/sections/home/FeedbackList";
import FeedbackList from "@/components/sections/home/FeedbackList";
import { RoadmapBoardSkeleton } from "@/components/sections/home/Board/RoadmapBoard";
import RoadmapBoard from "@/components/sections/home/Board/RoadmapBoard";

export default async function Page() {
  return (
    <div className={styles.container}>
      <Board>
        <Suspense key="roadmapBoard" fallback={<RoadmapBoardSkeleton />}>
          <RoadmapBoard />
        </Suspense>
      </Board>
      <Suspense key="feedbackList" fallback={<FeedbackListSkeleton />}>
        <FeedbackList />
      </Suspense>
    </div>
  );
}
