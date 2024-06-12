import { useSuspenseQuery } from "@tanstack/react-query";
import getUser from "../services/getUser";

const useCurrentUser = () => {
	const { data: user } = useSuspenseQuery({ queryKey: ["me"], queryFn: getUser });

	return user;
};

export default useCurrentUser;
