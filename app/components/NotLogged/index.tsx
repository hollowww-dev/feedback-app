import Link from "next/link";
import styles from "./NotLogged.module.scss";

const NotLogged = () => {
	return (
		<div className={styles.notLogged}>
			<p>
				Please <Link href="/signin">log in</Link> or <Link href="/signup">register</Link> to add a comment.
			</p>
		</div>
	);
};

export default NotLogged;
