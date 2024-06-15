"use client";

import { ReactNode, useState } from "react";

import styles from "./Board.module.scss";

import Image from "next/image";
import Link from "next/link";

import IconClose from "@/assets/shared/mobile/icon-close.svg";
import IconHamburger from "@/assets/shared/mobile/icon-hamburger.svg";
import CategoryBoard from "../CategoryBoard";
import clsx from "clsx";

const Board = ({ children }: { children?: JSX.Element | ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.board}>
			<div className={styles.titleBoard}>
				<div className={styles.title}>
					<h2>Feedback app</h2>
					<p>
						<Link href="/signin" prefetch={true}>
							Sign in
						</Link>
						{` | `}
						<Link href="/signup" prefetch={true}>
							Sign up
						</Link>
					</p>
				</div>
				<Image src={IconClose} className={isOpen ? undefined : styles.hidden} alt="Close icon" onClick={() => setIsOpen(false)} />
				<Image src={IconHamburger} className={isOpen ? styles.hidden : undefined} alt="Open icon" onClick={() => setIsOpen(true)} />
			</div>
			<div className={clsx(`${styles.contentContainer}`, isOpen && `${styles.open}`)}>
				<div className={styles.content}>
					<CategoryBoard />
					{children}
				</div>
			</div>
		</div>
	);
};

export default Board;
