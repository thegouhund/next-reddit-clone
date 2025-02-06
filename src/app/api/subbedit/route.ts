import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {
  const subbedits = await prisma.subbedit.findMany();
  return NextResponse.json(subbedits, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth();
  const user = session?.user;

  if (!body.name) {
    return NextResponse.json(
      { message: "Subbedit name is required" },
      { status: 400 },
    );
  }

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const existingSubbedit = await prisma.subbedit.findUnique({
    where: { name: body.name },
  });

  if (existingSubbedit) {
    return NextResponse.json(
      { message: "Subbedit with this name already exists" },
      { status: 400 },
    );
  }

  const subbedit = await prisma.subbedit.create({ data: { name: body.name } });

  await prisma.userSubbedit.create({
    data: {
      userId: parseInt(user.id),
      subbeditId: subbedit.id,
      role: Role.CREATOR,
    },
  });

  return NextResponse.json(subbedit, { status: 201 });
}
