"use client";
import { User } from "./types";
import { FilterContextProvider } from "./contexts/FilterContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import UserContext from "./contexts/userContext";

export default function Providers({ children, user }: { children: React.ReactNode; user: Omit<User, "passwordHash"> | null }) {
	return (
		<NotificationContextProvider>
			<FilterContextProvider>
				<UserContext.Provider value={user}>{children}</UserContext.Provider>
			</FilterContextProvider>
		</NotificationContextProvider>
	);
}
