import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 }
      );
    }

   // Find User
const user = await User.findOne({ email });

if (!user) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid Email or Password",
    },
    { status: 401 }
  );
}
// Compare Password
const isPasswordMatch = await bcrypt.compare(password, user.password);

if (!isPasswordMatch) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid Email or Password",
    },
    { status: 401 }
  );
}
// Generate JWT Token
const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "7d",
  }
);
const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
});

return NextResponse.json(
  {
    success: true,
    message: "Login Successful",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      institution: user.institution,
      grade: user.grade,
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