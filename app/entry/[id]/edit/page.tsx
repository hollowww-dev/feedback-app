import { Suspense } from "react";
import Loading from "@/app/loading";
import EditPage from "./EditPage";
import { getSingleHandler } from "@/app/services/feedback";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
	const entry = await getSingleHandler(params.id);
	if (!entry) {
		redirect("/");
	}
	return (
		<Suspense key="signup" fallback={<Loading />}>
			<EditPage />
		</Suspense>
	);
}
