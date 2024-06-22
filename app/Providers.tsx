"use client";
import { FilterContextProvider } from "./contexts/FilterContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "./lib/getQueryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<NotificationContextProvider>
				<FilterContextProvider>{children}</FilterContextProvider>
			</NotificationContextProvider>
		</QueryClientProvider>
	);
}
