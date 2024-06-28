"use client";

import { getStatsHandler } from "@/app/services/feedback";
import styles from "./RoadmapBoard.module.scss";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function RoadmapBoardSkeleton() {
	return (
		<div className={styles.roadmapBoard}>
			<div className={styles.top}>
				<h3>Roadmap</h3>
			</div>
			<div className={styles.count}>
				<div>
					<Skeleton />
				</div>
				<div>
					<Skeleton />
				</div>
				<div>
					<Skeleton />
				</div>
			</div>
		</div>
	);
}

function RoadmapBoard() {
	const { data: count } = useSuspenseQuery({ queryKey: ["stats"], queryFn: getStatsHandler });

	return (
		<div className={styles.roadmapBoard}>
			<div className={styles.top}>
				<h3>Roadmap</h3>
				<Link href="/roadmap" prefetch={false}>
					View
				</Link>
			</div>
			<div className={styles.count}>
				<div>
					<span className={styles.planned}>Planned</span>
					<span className={styles.number}>{count?.find(status => status._id === "planned")?.count || 0}</span>
				</div>
				<div>
					<span className={styles.inProgress}>In-Progress</span>
					<span className={styles.number}>{count?.find(status => status._id === "inprogress")?.count || 0}</span>
				</div>
				<div>
					<span className={styles.live}>Live</span>
					<span className={styles.number}>{count?.find(status => status._id === "live")?.count || 0}</span>
				</div>
			</div>
		</div>
	);
}

export default RoadmapBoard;
