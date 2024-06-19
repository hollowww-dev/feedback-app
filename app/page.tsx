import styles from "./FeedbackListPage.module.scss";
import Board from "./components/Board";
import { getStatsHandler, getSuggestionsHandler } from "./services/feedback";
import RoadmapBoard from "./components/RoadmapBoard";
import { Suspense } from "react";
import Loading from "./loading";
import FeedbackListLoader from "./components/FeedbackList/FeedbackListLoader";

export default async function Page() {
	getSuggestionsHandler();
	getStatsHandler();

	return (
		<div className={styles.container}>
			<Board>
				<Suspense fallback={<Loading />}>
					<RoadmapBoard />
				</Suspense>
			</Board>
			<Suspense fallback={<Loading />}>
				<FeedbackListLoader />
			</Suspense>
		</div>
	);
}
