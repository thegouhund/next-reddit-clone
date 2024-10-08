import { auth } from "@/app/auth";
import { Comment, Post, Subbedit, User } from "@models/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: number } },
) {
  const subbedit = await Subbedit.findOne({
    where: { name: params.subbeditName },
    include: [
      {
        model: Post,
        include: [{ model: User }, { model: Comment }, { model: Subbedit }],
      },
    ],
    order: [[Post, "createdAt", "DESC"]],
    limit: 1,
  });

  if (!subbedit) {
    return NextResponse.json({ error: "Subbedit not found" }, { status: 404 });
  }

  return NextResponse.json(subbedit.Posts, { status: 200 });
}

export const POST = async (
  request: NextRequest,
  { params }: { params: { subbeditName: number } },
) => {
  const session = await auth();
  const body = await request.json();
  const subbedit = await Subbedit.findOne({
    where: { name: params.subbeditName },
    attributes: ["id"],
  });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!body.body) {
    return NextResponse.json(
      { message: "Post body is required" },
      { status: 400 },
    );
  }

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  const post = await Post.create({
    ...body,
    userId: session.user.id,
    subbeditId: subbedit.getDataValue("id"),
  });

  return NextResponse.json(post, { status: 201 });
};
