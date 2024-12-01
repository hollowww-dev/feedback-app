import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import { NotificationContextType } from "../app/types";

export const useNotificationValue = (): string | null => {
  const fullContext: NotificationContextType = useContext(NotificationContext);
  const state = fullContext.state;

  return state;
};

export const useNotify = () => {
  const fullContext: NotificationContextType = useContext(NotificationContext);
  const dispatch = fullContext.dispatch;

  return (payload: string) => {
    dispatch({ type: "SET", payload });
  };
};

export const useClearNotification = () => {
  const fullContext: NotificationContextType = useContext(NotificationContext);
  const dispatch = fullContext.dispatch;

  return () => {
    dispatch({ type: "CLEAR" });
  };
};
