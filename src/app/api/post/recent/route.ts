import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "100");
  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {Subbedit: true, User: true},
  });

  return NextResponse.json(posts, { status: 200 });
};
