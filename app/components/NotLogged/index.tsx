import Link from "next/link";
import styles from "./NotLogged.module.scss";

const NotLogged = () => {
	return (
		<div className={styles.notLogged}>
			<p>
				Please <Link href="/login">log in</Link> or <Link href="/register">register</Link> to add a comment.
			</p>
		</div>
	);
};

export default NotLogged;
