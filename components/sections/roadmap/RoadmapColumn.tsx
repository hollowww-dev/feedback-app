"use client";

import styles from "./RoadmapPage.module.scss";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getEntriesHandler } from "@/services/feedback";
import FeedbackEntry, {
  FeedbackEntrySkeleton,
} from "@components/common/FeedbackEntry";
import Skeleton from "react-loading-skeleton";

export const RoadmapColumnSkeleton = () => {
  return (
    <div className={styles.roadmapColumn}>
      <div className={styles.title}>
        <h2>
          <Skeleton width={150} />
        </h2>
        <p>
          <Skeleton width={200} />
        </p>
      </div>
      <FeedbackEntrySkeleton extend={false} roadmap={true} />
    </div>
  );
};

const RoadmapColumn = ({
  status,
}: {
  status: "planned" | "inprogress" | "live";
}) => {
  const { data: entries } = useSuspenseQuery({
    queryKey: ["entries", { status }],
    queryFn: () => getEntriesHandler(status),
  });

  const Title = () => {
    switch (status) {
      case "planned":
        return (
          <div className={styles.title}>
            <h2>Planned ({entries.length})</h2>
            <p>Ideas prioritized for research</p>
          </div>
        );
      case "inprogress":
        return (
          <div className={styles.title}>
            <h2>In-Progress ({entries.length})</h2>
            <p>Currently being developed</p>
          </div>
        );
      case "live":
        return (
          <div className={styles.title}>
            <h2>Live ({entries.length})</h2>
            <p>Released features</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.roadmapColumn}>
      <Title />
      {entries.map((entry) => (
        <FeedbackEntry
          key={entry.id}
          entry={entry}
          link={true}
          roadmap={true}
        />
      ))}
    </div>
  );
};

export default RoadmapColumn;
