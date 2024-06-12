"use client";

import { PuffLoader } from "react-spinners";

import theme from "./styles/_theme.module.scss";

function Loading() {
	return <PuffLoader color={theme.primary} />;
}

export default Loading;
