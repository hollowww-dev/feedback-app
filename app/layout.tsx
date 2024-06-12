import Providers from "./Providers";
import Notification from "./components/Notification";

import "./styles/global.scss";
import { Jost } from "next/font/google";

export const metadata = {
	title: "Feedback app",
	description: "Frontend Mentor challenge",
};

const jost = Jost({ subsets: ["latin"], preload: true });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Providers>
				<body className={jost.className}>
					{children}
					<Notification />
				</body>
			</Providers>
		</html>
	);
}
