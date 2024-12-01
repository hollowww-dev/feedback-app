import { getEntriesHandler } from "@/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import RoadmapMobile from "./RoadmapMobile";

const RoadmapMobileLoader = async () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["entries", { status: "planned" }],
    queryFn: () => getEntriesHandler("planned"),
  });
  queryClient.prefetchQuery({
    queryKey: ["entries", { status: "inprogress" }],
    queryFn: () => getEntriesHandler("inprogress"),
  });
  queryClient.prefetchQuery({
    queryKey: ["entries", { status: "live" }],
    queryFn: () => getEntriesHandler("live"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoadmapMobile />
    </HydrationBoundary>
  );
};

export default RoadmapMobileLoader;
