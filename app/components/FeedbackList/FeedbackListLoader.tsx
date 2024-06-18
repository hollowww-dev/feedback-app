import { getSuggestionsHandler } from "@/app/services/feedback";
import FeedbackList from ".";

export default async function FeedbackListLoader() {
	const rawSuggestions = await getSuggestionsHandler();

	return <FeedbackList rawSuggestions={rawSuggestions} />;
}
