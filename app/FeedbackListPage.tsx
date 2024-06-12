"use client";

import { Category, Entry } from "./types";

import { getAll } from "../actions";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";

import breakpoints from "./styles/_breakpoints.module.scss";
import _ from "lodash";

import styles from "./FeedbackListPage.module.scss";

import FeedbackList from "./components/FeedbackListPage/FeedbackList";
import TitleBoard from "./components/FeedbackListPage/TitleBoard";
import CategoryBoard from "./components/FeedbackListPage/CategoryBoard";
import RoadmapBoard from "./components/FeedbackListPage/RoadmapBoard";

const FeedbackListPage = () => {
	const { data: feedback } = useSuspenseQuery<Entry[]>({
		queryKey: ["feedback"],
		queryFn: getAll,
		refetchOnWindowFocus: false,
	});

	const [filter, setFilter] = useState<Category | "all">("all");

	const isMobile = useMediaQuery({
		query: `(max-width: ${breakpoints.mobile})`,
	});

	const count = _.countBy(_.flatMap(feedback, "status"));

	const suggestions =
		filter === "all"
			? feedback.filter(entry => entry.status === "suggestion")
			: feedback.filter(entry => entry.status === "suggestion" && entry.category === filter);

	return (
		<div className={styles.container}>
			<div className={styles.board}>
				{isMobile ? (
					<TitleBoard>
						<CategoryBoard filter={filter} setFilter={setFilter} />
						<RoadmapBoard plannedCount={count.planned || 0} inProgressCount={count.inprogress || 0} liveCount={count.live || 0} />
					</TitleBoard>
				) : (
					<>
						<TitleBoard />
						<CategoryBoard filter={filter} setFilter={setFilter} />
						<RoadmapBoard plannedCount={count.planned || 0} inProgressCount={count.inprogress || 0} liveCount={count.live || 0} />
					</>
				)}
			</div>
			<FeedbackList suggestions={suggestions} />
		</div>
	);
};

export default FeedbackListPage;
