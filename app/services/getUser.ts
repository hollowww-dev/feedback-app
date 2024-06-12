import { authorize } from "@/actions";
import Cookies from "js-cookie";

export default async function getUser() {
	try {
		const user = await authorize();
		return user;
	} catch (e) {
		Cookies.remove("currentUser");
		return null;
	}
}
