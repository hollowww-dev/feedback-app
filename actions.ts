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

export async function createUser(request: unknown): Promise<Omit<User, "passwordHash" | "upvoted" | "superUser">> {
	await dbConnect();
	const parsedBody = await toNewUser(request);
	const newUser = await userModel.create(parsedBody);
	return { id: newUser._id.toString(), username: newUser.username, name: newUser.name };
}

export async function login(request: unknown): Promise<string> {
	const { JWT_SECRET } = process.env;

	if (!JWT_SECRET) {
		throw new Error("Secret password not provided.");
	}

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

	return accessToken;
}

export async function authorize(currentUser: string): Promise<Omit<User, "passwordHash"> | null> {
	const { JWT_SECRET } = process.env;

	if (!JWT_SECRET) {
		throw new Error("Secret password not provided.");
	}

	const decodedUser = jwt.verify(currentUser, JWT_SECRET);

	const user = await userModel.findById(decodedUser);

	if (!user) {
		throw new Error("User not found.");
	}

	return { id: user.id, name: user.name, username: user.username, upvoted: user.upvoted, superUser: user.superUser };
}

export async function logout(): Promise<void> {
	cookies().delete("currentUser");
}
