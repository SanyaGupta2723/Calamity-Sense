import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Disaster from "@/models/Disaster";

/* ==========================
   GET ALL DISASTERS
========================== */

export async function GET() {
  try {
    await connectDB();

    const disasters = await Disaster.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: disasters.length,
        disasters,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Disasters Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch disasters",
      },
      { status: 500 }
    );
  }
}

/* ==========================
   CREATE DISASTER
========================== */

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      slug,
      description,
      image,
      severity,
      dos,
      donts,
      emergencyNumbers,
    } = body;

    // Validation
    if (!title || !slug || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, Slug and Description are required.",
        },
        { status: 400 }
      );
    }

    // Duplicate Slug Check
    const existingDisaster = await Disaster.findOne({ slug });

    if (existingDisaster) {
      return NextResponse.json(
        {
          success: false,
          message: "Disaster already exists.",
        },
        { status: 409 }
      );
    }

    // Create Disaster
    const disaster = await Disaster.create({
      title,
      slug,
      description,
      image,
      severity,
      dos,
      donts,
      emergencyNumbers,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Disaster created successfully.",
        disaster,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Disaster Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}