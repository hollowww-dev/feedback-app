import { getEntriesHandler } from "@/app/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/lib/getQueryClient";
import RoadmapMobile from "./RoadmapMobile";

const RoadmapMobileLoader = async () => {
	const queryClient = getQueryClient();

	const plannedPromise = queryClient.ensureQueryData({
		queryKey: ["entries", { status: "planned" }],
		queryFn: () => getEntriesHandler("planned"),
	});
	const inprogressPromise = queryClient.ensureQueryData({
		queryKey: ["entries", { status: "inprogress" }],
		queryFn: () => getEntriesHandler("inprogress"),
	});
	const livePromise = queryClient.ensureQueryData({
		queryKey: ["entries", { status: "live" }],
		queryFn: () => getEntriesHandler("live"),
	});

	await Promise.all([plannedPromise, inprogressPromise, livePromise]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<RoadmapMobile />
		</HydrationBoundary>
	);
};

export default RoadmapMobileLoader;
