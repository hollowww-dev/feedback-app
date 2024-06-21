"use client";

import { ReactNode } from "react";
import { useUser } from "../contexts/userHooks";

const Permitted = ({ children }: { children: ReactNode }) => {
	const user = useUser();
	if (!user) {
		return null;
	} else {
		return children;
	}
};

export default Permitted;
