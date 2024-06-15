"use client";

import { Entry, SortBy } from "../../types";

import { useState } from "react";

import _ from "lodash";

import styles from "./FeedbackList.module.scss";

import Image from "next/image";

import IconSuggestions from "../../../assets/suggestions/icon-suggestions.svg";
import IconPlus from "../../../assets/shared/icon-plus.svg";

import FeedbackEntry from "../FeedbackEntry";
import Select from "react-select";
import Button from "../Button";
import NoFeedback from "./NoFeedback";
import { useFilterValue } from "@/app/contexts/filterHooks";

const sortByOptions: SortBy[] = [
	{ label: "Most Upvotes", value: ["upvotes", "desc"] },
	{ label: "Least Upvotes", value: ["upvotes", "asc"] },
	{ label: "Most Comments", value: ["comments", "desc"] },
	{ label: "Least Comments", value: ["comments", "asc"] },
];

const FeedbackList = ({ rawSuggestions }: { rawSuggestions: Entry[] }) => {
	const [sortBy, setSortBy] = useState<SortBy["value"]>(["upvotes", "desc"]);
	const filter = useFilterValue();

	const suggestions = filter === "all" ? rawSuggestions : rawSuggestions.filter(entry => entry.category === filter);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>
					<h2 className={styles.suggestions}>
						<Image src={IconSuggestions} alt="Suggestions icon" priority={true} />
						{suggestions.length} Suggestions
					</h2>
					<div className={styles.sortBy}>
						<p>Sort by:</p>
						<Select
							classNamePrefix="select"
							classNames={{
								control: state => (state.menuIsOpen ? "select__control--is-open" : ""),
							}}
							isSearchable={false}
							options={sortByOptions}
							defaultValue={sortByOptions[0]}
							value={sortByOptions.find(i => i.value === sortBy)}
							onChange={i => i && setSortBy(i.value)}
							inputId="sortBy"
							instanceId="sortBy"
						/>
					</div>
				</div>
				<Button type="button" label="Add feedback" variant="primary" icon={IconPlus} />
			</div>
			<div className={styles.entries}>
				{suggestions.length !== 0 ? (
					_.orderBy(suggestions, sortBy[0], sortBy[1]).map(entry => <FeedbackEntry key={entry.id} entry={entry} extend={true} />)
				) : (
					<NoFeedback />
				)}
			</div>
		</div>
	);
};

export default FeedbackList;
