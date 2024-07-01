import RoadmapLoader from "./RoadmapLoader";

import styles from "./RoadmapPage.module.scss";

import { RoadmapColumnSkeleton } from "./RoadmapColumn";

import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";

import { RoadmapMobileSkeleton } from "./RoadmapMobile";
import RoadmapMobileLoader from "./RoadmapMobileLoader";
import RoadmapHeader from "./RoadmapHeader";

export default function Page() {
	return (
		<div className={styles.roadmapPage}>
			<RoadmapHeader />
			<div className={styles.roadmapDesktop}>
				<div className={styles.entries}>
					<Suspense fallback={<RoadmapColumnSkeleton />}>
						<RoadmapLoader status="planned" />
					</Suspense>
					<Suspense fallback={<RoadmapColumnSkeleton />}>
						<RoadmapLoader status="inprogress" />
					</Suspense>
					<Suspense fallback={<RoadmapColumnSkeleton />}>
						<RoadmapLoader status="live" />
					</Suspense>
				</div>
			</div>
			<Suspense fallback={<RoadmapMobileSkeleton />}>
				<RoadmapMobileLoader />
			</Suspense>
		</div>
	);
}
