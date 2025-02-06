import prisma from "@configs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.username || !body.email) {
    return NextResponse.json(
      { message: "Username and email are required" },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 400 },
    );
  }

  const user = await prisma.user.create({
    data: { username: body.username, email: body.email },
  });

  return NextResponse.json(user, { status: 201 });
}
