import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    // MongoDB Connect
    await connectDB();

    // Request Body
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      password,
      institution,
      grade,
    } = body;
    // Validate Required Fields
if (
  !firstName ||
  !lastName ||
  !email ||
  !password ||
  !institution ||
  !grade
) {
  return NextResponse.json(
    {
      success: false,
      message: "All fields are required",
    },
    { status: 400 }
  );
}// Check Existing User
const existingUser = await User.findOne({ email });

if (existingUser) {
  return NextResponse.json(
    {
      success: false,
      message: "User already exists",
    },
    { status: 409 }
  );
}// Hash Password
const hashedPassword = await bcrypt.hash(password, 10);
// Create New User
const user = await User.create({
  firstName,
  lastName,
  email,
  password: hashedPassword,
  institution,
  grade,
});
return NextResponse.json(
  {
    success: true,
    message: "User registered successfully",
    user,
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