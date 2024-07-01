"use client";

import { useState } from "react";
import styles from "./RoadmapPage.module.scss";
import clsx from "clsx";
import RoadmapColumn, { RoadmapColumnSkeleton } from "./RoadmapColumn";

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
	const [active, setActive] = useState<"planned" | "inprogress" | "live">("planned");
	return (
		<div className={styles.roadmapMobile}>
			<div className={styles.tabs}>
				<button
					className={clsx(`${styles.tab}`, `${styles.planned}`, active === "planned" && `${styles.active}`)}
					onClick={() => setActive("planned")}>
					Planned
				</button>
				<button
					className={clsx(`${styles.tab}`, `${styles.inprogress}`, active === "inprogress" && `${styles.active}`)}
					onClick={() => setActive("inprogress")}>
					In-Progress
				</button>
				<button
					className={clsx(`${styles.tab}`, `${styles.live}`, active === "live" && `${styles.active}`)}
					onClick={() => setActive("live")}>
					Live
				</button>
			</div>
			<RoadmapColumn status={active} />
		</div>
	);
};

export default RoadmapMobile;
