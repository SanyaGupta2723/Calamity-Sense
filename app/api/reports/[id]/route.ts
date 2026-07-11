import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Report";

// ======================
// GET SINGLE REPORT
// ======================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const report = await Report.findById(id)
      .populate("user", "firstName lastName email")
      .populate("disaster", "title severity");

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: "Report not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        report,
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

// ======================
// UPDATE REPORT
// ======================

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const report = await Report.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: "Report not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Report updated successfully",
        report,
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

// ======================
// DELETE REPORT
// ======================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: "Report not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Report deleted successfully",
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