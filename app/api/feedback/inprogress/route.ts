import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import feedbackModel from "@/models/feedback";

import { parseEntries } from "@/utils/toEntry";

export async function GET() {
  try {
    await dbConnect();
    const entries = await feedbackModel
      .find({ status: "inprogress" })
      .populate([{ path: "comments" }, { path: "user" }]);
    const parsedEntries = parseEntries(entries);
    return NextResponse.json(
      { success: true, data: parsedEntries },
      { status: 200 }
    );
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
