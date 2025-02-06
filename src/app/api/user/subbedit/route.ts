import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userSubbedits = await prisma.userSubbedit.findMany({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  return NextResponse.json(userSubbedits, { status: 200 });
}
