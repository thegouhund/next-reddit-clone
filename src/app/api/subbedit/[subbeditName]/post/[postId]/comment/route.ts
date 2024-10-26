import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { subbeditName: string; postId: string } },
) {
  const { subbeditName, postId } = await params;
  const session = await auth();
  const body = await request.json();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!body.body) {
    return NextResponse.json(
      { message: "Post body is required" },
      { status: 400 },
    );
  }

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
    select: { id: true },
  });

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  const commentData: Prisma.CommentUncheckedCreateInput = {
    body: body.body,
    userId: parseInt(session.user.id),
    postId: parseInt(postId),
  };

  const comment = await prisma.comment.create({
    data: commentData,
    include: { User: true },
  });

  return NextResponse.json(comment, { status: 201 });
}
