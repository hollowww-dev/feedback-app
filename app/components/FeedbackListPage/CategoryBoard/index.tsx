import { Category } from "../../../types";
import { Dispatch, SetStateAction } from "react";

import styles from "./CategoryBoard.module.scss";

import { CategoryLabel } from "../../Button";

const CategoryBoard = ({ filter, setFilter }: { filter: Category | "all"; setFilter: Dispatch<SetStateAction<Category | "all">> }) => {
	return (
		<div className={styles.categoryBoard}>
			<CategoryLabel key="all" category="all" onClick={() => setFilter("all")} active={filter === "all"} />
			{Object.values(Category).map(category => (
				<CategoryLabel key={category} category={category} onClick={() => setFilter(category)} active={filter === category} />
			))}
		</div>
	);
};
export default CategoryBoard;
