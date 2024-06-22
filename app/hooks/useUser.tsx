import { useSuspenseQuery } from "@tanstack/react-query";
import { authorizeHandler } from "../services/auth";

const useUser = () => {
	const { data: user } = useSuspenseQuery({ queryKey: ["user"], queryFn: authorizeHandler });

	return user;
};

export default useUser;
