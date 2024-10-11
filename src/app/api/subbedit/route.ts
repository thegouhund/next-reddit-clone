import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const subbedits = await prisma.subbedit.findMany();
  return NextResponse.json(subbedits, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json(
      { message: "Subbedit name is required" },
      { status: 400 },
    );
  }

  const existingSubbedit = await prisma.subbedit.findUnique({ where: { name: body.name } });
  if (existingSubbedit) {
    return NextResponse.json(
      { message: "Subbedit with this name already exists" },
      { status: 400 },
    );
  }

  const subbedit = await prisma.subbedit.create(body);
  console.log(subbedit);
  return NextResponse.json(subbedit, { status: 201 });
}
