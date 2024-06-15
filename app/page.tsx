import { getStats } from "@/actions";
import styles from "./FeedbackListPage.module.scss";
import Board from "./components/Board";
import FeedbackList from "./components/FeedbackList";
import { getSuggestionsHandler } from "./services/feedback";
import RoadmapBoard from "./components/RoadmapBoard";

export default async function Page() {
	const rawSuggestions = await getSuggestionsHandler();
	await getStats();

	return (
		<div className={styles.container}>
			<Board>
				<RoadmapBoard />
			</Board>
			<FeedbackList rawSuggestions={rawSuggestions} />
		</div>
	);
}
