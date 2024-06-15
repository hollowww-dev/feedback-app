import Providers from "./Providers";
import Notification from "./components/Notification";
import "./styles/global.scss";
import { Jost } from "next/font/google";
import { authorizeHandler } from "./services/auth";

export const metadata = {
	title: "Feedback app",
	description: "Frontend Mentor challenge",
};

const jost = Jost({ subsets: ["latin"], preload: true });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const user = await authorizeHandler();

	return (
		<html lang="en">
			<Providers user={user}>
				<body className={jost.className}>
					{children}
					<Notification />
				</body>
			</Providers>
		</html>
	);
}
