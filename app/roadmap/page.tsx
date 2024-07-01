import Link from "next/link";
import GoBack from "../components/GoBack";
import RoadmapLoader from "./RoadmapLoader";

import styles from "./RoadmapPage.module.scss";
import Button from "../components/Button";

import IconPlus from "@/assets/shared/icon-plus.svg";
import { RoadmapColumnSkeleton } from "./RoadmapColumn";

import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";

import RoadmapMobile from "./RoadmapMobile";
import RoadmapMobileLoader from "./RoadmapMobileLoader";

export default function Page() {
	return (
		<div className={styles.roadmapPage}>
			<div className={styles.header}>
				<div className={styles.left}>
					<GoBack white={true} />
					<h2>Roadmap</h2>
				</div>
				<Link href="/entry/addnew" prefetch={true}>
					<Button type="button" label="Add feedback" variant="primary" icon={IconPlus} />
				</Link>
			</div>
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
			<Suspense fallback={<RoadmapColumnSkeleton />}>
				<RoadmapMobileLoader />
			</Suspense>
		</div>
	);
}
