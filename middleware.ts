import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const currentUser = cookies().get("currentUser");

	if (currentUser) {
		req.cookies.set("currentUser", currentUser.value);
	}
}
