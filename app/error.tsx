"use client";

import Image from "next/image";
import errorImage from "@/assets/shared/error.svg";

export default function Error() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2em",
        minHeight: "100vh",
      }}
    >
      <Image src={errorImage} alt="error image" width={200} height={200} />
      <p>Something went wrong. Try again later.</p>
    </div>
  );
}
