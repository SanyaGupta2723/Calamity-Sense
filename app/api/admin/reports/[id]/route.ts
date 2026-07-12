import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Report";
import Alert from "@/models/Alert";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { status } = await req.json();

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Status",
        },
        { status: 400 }
      );
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

if (report && status === "Approved") {
  // Check if alert already exists
  const existingAlert = await Alert.findOne({
    report: report._id,
  });

  if (!existingAlert) {
    await Alert.create({
      title: report.title,
      description: report.description,
      disaster: report.disaster,
      report: report._id,
      severity: report.severity,
      location: report.address,
    });
  }
}

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
        message: `Report ${status} successfully`,
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