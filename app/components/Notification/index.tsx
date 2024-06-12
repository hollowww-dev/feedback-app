"use client";

import { useEffect } from "react";
import { useClearNotification, useNotificationValue } from "../../contexts/notificationHooks";

import styles from "./Notification.module.scss";

import { IoClose } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Notification = () => {
	const notificationValue = useNotificationValue();
	const clearNotification = useClearNotification();
	useEffect(() => {
		if (!notificationValue) {
			return;
		}
		const timeout = setTimeout(() => {
			clearNotification();
		}, 7000);

		return () => {
			clearTimeout(timeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationValue]);

	return (
		<>
			{notificationValue && (
				<div className={styles.notification}>
					<IoIosInformationCircleOutline className={styles.icon} />
					<p>{notificationValue}</p>
					<IoClose className={styles.close} onClick={() => clearNotification()} />
				</div>
			)}
		</>
	);
};

export default Notification;
