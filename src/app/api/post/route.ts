import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  console.log("body: ", body);
  if (!body.body) {
    return NextResponse.json(
      { message: "Post body is required" },
      { status: 400 },
    );
  }

  const commentData: Prisma.CommentUncheckedCreateInput = {
    body: body.body,
    userId: parseInt(session.user.id),
    postId: body.postId,
    parentCommentId: body.parentCommentId,
  };

  const comment = await prisma.comment.create({
    data: commentData,
    include: { User: true },
  });

  return NextResponse.json(comment, { status: 201 });
};
