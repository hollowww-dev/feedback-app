"use client";

import Link from "next/link";
import Button from "../components/Button";
import GoBack from "../components/GoBack";
import styles from "./RoadmapPage.module.scss";

import IconPlus from "@/assets/shared/icon-plus.svg";
import { useNotify } from "../contexts/notificationHooks";
import useUser from "../hooks/useUser";

const RoadmapHeader = () => {
	const user = useUser();
	const notify = useNotify();
	return (
		<div className={styles.header}>
			<div className={styles.left}>
				<GoBack white={true} />
				<h2>Roadmap</h2>
			</div>
			<Link
				onClick={() => !user && notify("You need to be logged in to add feedback.")}
				href={(user && "/entry/addnew") || "#"}
				prefetch={true}>
				<Button type="button" label="Add feedback" variant="primary" icon={IconPlus} disabled={!user} />
			</Link>
		</div>
	);
};

export default RoadmapHeader;
