import EditPage from "../../../../components/sections/entry/EditPage";
import { getSingleHandler } from "@/services/feedback";
import getQueryClient from "@/lib/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["entries", params.id],
    queryFn: () => getSingleHandler(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditPage />
    </HydrationBoundary>
  );
}
