import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Report from "@/models/Report";
import Disaster from "@/models/Disaster";
import Alert from "@/models/Alert";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const totalReports = await Report.countDocuments();

    const approvedReports = await Report.countDocuments({
      status: "Approved",
    });

    const pendingReports = await Report.countDocuments({
      status: "Pending",
    });

    const rejectedReports = await Report.countDocuments({
      status: "Rejected",
    });

    const activeAlerts = await Alert.countDocuments({
      isActive: true,
    });

    const totalDisasters = await Disaster.countDocuments();

    return NextResponse.json(
      {
        success: true,
        dashboard: {
          totalUsers,
          totalReports,
          approvedReports,
          pendingReports,
          rejectedReports,
          activeAlerts,
          totalDisasters,
        },
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