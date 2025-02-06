import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;
  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
    include: { Flair: true },
  });

  return NextResponse.json(subbedit?.Flair, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const body = await request.json();

  const flair = await prisma.flair.create({
    data: {
      name: body.name,
      description: body.description,
      color: body.color,
      subbeditId: 1,
    },
  });

  return NextResponse.json(flair, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const deletedFlair = await prisma.flair.delete({
    where: {
      id: parseInt(body.flairId),
    },
  });

  return NextResponse.json(deletedFlair, { status: 200 });
}
