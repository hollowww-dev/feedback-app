import { getSingleHandler } from "@/app/services/feedback";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import EntryLoader from "./EntryLoader";

export default async function Page({ params }: { params: { id: string } }) {
	const entry = await getSingleHandler(params.id);
	if (!entry) {
		redirect("/");
	}
	return (
		<Suspense key={params.id} fallback={<Loading />}>
			<EntryLoader params={params} />
		</Suspense>
	);
}
