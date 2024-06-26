import { getEntriesHandler } from "@/app/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import FeedbackList from ".";
import getQueryClient from "@/app/lib/getQueryClient";

export default async function FeedbackListLoader() {
	const queryClient = getQueryClient();

	await queryClient.ensureQueryData({
		queryKey: ["entries", { status: "suggestion" }],
		queryFn: () => getEntriesHandler("suggestion"),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<FeedbackList />
		</HydrationBoundary>
	);
}
