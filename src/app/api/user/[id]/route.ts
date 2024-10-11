import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: number } },
) {
  const users = await prisma.user.findUnique({ where: { id: params.id } });
  if (!users) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: users }, { status: 200 });
}
