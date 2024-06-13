"use server";

import { Entry, EntryDetailed, User } from "./app/types";

import dbConnect from "./app/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { parseEntries, parseEntryDetailed } from "./app/utils/toEntry";
import { toNewUser } from "./app/utils/toUser";

import feedbackModel from "./app/models/feedback";
import userModel from "./app/models/user";
import { signInSchema } from "./app/lib/authSchema";
import { cookies } from "next/headers";

export async function getAll(): Promise<Entry[]> {
	await dbConnect();
	const feedback = await feedbackModel.find({});
	const parsedFeedback = parseEntries(feedback);
	return parsedFeedback;
}

export async function getSingle(id: string): Promise<EntryDetailed> {
	await dbConnect();
	const feedback = await feedbackModel.findOne({ _id: id });
	const parsedFeedback = parseEntryDetailed(feedback);
	return parsedFeedback;
}

export async function createUser(request: unknown) {
	try {
		await dbConnect();
		const parsedBody = await toNewUser(request);
		const newUser = await userModel.create(parsedBody);
		return { success: true, data: { id: newUser._id.toString(), username: newUser.username, name: newUser.name } };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function login(request: unknown) {
	const { JWT_SECRET } = process.env;

	if (!JWT_SECRET) {
		throw new Error("Secret password not provided.");
	}
	try {
		await dbConnect();

		const { username, password } = await signInSchema.parseAsync(request);

		const foundUser = await userModel.findOne({ username });

		if (!foundUser) {
			throw new Error("User not found.");
		}

		const passwordCorrect = await bcrypt.compare(password, foundUser.passwordHash);

		if (!passwordCorrect) {
			throw new Error("Incorrect password");
		}

		const accessToken = jwt.sign(foundUser.id, JWT_SECRET);

		cookies().set("currentUser", accessToken);

		return { success: true };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function authorize() {
	const { JWT_SECRET } = process.env;

	if (!JWT_SECRET) {
		throw new Error("Secret password not provided.");
	}

	const currentUser = cookies().get("currentUser");

	if (!currentUser) {
		return { success: true, data: null };
	}
	try {
		await dbConnect();

		const decodedUser = jwt.verify(currentUser.value, JWT_SECRET);

		const user = await userModel.findById(decodedUser);

		if (!user) {
			throw new Error("User not found.");
		}

		return {
			success: true,
			data: { id: user.id, name: user.name, username: user.username, upvoted: user.upvoted, superUser: user.superUser },
		};
	} catch (e) {
		cookies().delete("currentUser");
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function logout(): Promise<void> {
	cookies().delete("currentUser");
}
