import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const subbeditWithPosts = await prisma.subbedit.findUnique({
    where: { name: params.subbeditName },
    include: {
      Post: {
        include: { User: true, Subbedit: true, Vote: true },
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
  const session = await auth();
  const body = await request.json();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: params.subbeditName },
    select: { id: true },
  });

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  const postData: Prisma.PostCreateInput = {
    title: body.title,
    body: body.body,
    mediaUrl: body.mediaUrl,
    User: { connect: { id: parseInt(session.user.id) } },
    Subbedit: { connect: { id: subbedit.id } },
  };

  const post = await prisma.post.create({
    data: postData,
  });

  return NextResponse.json(post, { status: 201 });
};
