import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import feedbackModel from "@/models/feedback";

import { parseEntryDetailed } from "@/utils/toEntry";

export async function GET(_req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await dbConnect();
    const feedback = await feedbackModel.findById(params.id).populate([
      {
        path: "comments",
        populate: [
          {
            path: "user",
          },
          {
            path: "replies",
            populate: "user",
          },
        ],
      },
      { path: "user" },
    ]);
    const parsedFeedback = parseEntryDetailed(feedback);
    return NextResponse.json(
      { success: true, data: parsedFeedback },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        { success: false, message: e.message, data: [] },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Something went wrong.", data: [] },
        { status: 500 }
      );
    }
  }
}
