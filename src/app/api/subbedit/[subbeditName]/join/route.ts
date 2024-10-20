import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: params.subbeditName },
  });

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  const existingRelation = await prisma.userSubbedit.findUnique({
    where: {
      userId_subbeditId: {
        userId: parseInt(session.user.id),
        subbeditId: subbedit.id,
      },
    },
  });

  if (existingRelation) {
    return NextResponse.json(
      { message: "Already joined the subbedit" },
      { status: 400 },
    );
  }

  const joinSubbedit = await prisma.userSubbedit.create({
    data: {
      userId: parseInt(session.user.id),
      subbeditId: subbedit.id,
      joinedAt: new Date(),
    },
  });

  return NextResponse.json(joinSubbedit, { status: 201 });
}
