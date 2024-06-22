import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Providers from "./Providers";
import Notification from "./components/Notification";
import getQueryClient from "./lib/getQueryClient";
import { authorizeHandler } from "./services/auth";
import "./styles/global.scss";
import { Jost } from "next/font/google";
export const metadata = {
	title: "Feedback app",
	description: "Frontend Mentor challenge",
};

const jost = Jost({ subsets: ["latin"], preload: true });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	await queryClient.fetchQuery({ queryKey: ["user"], queryFn: authorizeHandler });

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
