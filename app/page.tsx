import styles from "./FeedbackListPage.module.scss";
import Board from "./components/Board";
import { Suspense } from "react";
import FeedbackListLoader from "./components/FeedbackList/FeedbackListLoader";
import RoadmapBoardLoader from "./components/RoadmapBoard/RoadmapBoardLoader";
import { RoadmapBoardSkeleton } from "./components/RoadmapBoard";
import { FeedbackEntrySkeleton } from "./components/FeedbackEntry";
import Loading from "./loading";
import { FeedbackListSkeleton } from "./components/FeedbackList";

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
