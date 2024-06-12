import { Entry, User } from "./types";

import { authorize, getAll } from "../actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import FeedbackListPage from "./FeedbackListPage";
import { cookies } from "next/headers";

export default async function Page() {
	const queryClient = new QueryClient();

	await queryClient.fetchQuery<Entry[]>({
		queryKey: ["feedback"],
		queryFn: getAll,
	});

	const currentUser = cookies().get("currentUser");
	if (currentUser) {
		try {
			await queryClient.prefetchQuery<Omit<User, "passwordHash"> | null>({
				queryKey: ["me"],
				queryFn: () => authorize(JSON.parse(currentUser.value)),
			});
		} catch {
			cookies().delete("currentUser");
		}
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<FeedbackListPage />
		</HydrationBoundary>
	);
}
