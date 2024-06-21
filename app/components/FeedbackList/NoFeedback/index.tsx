import Image from "next/image";

import IllustrationEmpty from "../../../../assets/suggestions/illustration-empty.svg";
import IconPlus from "../../../../assets/shared/icon-plus.svg";

import styles from "./NoFeedback.module.scss";

import Button from "../../Button";
import Link from "next/link";

const NoFeedback = () => {
	return (
		<>
			<div className={styles.noFeedback}>
				<Image src={IllustrationEmpty} alt="No feedback" />
				<h3>There is no feedback yet.</h3>
				<p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
				<Link href="/entry/addnew">
					<Button type="button" label="Add feedback" variant="primary" icon={IconPlus} />
				</Link>
			</div>
		</>
	);
};

export default NoFeedback;
