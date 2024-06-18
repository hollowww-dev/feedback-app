"use client";

import { PuffLoader } from "react-spinners";

import theme from "./styles/_theme.module.scss";

function Loading() {
	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
			<PuffLoader color={theme.primary} />
		</div>
	);
}

export default Loading;
