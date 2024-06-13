import { Entry, User } from "./types";

import { getAll } from "@/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import FeedbackListPage from "./FeedbackListPage";
import getUser from "./services/getUser";

export default async function Page() {
	const queryClient = new QueryClient();

	await queryClient.fetchQuery<Entry[]>({
		queryKey: ["feedback"],
		queryFn: getAll,
	});

	await queryClient.fetchQuery<Omit<User, "passwordHash"> | null>({
		queryKey: ["me"],
		queryFn: getUser,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<FeedbackListPage />
		</HydrationBoundary>
	);
}
