import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const subbeditWithPosts = await prisma.subbedit.findUnique({
    where: { name: params.subbeditName },
    include: {
      Post: {
        include: { User: true, Subbedit: true },
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

  console.log(JSON.stringify(subbeditWithPosts.Post, null, 2));

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

  if (!body.body) {
    return NextResponse.json(
      { message: "Post body is required" },
      { status: 400 },
    );
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

  const post = await prisma.post.create({
    data: {
      ...body,
      userId: session.user.id,
      subbeditId: subbedit.id,
    }
  });

  return NextResponse.json(post, { status: 201 });
};
