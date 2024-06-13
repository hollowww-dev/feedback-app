import { Entry } from "./types";

import { getAll } from "@/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import FeedbackListPage from "./FeedbackListPage";

export default async function Page() {
	const queryClient = new QueryClient();

	await queryClient.fetchQuery<Entry[]>({
		queryKey: ["feedback"],
		queryFn: getAll,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<FeedbackListPage />
		</HydrationBoundary>
	);
}
