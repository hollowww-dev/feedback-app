import { ReactNode, createContext, useReducer } from "react";
import { Category, FilterContextType } from "../app/types";

const filterReducer = (
  state: FilterContextType["state"],
  action: { type: "SET"; payload: "all" | Category }
): "all" | Category => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const FilterContext = createContext<FilterContextType>({
  state: "all",
  dispatch: () => {},
});

export const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filterValue, filterDispatch] = useReducer(filterReducer, "all");
  const value: FilterContextType = {
    state: filterValue,
    dispatch: filterDispatch,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterContext;
