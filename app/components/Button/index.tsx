import { Category } from "../../types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { findCategoryKey } from "../../utils";

import styles from "./Button.module.scss";

import Image from "next/image";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "delete" | "edit";

const Button = ({
	label,
	variant,
	onClick,
	icon,
	disabled,
	type,
}: {
	label: string;
	variant: ButtonVariant;
	onClick?: () => void;
	icon?: string | StaticImport;
	disabled?: boolean;
	type: "button" | "submit" | "reset";
}) => {
	return (
		<button type={type} className={`${styles.button} ${styles[variant]}`} onClick={onClick} disabled={disabled}>
			{icon && <Image src={icon} alt={`${label} icon`} />}
			{label}
		</button>
	);
};

export const CategoryLabelSkeleton = () => {
	return (
		<button className={styles.category} disabled={true}>
			<p>?</p>
		</button>
	);
};

export const CategoryLabel = ({ category, active, onClick }: { category: Category | "all"; active?: boolean; onClick?: () => void }) => {
	return (
		<button className={clsx(`${styles.category}`, active && `${styles.active}`)} onClick={onClick} disabled={onClick ? false : true}>
			{category !== "all" ? findCategoryKey(category) || "Undefined" : "All"}
		</button>
	);
};

export default Button;
