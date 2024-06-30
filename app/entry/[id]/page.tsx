import { Suspense } from "react";

import getQueryClient from "@/app/lib/getQueryClient";
import { getSingleHandler } from "@/app/services/feedback";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import EntryPage from "./EntryPage";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "./loading";

async function EntryPageLoader({ params }: { params: { id: string } }) {
	const queryClient = getQueryClient();

	await queryClient.ensureQueryData({
		queryKey: ["entries", params.id],
		queryFn: () => getSingleHandler(params.id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EntryPage />
		</HydrationBoundary>
	);
}

export default async function Page({ params }: { params: { id: string } }) {
	return (
		<Suspense key={params.id} fallback={<Loading />}>
			<EntryPageLoader params={params} />
		</Suspense>
	);
}
