"use client";

import { FilterContextProvider } from "./contexts/FilterContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NotificationContextProvider>
			<FilterContextProvider>{children}</FilterContextProvider>
		</NotificationContextProvider>
	);
}
