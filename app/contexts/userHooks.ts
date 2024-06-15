import { User } from "../types";
import { useContext } from "react";
import UserContext from "./userContext";

export const useUser = (): Omit<User, "passwordHash"> | null => {
	const user = useContext(UserContext);

	return user;
};
