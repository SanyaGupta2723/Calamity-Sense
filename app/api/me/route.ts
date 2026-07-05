import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}