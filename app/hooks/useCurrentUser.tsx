import { useSuspenseQuery } from "@tanstack/react-query";
import { authorizeHandler } from "../services/auth";

const useCurrentUser = () => {
	const { data: user } = useSuspenseQuery({ queryKey: ["me"], queryFn: authorizeHandler });

	return user;
};

export default useCurrentUser;
