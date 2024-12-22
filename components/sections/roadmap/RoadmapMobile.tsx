"use client";

import { useState } from "react";
import styles from "./RoadmapPage.module.scss";
import clsx from "clsx";
import RoadmapColumn, { RoadmapColumnSkeleton } from "./RoadmapColumn";
import { Status } from "@/types";

export const RoadmapMobileSkeleton = () => {
  return (
    <div className={styles.roadmapMobile}>
      <div className={styles.tabs}>
        <button className={styles.tab} disabled={true}>
          Planned
        </button>
        <button className={styles.tab} disabled={true}>
          In-Progress
        </button>
        <button className={styles.tab} disabled={true}>
          Live
        </button>
      </div>
      <RoadmapColumnSkeleton />
    </div>
  );
};

const RoadmapMobile = () => {
  const [active, setActive] = useState<Exclude<Status, Status.Suggestion>>(
    Status["Planned"]
  );
  return (
    <div className={styles.roadmapMobile}>
      <div className={styles.tabs}>
        <button
          className={clsx(
            `${styles.tab}`,
            `${styles.planned}`,
            active === "planned" && `${styles.active}`
          )}
          onClick={() => setActive(Status["Planned"])}
        >
          Planned
        </button>
        <button
          className={clsx(
            `${styles.tab}`,
            `${styles.inprogress}`,
            active === "inprogress" && `${styles.active}`
          )}
          onClick={() => setActive(Status["In-Progress"])}
        >
          In-Progress
        </button>
        <button
          className={clsx(
            `${styles.tab}`,
            `${styles.live}`,
            active === "live" && `${styles.active}`
          )}
          onClick={() => setActive(Status["Live"])}
        >
          Live
        </button>
      </div>
      <RoadmapColumn status={active} />
    </div>
  );
};

export default RoadmapMobile;
