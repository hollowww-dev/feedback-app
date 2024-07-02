"use client";

import theme from "@/app/styles/_theme.module.scss";

import { PuffLoader } from "react-spinners";

function Loading() {
	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
			<PuffLoader color={theme.primary} />
		</div>
	);
}

export default Loading;
