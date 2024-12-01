import { Suspense } from "react";

import styles from "@components/sections/home/FeedbackListPage.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

import Board from "@/components/sections/home/Board";
import { FeedbackListSkeleton } from "@/components/sections/home/FeedbackList";
import FeedbackListLoader from "@/components/sections/home/FeedbackList/FeedbackListLoader";
import { RoadmapBoardSkeleton } from "@/components/sections/home/Board/RoadmapBoard";
import RoadmapBoardLoader from "@/components/sections/home/Board/RoadmapBoard/RoadmapBoardLoader";

export default async function Page() {
  return (
    <div className={styles.container}>
      <Board>
        <Suspense key="roadmapBoard" fallback={<RoadmapBoardSkeleton />}>
          <RoadmapBoardLoader />
        </Suspense>
      </Board>
      <Suspense key="feedbackList" fallback={<FeedbackListSkeleton />}>
        <FeedbackListLoader />
      </Suspense>
    </div>
  );
}
