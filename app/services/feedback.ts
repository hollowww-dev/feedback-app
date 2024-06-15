import "server-only";
import { cache } from "react";
import { getStats, getSuggestions } from "@/actions";

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
