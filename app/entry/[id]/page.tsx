import Loading from "@/app/loading";
import EntryPageLoader from "./EntryPageLoader";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
	return (
		<Suspense key={params.id} fallback={<Loading />}>
			<EntryPageLoader params={params} />
		</Suspense>
	);
}
