import getQueryClient from "@/app/lib/getQueryClient";
import { getStatsHandler } from "@/app/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import RoadmapBoard from ".";

export default async function RoadmapBoardLoader() {
	const queryClient = getQueryClient();

	await queryClient.ensureQueryData({
		queryKey: ["stats"],
		queryFn: getStatsHandler,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<RoadmapBoard />
		</HydrationBoundary>
	);
}
