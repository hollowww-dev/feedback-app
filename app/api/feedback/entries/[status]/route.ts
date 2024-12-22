import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import { feedbackModel } from "@/models";

import { parseEntries } from "@/utils/toEntry";
import { isStatus } from "@/utils";

import { Entry } from "@/types";

export async function GET(
  _req: Request,
  props: { params: Promise<{ status: string }> }
): Promise<
  NextResponse<{
    success: boolean;
    message?: string;
    data: Entry[];
  }>
> {
  const { status } = await props.params;
  if (!isStatus(status)) {
    return NextResponse.json(
      { success: false, message: "Wrong entries status", data: [] },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const entries = await feedbackModel
      .find({ status })
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
