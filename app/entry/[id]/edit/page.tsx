import { Suspense } from "react";
import Loading from "@/app/loading";
import EditPage from "./EditPage";
import { getSingleHandler } from "@/app/services/feedback";
import { redirect } from "next/navigation";
import getQueryClient from "@/app/lib/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

async function EditPageLoader({ params }: { params: { id: string } }) {
	const queryClient = getQueryClient();

	await queryClient.ensureQueryData({
		queryKey: ["entries", params.id],
		queryFn: () => getSingleHandler(params.id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EditPage />
		</HydrationBoundary>
	);
}

export default async function Page({ params }: { params: { id: string } }) {
	return (
		<Suspense key="signup" fallback={<Loading />}>
			<EditPageLoader params={params} />
		</Suspense>
	);
}
