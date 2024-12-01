import getQueryClient from "@/lib/getQueryClient";
import { getStatsHandler } from "@/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import RoadmapBoard from ".";

export default async function RoadmapBoardLoader() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: getStatsHandler,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoadmapBoard />
    </HydrationBoundary>
  );
}
