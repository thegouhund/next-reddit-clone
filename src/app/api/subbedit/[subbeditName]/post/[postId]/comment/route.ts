import { auth } from "@/app/auth";
import { Comment, Subbedit } from "@/app/db/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { subbeditName: number; postId: string } },
) {
  const session = await auth();
  const body = await request.json();
  const subbedit = await Subbedit.findOne({
    where: { name: params.subbeditName },
    attributes: ["id"],
  });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  if (!body.body) {
    return NextResponse.json(
      { message: "Post body is required" },
      { status: 400 },
    );
  }

  const comment = await Comment.create({
    ...body,
    userId: session.user.id,
    postId: params.postId,
    subbeditId: subbedit.getDataValue("id"),
  });

  return NextResponse.json(comment, { status: 201 });
}
