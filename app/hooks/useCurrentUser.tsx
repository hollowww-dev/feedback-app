import { useQueryClient } from "@tanstack/react-query";
import { User } from "../types";

const useCurrentUser = () => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User | null>(["me"]);

	return user;
};

export default useCurrentUser;
