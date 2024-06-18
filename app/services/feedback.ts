import { cache } from "react";
import { getSingle, getStats, getSuggestions, upvote } from "@/actions";

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

export const upvoteHandler = async (id: string) => {
	const response = await upvote(id);
	if (!response.success) {
		throw new Error(response.message);
	}
};
