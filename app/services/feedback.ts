import { unstable_cache } from "next/cache";
import { addComment, addReply, createEntry, getSingle, getStats, getSuggestions, upvote } from "@/actions";
import { NewEntry } from "../types";

export const getSuggestionsHandler = unstable_cache(
	async () => {
		const response = await getSuggestions();
		if (response.success) {
			return response.data;
		} else {
			throw new Error(response.message);
		}
	},
	["suggestions"],
	{ tags: ["suggestions"] }
);
export const getStatsHandler = unstable_cache(
	async () => {
		const response = await getStats();
		if (response.success) {
			return response.data;
		} else {
			throw new Error(response.message);
		}
	},
	["stats"],
	{ tags: ["stats"] }
);

export const getSingleHandler = unstable_cache(
	async (id: string) => {
		const response = await getSingle(id);
		if (response.success) {
			return response.data;
		} else {
			throw new Error(response.message);
		}
	},
	["entry"],
	{ tags: ["entry"] }
);

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
