import { z } from "zod";

export const signUpSchema = z.object({
	username: z.string().min(1, { message: "Username is required." }),
	name: z.string().min(1, { message: "Name is required." }),
	password: z.string().min(1, { message: "Password is required" }).min(3, { message: "Password needs to be at least 3 symbols long." }),
	devPassword: z.string().optional(),
});

export const signInSchema = z.object({
	username: z.string().min(1, { message: "Username is required." }),
	password: z.string().min(1, { message: "Password is required" }).min(3, { message: "Password needs to be at least 3 symbols long." }),
});
