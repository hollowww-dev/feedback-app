import { Entry } from "../../types";

import { useRouter } from "next/navigation";

import clsx from "clsx";

import Image from "next/image";

import styles from "./FeedbackEntry.module.scss";

import IconArrowUp from "../../../assets/shared/icon-arrow-up";
import IconComments from "../../../assets/shared/icon-comments.svg";

import { CategoryLabel } from "../Button";
const FeedbackEntry = ({ entry, extend, link }: { entry: Entry; extend?: boolean; link?: boolean }) => {
	const router = useRouter();

	return (
		<div
			className={clsx(`${styles.feedbackEntry}`, extend && `${styles.extend}`, link && `${styles.link}`)}
			onClick={() => {
				link && router.push(`/feedback/${entry.id}`);
			}}>
			<div className={styles.content}>
				<h3>{entry.title}</h3>
				<p>{entry.description}</p>
				<CategoryLabel category={entry.category} />
			</div>
			<button className={clsx(`${styles.votes}`)}>
				<IconArrowUp />
				{entry.upvotes}
			</button>
			<div className={styles.comments}>
				<Image src={IconComments} alt="Comments icon" />
				{entry.comments}
			</div>
		</div>
	);
};

export default FeedbackEntry;
