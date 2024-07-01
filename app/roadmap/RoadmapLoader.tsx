import { getEntriesHandler } from "@/app/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/lib/getQueryClient";
import RoadmapColumn from "./RoadmapColumn";

export default async function RoadmapLoader({ status }: { status: "planned" | "inprogress" | "live" }) {
	const queryClient = getQueryClient();

	await queryClient.ensureQueryData({
		queryKey: ["entries", { status }],
		queryFn: () => getEntriesHandler(status),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<RoadmapColumn status={status} />
		</HydrationBoundary>
	);
}
