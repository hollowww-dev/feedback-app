import { BaseSyntheticEvent, ReactNode, useState } from "react";

import { useMediaQuery } from "react-responsive";

import breakpoints from "../../../styles/_breakpoints.module.scss";

import styles from "./TitleBoard.module.scss";

import Image from "next/image";
import Link from "next/link";

import IconClose from "../../../../assets/shared/mobile/icon-close.svg";
import IconHamburger from "../../../../assets/shared/mobile/icon-hamburger.svg";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useLogout from "@/app/hooks/useLogout";

const TitleBoard = ({ children }: { children?: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMediaQuery({
		query: `(max-width: ${breakpoints.mobile})`,
	});
	const user = useCurrentUser();
	const logout = useLogout();

	return (
		<div className={styles.titleBoard}>
			<div className={styles.title}>
				<h2>Feedback app</h2>
				{!user ? (
					<p>
						<Link href="/signin" prefetch={true}>
							Sign in
						</Link>
						{` | `}
						<Link href="/signup" prefetch={true}>
							Sign up
						</Link>
					</p>
				) : (
					<p>
						{user.name.length > 9 ? `${user.name.substring(0, 6)}...` : user.name} (@
						{user.username.length > 10 ? `${user.username.substring(0, 8)}...` : user.username}) |{" "}
						<span onClick={logout} className={styles.logout}>
							Logout
						</span>
					</p>
				)}
			</div>

			{isMobile &&
				(isOpen ? (
					<Image src={IconClose} alt="Close icon" onClick={() => setIsOpen(false)} />
				) : (
					<Image src={IconHamburger} alt="Close icon" onClick={() => setIsOpen(true)} />
				))}
			{isMobile && isOpen && (
				<div className={styles.open} onClick={(e: BaseSyntheticEvent) => e.target.className === "open" && setIsOpen(false)}>
					<div className={styles.content}>{children}</div>
				</div>
			)}
		</div>
	);
};

export default TitleBoard;
