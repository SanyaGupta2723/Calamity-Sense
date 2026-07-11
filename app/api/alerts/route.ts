import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";

export async function GET() {
  try {
    await connectDB();

    const alerts = await Alert.find()
      .populate("disaster", "title")
      .populate("report", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: alerts.length,
        alerts,
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