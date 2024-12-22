import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import { feedbackModel } from "@/models";
import { Status } from "@/types";

export async function GET(): Promise<
  NextResponse<{
    success: boolean;
    message?: string;
    data: { _id: Status; count: number }[];
  }>
> {
  try {
    await dbConnect();
    const stats = await feedbackModel
      .aggregate([{ $match: { status: { $ne: "suggestion" } } }])
      .sortByCount("status");
    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        { success: false, message: e.message, data: [] },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Something went wrong.", data: [] },
        { status: 500 }
      );
    }
  }
}
