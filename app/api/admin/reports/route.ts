import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Report";

export async function GET() {
  try {
    await connectDB();

    const reports = await Report.find()
      .populate("user", "firstName lastName email")
      .populate("disaster", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: reports.length,
        reports,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}