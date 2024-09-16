import { Comment } from "@/app/db/model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log("body: ", body);
  if (!body.body) {
    return NextResponse.json(
      { message: "Post body is required" },
      { status: 400 },
    );
  }

  const comment = await Comment.create({
    body: body.body,
    userId: body.userId,
    postId: body.postId,
    parentCommentId: body.parentCommentId,
  });

  return NextResponse.json(comment, { status: 201 });
};
