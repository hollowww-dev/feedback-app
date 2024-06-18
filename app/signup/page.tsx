import { Suspense } from "react";
import Loading from "../loading";
import SignUpPage from "./SignUpPage";

export default async function Page() {
	return (
		<Suspense key="signup" fallback={<Loading />}>
			<SignUpPage />
		</Suspense>
	);
}
