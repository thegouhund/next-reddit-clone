import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;
  const subbeditWithPosts = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
    include: {
      Post: {
        include: { User: true, Subbedit: true, Vote: true, Flair: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!subbeditWithPosts) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(subbeditWithPosts.Post, { status: 200 });
}

export const POST = async (
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) => {
  const { subbeditName } = await params;
  const session = await auth();
  const body = await request.json();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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

  const post = await prisma.post.create({
    data: {
      title: body.title,
      body: body.body,
      mediaUrl: body.mediaUrl,
      userId: parseInt(session.user.id),
      subbeditId: subbedit.id,
      flairId: parseInt(body.flairId),
    },
  });

  return NextResponse.json(post, { status: 201 });
};
