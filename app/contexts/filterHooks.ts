import { useContext } from "react";
import { Category, FilterContextType } from "../types";
import { isCategory } from "@/app/utils";
import FilterContext from "./FilterContext";

export const useFilterValue = (): Category | "all" => {
	const fullContext: FilterContextType = useContext(FilterContext);
	const state = fullContext.state;

	return state;
};

export const useUpdateFilter = () => {
	const fullContext: FilterContextType = useContext(FilterContext);
	const dispatch = fullContext.dispatch;

	return (payload: string) => {
		window.scrollTo(0, 0);
		if (payload === "all") {
			return dispatch({ type: "SET", payload });
		}
		if (!isCategory(payload)) {
			return console.error("Wrong category");
		}
		dispatch({ type: "SET", payload });
	};
};
