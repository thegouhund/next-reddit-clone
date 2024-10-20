import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const existingVote = await prisma.vote.findFirst({
    where: {
      userId: parseInt(session.user.id),
      commentId: body.commentId,
      postId: null,
    },
  });

  if (existingVote) {
    const vote = await prisma.vote.updateMany({
      where: {
        userId: parseInt(session.user.id),
        commentId: body.commentId,
        postId: null,
      },
      data: {
        isUpvote: body.isUpvote,
      },
    });
    return NextResponse.json(vote, { status: 200 });
  }

  const vote = await prisma.vote.create({
    data: {
      userId: parseInt(session.user.id),
      commentId: body.commentId,
      isUpvote: body.isUpvote,
    },
  });

  return NextResponse.json(vote, { status: 201 });
};

export const DELETE = async (request: NextRequest) => {
  const body = await request.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (body.commentId) {
    const vote = await prisma.vote.deleteMany({
      where: {
        userId: parseInt(session.user.id),
        commentId: body.commentId,
        postId: null,
      },
    });
    return NextResponse.json(vote, { status: 201 });
  }
};
