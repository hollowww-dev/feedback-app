import { Suspense } from "react";
import Loading from "@/app/loading";
import AddNewPage from "./AddNewPage";

export default async function Page() {
	return (
		<Suspense key="addnew" fallback={<Loading />}>
			<AddNewPage />
		</Suspense>
	);
}
