import Providers from "./Providers";
import Notification from "./components/Notification";

import "./styles/global.scss";
import { Jost } from "next/font/google";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { authorizeHandler } from "./services/auth";
import { User } from "./types";

export const metadata = {
	title: "Feedback app",
	description: "Frontend Mentor challenge",
};

const jost = Jost({ subsets: ["latin"], preload: true });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	await queryClient.fetchQuery<Omit<User, "passwordHash"> | null>({
		queryKey: ["me"],
		queryFn: authorizeHandler,
	});
	return (
		<html lang="en">
			<Providers>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<body className={jost.className}>
						{children}
						<Notification />
					</body>
				</HydrationBoundary>
			</Providers>
		</html>
	);
}
