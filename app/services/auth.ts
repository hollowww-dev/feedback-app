import { authorize, login, createUser } from "@/actions";
import { cache } from "react";

export const authorizeHandler = cache(async () => {
	const response = await authorize();
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
});

export const loginHandler = async (data: { username: string; password: string }) => {
	const response = await login(data);
	if (!response.success) {
		throw new Error(response.message);
	}
};

export const createUserHandler = async (data: { username: string; name: string; password: string; devPassword?: string }) => {
	const response = await createUser(data);
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
};
