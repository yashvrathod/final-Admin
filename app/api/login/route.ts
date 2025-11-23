import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const HASHED_PASSWORD = process.env.ADMIN_PASSWORD_HASH!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const matchEmail = email === ADMIN_EMAIL;
  const matchPassword = bcrypt.compareSync(password, HASHED_PASSWORD);

  if (!matchEmail || !matchPassword) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

  const res = NextResponse.json({ message: "Logged in" }, { status: 200 });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60,
  });

  return res;
}
