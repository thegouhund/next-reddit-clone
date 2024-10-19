import prisma from "@/app/config/db";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "100");

  const posts: PostWithUserAndSubbedit[] = await prisma.post.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {Subbedit: true, User: true, Vote: true},
  });

  return NextResponse.json(posts, { status: 200 });
};
