import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Report";
import User from "@/models/User";
import Disaster from "@/models/Disaster";

// =========================
// GET ALL REPORTS
// =========================

export async function GET() {
  try {
    await connectDB();

    const reports = await Report.find()
      .populate("user", "firstName lastName email")
      .populate("disaster", "title severity")
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
        message: "Failed to fetch reports",
      },
      { status: 500 }
    );
  }
}

// =========================
// CREATE REPORT
// =========================

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      user,
      disaster,
      title,
      description,
      image,
      latitude,
      longitude,
      address,
      severity,
    } = body;

    // Validation
    if (
      !user ||
      !disaster ||
      !title ||
      !description ||
      latitude === undefined ||
      longitude === undefined ||
      !address
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields are mandatory",
        },
        { status: 400 }
      );
    }

    // Check User
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Check Disaster
    const existingDisaster = await Disaster.findById(disaster);

    if (!existingDisaster) {
      return NextResponse.json(
        {
          success: false,
          message: "Disaster not found",
        },
        { status: 404 }
      );
    }

    const report = await Report.create({
      user,
      disaster,
      title,
      description,
      image,
      latitude,
      longitude,
      address,
      severity,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Report submitted successfully",
        report,
      },
      { status: 201 }
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