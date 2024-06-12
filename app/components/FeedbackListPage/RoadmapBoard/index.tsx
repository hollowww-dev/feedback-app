import styles from "./RoadmapBoard.module.scss";

import Link from "next/link";

const RoadmapBoard = ({
	plannedCount,
	inProgressCount,
	liveCount,
}: {
	plannedCount: number;
	inProgressCount: number;
	liveCount: number;
}) => {
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
					<span className={styles.number}>{plannedCount}</span>
				</div>
				<div>
					<span className={styles.inProgress}>In-Progress</span>
					<span className={styles.number}>{inProgressCount}</span>
				</div>
				<div>
					<span className={styles.live}>Live</span> <span className={styles.number}>{liveCount}</span>
				</div>
			</div>
		</div>
	);
};

export default RoadmapBoard;
