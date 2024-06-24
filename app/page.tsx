import styles from "./FeedbackListPage.module.scss";
import Board from "./components/Board";
import RoadmapBoard from "./components/RoadmapBoard";
import { Suspense } from "react";
import Loading from "./loading";
import FeedbackListLoader from "./components/FeedbackList/FeedbackListLoader";

export default async function Page() {
	return (
		<div className={styles.container}>
			<Board>
				<RoadmapBoard />
			</Board>
			<Suspense key="feedbackList" fallback={<Loading />}>
				<FeedbackListLoader />
			</Suspense>
		</div>
	);
}
