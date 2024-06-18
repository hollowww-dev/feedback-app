"use client";

import { useRouter } from "next/navigation";
import styles from "./GoBack.module.scss";
import clsx from "clsx";
import IconArrowLeft from "@/assets/shared/icon-arrow-left";

const GoBack = ({ white }: { white?: boolean }) => {
	const router = useRouter();

	return (
		<a
			className={clsx(`${styles.goBack}`, white && `${styles.white}`)}
			onClick={() => (window.history?.length && window.history.length > 1 ? router.back() : router.push("/"))}>
			<IconArrowLeft /> Go Back
		</a>
	);
};

export default GoBack;
