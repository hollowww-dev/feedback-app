import { ReactNode, createContext, useReducer } from "react";
import { NotificationContextAction, NotificationContextType } from "../types";

const notificationReducer = (state: string | null, action: NotificationContextAction): string | null => {
	switch (action.type) {
		case "SET":
			return action.payload;
		case "CLEAR":
			return null;
		default:
			return state;
	}
};

const NotificationContext = createContext<NotificationContextType>({
	state: null,
	dispatch: () => {},
});

export const NotificationContextProvider = ({ children }: { children: ReactNode }) => {
	const [notificationValue, notificationDispatch] = useReducer(notificationReducer, null);
	const value: NotificationContextType = {
		state: notificationValue,
		dispatch: notificationDispatch,
	};
	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
