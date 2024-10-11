import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.postId, 36) },
    include: { Subbedit: true, Comment: { include: { User: true } } },
  });

  console.log(post);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
}
