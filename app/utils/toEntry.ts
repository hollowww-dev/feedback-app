import { isString, isNumber } from ".";

import { Entry, Category, Status, Comment, Reply, EntryDetailed, NewEntry, Author } from "../types";
import { parseName, parseUsername } from "./toUser";

const parseId = (id: unknown): string => {
	if (!id || !isString(id)) {
		throw new Error("Incorrect or missing ID");
	}

	return id;
};

const parseTitle = (title: unknown): string => {
	if (!title || !isString(title)) {
		throw new Error("Incorrect or missing title");
	}

	return title;
};

const isCategory = (param: string): param is Category => {
	return Object.values(Category)
		.map(v => v.toString())
		.includes(param);
};

const parseCategory = (category: unknown): Category => {
	if (!category || !isString(category) || !isCategory(category)) {
		{
			throw new Error("Incorrect or missing category");
		}
	}

	return category;
};

const parseUpvotes = (upvotes: unknown): number => {
	if (typeof upvotes === "undefined" || !isNumber(upvotes)) {
		throw new Error("Incorrect or missing upvotes");
	}

	return upvotes;
};

export const isStatus = (param: string): param is Status => {
	return Object.values(Status)
		.map(v => v.toString())
		.includes(param);
};

const parseStatus = (status: unknown): Status => {
	if (!status || !isString(status) || !isStatus(status)) {
		throw new Error("Incorrect or missing status");
	}

	return status;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error("Incorrect or missing description");
	}

	return description;
};

const parseContent = (content: unknown): string => {
	if (!content || !isString(content)) {
		throw new Error("Incorrect or missing comment content");
	}

	return content;
};
const parseAuthor = (author: unknown): Author => {
	if (!author || typeof author !== "object") {
		throw new Error("Incorrect or missing author");
	}

	if (!("id" in author) || !("name" in author) || !("username" in author)) {
		throw new Error("Some fields are missing");
	}

	return {
		id: parseId(author.id),
		username: parseUsername(author.username),
		name: parseName(author.name),
	};
};

const parseReplyingTo = (replyingTo: unknown): string => {
	if (!replyingTo || !isString(replyingTo)) {
		throw new Error("Incorrect or missing replied user");
	}

	return replyingTo;
};

const parseReply = (reply: unknown): Reply => {
	if (!reply || typeof reply !== "object") {
		throw new Error("Incorrect or missing reply");
	}
	if (!("id" in reply) || !("content" in reply) || !("user" in reply) || !("replyingTo" in reply) || !("entry" in reply)) {
		throw new Error("Some fields are missing");
	}
	return {
		id: parseId(reply.id),
		content: parseContent(reply.content),
		user: parseAuthor(reply.user),
		replyingTo: parseReplyingTo(reply.replyingTo),
		entry: parseId(reply.entry),
	};
};

const parseReplies = (replies: unknown): Reply[] => {
	if (!replies || !(replies instanceof Array)) {
		throw new Error("Incorrect or missing replies");
	}

	return replies.map((reply: Reply) => parseReply(reply));
};

const parseComment = (comment: unknown): Comment => {
	if (!comment || typeof comment !== "object") {
		throw new Error("Incorrect or missing comment");
	}
	if (!("id" in comment) || !("content" in comment) || !("user" in comment) || !("entry" in comment)) {
		throw new Error("Some fields are missing");
	}
	const parsedComment: Comment = {
		id: parseId(comment.id),
		content: parseContent(comment.content),
		user: parseAuthor(comment.user),
		entry: parseId(comment.entry),
	};

	if ("replies" in comment) {
		parsedComment.replies = parseReplies(comment.replies);
	}

	return parsedComment;
};

const parseComments = (comments: unknown): Comment[] => {
	if (!comments || !(comments instanceof Array)) {
		throw new Error("Incorrect or missing comments");
	}

	return comments.map((comment: Comment) => parseComment(comment));
};

const parseCommentsLength = (comments: unknown): number => {
	if (!comments || !(comments instanceof Array)) {
		throw new Error("Incorrect or missing comments");
	}

	let length = comments.length;

	comments.forEach(comment => {
		if ("replies" in comment) {
			length += comment.replies.length;
		}
	});

	return length;
};

export const parseEntry = (entry: unknown): Entry => {
	if (!entry || typeof entry !== "object") {
		throw new Error("Incorrect or missing entry");
	}

	if (
		!("id" in entry) ||
		!("title" in entry) ||
		!("category" in entry) ||
		!("upvotes" in entry) ||
		// !('user' in entry) ||
		!("status" in entry) ||
		!("description" in entry)
	) {
		throw new Error("Some fields are missing");
	}

	const parsedEntry: Entry = {
		id: parseId(entry.id),
		title: parseTitle(entry.title),
		category: parseCategory(entry.category),
		upvotes: parseUpvotes(entry.upvotes),
		// user: parseAuthor(entry.user),
		status: parseStatus(entry.status),
		description: parseDescription(entry.description),
		commentsCount: "comments" in entry ? parseCommentsLength(entry.comments) : 0,
	};

	return parsedEntry;
};

export const parseEntries = (entries: unknown): Entry[] => {
	if (!entries || !(entries instanceof Array)) {
		throw new Error("Incorrect or missing entries");
	}

	return entries.map((entry: Entry) => parseEntry(entry));
};

export const parseEntryDetailed = (entry: unknown): EntryDetailed => {
	if (!entry || typeof entry !== "object") {
		throw new Error("Incorrect or missing entry");
	}

	if (
		!("id" in entry) ||
		!("title" in entry) ||
		!("category" in entry) ||
		!("upvotes" in entry) ||
		// !('user' in entry) ||
		!("status" in entry) ||
		!("description" in entry) ||
		!("comments" in entry)
	) {
		throw new Error("Some fields are missing");
	}

	const parsedEntry: EntryDetailed = {
		id: parseId(entry.id),
		title: parseTitle(entry.title),
		category: parseCategory(entry.category),
		upvotes: parseUpvotes(entry.upvotes),
		// user: parseAuthor(entry.user),
		status: parseStatus(entry.status),
		description: parseDescription(entry.description),
		commentsCount: "comments" in entry ? parseCommentsLength(entry.comments) : 0,
	};

	"comments" in entry && (parsedEntry.comments = parseComments(entry.comments));

	return parsedEntry;
};

export const toNewEntry = (entry: unknown): NewEntry => {
	if (!entry || typeof entry !== "object") {
		throw new Error("Incorrect or missing entry");
	}
	if (!("title" in entry) || !("category" in entry) || !("description" in entry)) {
		throw new Error("Some fields are missing");
	}

	const parsedNewFeedback: NewEntry = {
		title: parseTitle(entry.title),
		description: parseDescription(entry.description),
		category: parseCategory(entry.category),
	};

	if ("status" in entry) {
		parsedNewFeedback.status = parseStatus(entry.status);
	}

	return parsedNewFeedback;
};
