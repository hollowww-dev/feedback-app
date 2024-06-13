import { createUser } from "@/actions";

export async function createUserHandler(request: unknown) {
	const response = await createUser(request);
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
}
