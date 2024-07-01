"use client";

import { Suspense, useState } from "react";
import styles from "./RoadmapPage.module.scss";
import ClientOnly from "../components/ClientOnly";
import clsx from "clsx";
import RoadmapColumn, { RoadmapColumnSkeleton } from "./RoadmapColumn";

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
			<Suspense fallback={<RoadmapColumnSkeleton />}>
				<RoadmapColumn status={active} />
			</Suspense>
		</div>
	);
};

export default RoadmapMobile;
