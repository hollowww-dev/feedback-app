import getQueryClient from "@/app/lib/getQueryClient";
import { getSingleHandler } from "@/app/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import EntryPage from "./EntryPage";

export default async function EntryPageLoader({ params }: { params: { id: string } }) {
	const queryClient = getQueryClient();

	await queryClient.fetchQuery({
		queryKey: ["entries", params.id],
		queryFn: () => getSingleHandler(params.id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EntryPage />
		</HydrationBoundary>
	);
}
