import { authorize, createUser, login } from "@/actions";

export async function createUserHandler(request: unknown) {
	const response = await createUser(request);
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
}

export async function loginHandler(request: unknown) {
	const response = await login(request);
	if (response.success) {
		return;
	} else {
		throw new Error(response.message);
	}
}

export async function authorizeHandler() {
	const response = await authorize();
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
}
