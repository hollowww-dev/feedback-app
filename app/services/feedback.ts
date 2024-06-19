import { cache } from "react";
import { addComment, addReply, createEntry, getSingle, getStats, getSuggestions, upvote } from "@/actions";
import { NewEntry } from "../types";

export const getSuggestionsHandler = cache(async () => {
	const response = await getSuggestions();
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
});
export const getStatsHandler = cache(async () => {
	const response = await getStats();
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
});

export const getSingleHandler = cache(async (id: string) => {
	const response = await getSingle(id);
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
});

export const createEntryHandler = async (content: NewEntry) => {
	const response = await createEntry(content);
	if (response.success) {
		return response.data;
	} else {
		throw new Error(response.message);
	}
};

export const upvoteHandler = async (id: string) => {
	const response = await upvote(id);
	if (!response.success) {
		throw new Error(response.message);
	}
};

export const addCommentHandler = async (id: string, content: string) => {
	const response = await addComment(id, content);
	if (!response.success) {
		throw new Error(response.message);
	}
};

export const addReplyHandler = async (id: string, content: string, replyingTo: string) => {
	const response = await addReply(id, content, replyingTo);
	if (!response.success) {
		throw new Error(response.message);
	}
};
