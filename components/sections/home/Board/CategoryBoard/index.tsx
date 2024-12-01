"use client";

import { Category } from "@/types";

import { useFilterValue, useUpdateFilter } from "@/contexts/filterHooks";

import styles from "./CategoryBoard.module.scss";

import { CategoryLabel } from "@components/common/Button";

function CategoryBoard() {
  const filter = useFilterValue();
  const setFilter = useUpdateFilter();

  return (
    <div className={styles.categoryBoard}>
      <CategoryLabel
        key="all"
        category="all"
        onClick={() => setFilter("all")}
        active={filter === "all"}
      />
      {Object.values(Category).map((category) => (
        <CategoryLabel
          key={category}
          category={category}
          onClick={() => setFilter(category)}
          active={filter === category}
        />
      ))}
    </div>
  );
}
export default CategoryBoard;
