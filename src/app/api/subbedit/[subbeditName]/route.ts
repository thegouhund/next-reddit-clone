import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
  });
  return NextResponse.json(subbedit, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;
  const session = await auth();
  const body = await request.json();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
  });

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  const updateSubbedit = await prisma.subbedit.update({
    where: {
      id: subbedit.id,
    },
    data: {
      description: body.description,
      rules: body.rules,
    },
  });

  return NextResponse.json(updateSubbedit, { status: 200 });
}
