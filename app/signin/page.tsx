import { Suspense } from "react";
import SignInPage from "./SignInPage";
import Loading from "../loading";

export default async function Page() {
	return (
		<Suspense key="signin" fallback={<Loading />}>
			<SignInPage />
		</Suspense>
	);
}
