import getQueryClient from "@/lib/getQueryClient";
import { getSingleHandler } from "@/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import EntryPage from "../../../components/sections/entry/EntryPage";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["entries", params.id],
    queryFn: () => getSingleHandler(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EntryPage />
    </HydrationBoundary>
  );
}
