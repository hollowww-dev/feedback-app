import { logout } from "@/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../contexts/notificationHooks";

const useLogout = () => {
	const notify = useNotify();
	const queryClient = useQueryClient();

	const logoutHandler = async () => {
		try {
			await logout();
			queryClient.setQueryData(["me"], null);
			notify("Logged out successfully.");
		} catch (e) {
			console.log(e);
		}
	};

	return logoutHandler;
};

export default useLogout;
