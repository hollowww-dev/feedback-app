import Image from "next/image";

import IllustrationEmpty from "../../../../assets/suggestions/illustration-empty.svg";
import IconPlus from "../../../../assets/shared/icon-plus.svg";

import styles from "./NoFeedback.module.scss";

import Button from "../../Button";

const NoFeedback = () => {
	return (
		<div className={styles.noFeedback}>
			<Image src={IllustrationEmpty} alt="No feedback" />
			<h3>There is no feedback yet.</h3>
			<p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
			<Button type="button" label="Add feedback" variant="primary" icon={IconPlus} />
		</div>
	);
};

export default NoFeedback;
