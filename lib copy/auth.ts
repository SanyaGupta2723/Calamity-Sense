import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function verifyToken(token: string): JwtPayload {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.verify(
    token,
    process.env.JWT_SECRET
  ) as JwtPayload;
}