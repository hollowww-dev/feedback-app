import { getEntriesHandler } from "@/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import FeedbackList from ".";
import getQueryClient from "@/lib/getQueryClient";

export default async function FeedbackListLoader() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["entries", { status: "suggestion" }],
    queryFn: () => getEntriesHandler("suggestion"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedbackList />
    </HydrationBoundary>
  );
}
