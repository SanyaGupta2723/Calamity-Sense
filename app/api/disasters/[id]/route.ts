import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Disaster from "@/models/Disaster";

// ===========================
// GET SINGLE DISASTER
// ===========================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const disaster = await Disaster.findById(id);

    if (!disaster) {
      return NextResponse.json(
        {
          success: false,
          message: "Disaster not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        disaster,
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

// ===========================
// UPDATE DISASTER
// ===========================

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const disaster = await Disaster.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!disaster) {
      return NextResponse.json(
        {
          success: false,
          message: "Disaster not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Disaster updated successfully",
        disaster,
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

// ===========================
// DELETE DISASTER
// ===========================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const disaster = await Disaster.findByIdAndDelete(id);

    if (!disaster) {
      return NextResponse.json(
        {
          success: false,
          message: "Disaster not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Disaster deleted successfully",
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