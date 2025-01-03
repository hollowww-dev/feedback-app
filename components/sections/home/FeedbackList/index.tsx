"use client";

import { Entry, SortBy, Status } from "@/types";

import { useState } from "react";

import _ from "lodash";

import styles from "./FeedbackList.module.scss";

import Image from "next/image";

import IconSuggestions from "@/assets/suggestions/icon-suggestions.svg";
import IconPlus from "@/assets/shared/icon-plus.svg";

import FeedbackEntry, {
  FeedbackEntrySkeleton,
} from "../../../common/FeedbackEntry";
import Select from "react-select";
import Button from "../../../common/Button";
import NoFeedback from "./NoFeedback";
import { useFilterValue } from "@/contexts/filterHooks";
import Link from "next/link";
import ClientOnly from "../../../common/ClientOnly";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getEntriesHandler } from "@/services/feedback";
import useUser from "@/hooks/useUser";
import { useNotify } from "@/contexts/notificationHooks";

const sortByOptions: SortBy[] = [
  { label: "Most Upvotes", value: ["upvotes", "desc"] },
  { label: "Least Upvotes", value: ["upvotes", "asc"] },
  { label: "Most Comments", value: ["commentsCount", "desc"] },
  { label: "Least Comments", value: ["commentsCount", "asc"] },
];

export const FeedbackListSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Image src={IconSuggestions} alt="Suggestions icon" priority={true} />
        </div>
        <Button
          type="button"
          label="Add feedback"
          variant="primary"
          icon={IconPlus}
          disabled={true}
        />
      </div>
      <div className={styles.entries}>
        <FeedbackEntrySkeleton extend={true} />
      </div>
    </div>
  );
};

export const FeedbackList = () => {
  const [sortBy, setSortBy] = useState<SortBy["value"]>(["upvotes", "desc"]);
  const filter = useFilterValue();

  const { data: rawSuggestions } = useSuspenseQuery<Entry[]>({
    queryKey: ["entries", { status: "suggestion" }],
    queryFn: () => getEntriesHandler(Status["Suggestion"]),
  });

  const user = useUser();
  const notify = useNotify();

  const suggestions =
    filter === "all"
      ? rawSuggestions
      : rawSuggestions.filter((entry) => entry.category === filter);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2 className={styles.suggestions}>
            <Image
              src={IconSuggestions}
              alt="Suggestions icon"
              priority={true}
            />
            {suggestions.length} Suggestions
          </h2>
          <ClientOnly>
            <div className={styles.sortBy}>
              <label htmlFor="sortBy">Sort by:</label>
              <Select
                name="sortBy"
                className={styles.select}
                classNamePrefix="select"
                classNames={{
                  control: (state) =>
                    state.menuIsOpen ? "select__control--is-open" : "",
                }}
                isSearchable={false}
                options={sortByOptions}
                defaultValue={sortByOptions[0]}
                value={sortByOptions.find((i) => i.value === sortBy)}
                onChange={(i) => i && setSortBy(i.value)}
                instanceId="sortBy"
                inputId="sortBy"
              />
            </div>
          </ClientOnly>
        </div>
        <Link
          onClick={() =>
            !user && notify("You need to be logged in to add feedback.")
          }
          href={(user && "/entry/addnew") || "#"}
          prefetch={true}
        >
          <Button
            type="button"
            label="Add feedback"
            variant="primary"
            icon={IconPlus}
            disabled={!user}
          />
        </Link>
      </div>
      <div className={styles.entries}>
        {suggestions.length === 0 ? (
          <NoFeedback />
        ) : (
          _.orderBy(suggestions, sortBy[0], sortBy[1]).map((entry) => (
            <FeedbackEntry
              key={entry.id}
              entry={entry}
              extend={true}
              link={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
