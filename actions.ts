"use server";

import dbConnect from "./app/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { parseEntries, parseEntry, parseEntryDetailed } from "./app/utils/toEntry";
import { toNewUser } from "./app/utils/toUser";

import feedbackModel from "./app/models/feedback";
import userModel from "./app/models/user";
import { signInSchema } from "./app/lib/authSchema";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import commentModel from "./app/models/comment";
import replyModel from "./app/models/reply";
import { NewEntry } from "./app/types";

export async function getSuggestions() {
	try {
		await dbConnect();
		const suggestions = await feedbackModel.find({ status: "suggestion" }).populate([{ path: "comments" }, { path: "user" }]);
		const parsedSuggestions = parseEntries(suggestions);
		return { success: true, data: parsedSuggestions };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: [] };
		} else {
			return { success: false, message: "Something went wrong.", data: [] };
		}
	}
}

export async function getSingle(id: string) {
	try {
		await dbConnect();
		const feedback = await feedbackModel.findById(id).populate([
			{
				path: "comments",
				populate: [
					{
						path: "user",
					},
					{
						path: "replies",
						populate: "user",
					},
				],
			},
			{ path: "user" },
		]);
		const parsedFeedback = parseEntryDetailed(feedback);
		return { success: true, data: parsedFeedback };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function getStats() {
	try {
		await dbConnect();
		const stats = await feedbackModel.aggregate([{ $match: { status: { $ne: "suggestion" } } }]).sortByCount("status");
		return { success: true, data: stats };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function createEntry(content: NewEntry) {
	try {
		await dbConnect();
		const user = await authorize();
		if (!user.data) {
			throw new Error("You need to log in to upvote.");
		}
		const entry = await feedbackModel.create({ user: user.data.id, status: "suggestion", upvotes: 0, ...content });
		await entry.populate([
			{
				path: "comments",
				populate: [
					{
						path: "user",
					},
					{
						path: "replies",
						populate: "user",
					},
				],
			},
			{ path: "user" },
		]);
		revalidatePath("/");
		return { success: true, data: parseEntryDetailed(entry) };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function upvote(id: string) {
	try {
		await dbConnect();
		const user = await authorize();
		if (!user.data) {
			throw new Error("You need to log in to upvote.");
		}
		let feedbackPromise;
		let userPromise;
		if (!user.data?.upvoted.includes(id)) {
			feedbackPromise = feedbackModel.updateOne({ _id: id }, { $inc: { upvotes: 1 } });
			userPromise = userModel.updateOne({ _id: user.data?.id }, { $push: { upvoted: id } });
		} else {
			feedbackPromise = feedbackModel.updateOne({ _id: id }, { $inc: { upvotes: -1 } });
			userPromise = userModel.updateOne({ _id: user.data?.id }, { $pull: { upvoted: id } });
		}
		await Promise.all([feedbackPromise, userPromise]);
		revalidatePath("/");
		return { success: true, data: null };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function addComment(id: string, content: string) {
	try {
		await dbConnect();
		const user = await authorize();
		if (!user.data) {
			throw new Error("You need to log in to comment.");
		}
		const comment = await commentModel.create({ entry: id, user: user.data.id, content });
		await feedbackModel.updateOne({ _id: id }, { $push: { comments: comment._id } });
		revalidatePath("/");
		return { success: true, data: null };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function addReply(id: string, content: string, replyingTo: string) {
	try {
		await dbConnect();
		const user = await authorize();
		if (!user.data) {
			throw new Error("You need to log in to comment.");
		}
		const reply = await replyModel.create({ comment: id, user: user.data.id, content, replyingTo });
		await commentModel.updateOne({ _id: id }, { $push: { replies: reply._id } });
		revalidatePath("/");
		return { success: true, data: null };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
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

		cookies().set("currentUser", accessToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });

		return { success: true };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, message: e.message };
		} else {
			return { success: false, message: "Something went wrong." };
		}
	}
}

export async function authorize() {
	const { JWT_SECRET } = process.env;

	if (!JWT_SECRET) {
		throw new Error("Secret password not provided.");
	}

	const currentUser = cookies().get("currentUser");

	if (!currentUser || !currentUser.value) {
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
		if (e instanceof Error) {
			return { success: false, message: e.message, data: null };
		} else {
			return { success: false, message: "Something went wrong.", data: null };
		}
	}
}

export async function logout(): Promise<void> {
	cookies().delete("currentUser");
	revalidatePath("/");
}
