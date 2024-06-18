import styles from "./FeedbackListPage.module.scss";
import Board from "./components/Board";
import FeedbackList from "./components/FeedbackList";
import { getStatsHandler, getSuggestionsHandler } from "./services/feedback";
import RoadmapBoard from "./components/RoadmapBoard";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
	const suggestionsData = getSuggestionsHandler();
	getStatsHandler();

	const rawSuggestions = await Promise.resolve(suggestionsData);
	return (
		<div className={styles.container}>
			<Board>
				<Suspense fallback={<Loading />}>
					<RoadmapBoard />
				</Suspense>
			</Board>
			<FeedbackList rawSuggestions={rawSuggestions} />
		</div>
	);
}
