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
