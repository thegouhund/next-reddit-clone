import { auth } from "@/app/auth";
import prisma from "@/app/config/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
    include: { Users: { include: { User: true } } },
  });

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(subbedit.Users, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
  });

  if (!subbedit) {
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );
  }

  const existingRelation = await prisma.userSubbedit.findUnique({
    where: {
      userId_subbeditId: {
        userId: parseInt(session.user.id),
        subbeditId: subbedit.id,
      },
    },
  });

  if (existingRelation) {
    return NextResponse.json(
      { message: "Already joined the subbedit" },
      { status: 400 },
    );
  }

  const joinSubbedit = await prisma.userSubbedit.create({
    data: {
      userId: parseInt(session.user.id),
      subbeditId: subbedit.id,
      joinedAt: new Date(),
    },
  });

  return NextResponse.json(joinSubbedit, { status: 201 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { subbeditName: string } },
) {
  const { subbeditName } = await params;
  const session = await auth();
  const body = await request.json();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const newRole = body.role as Role;

  if (!newRole || !["MEMBER", "MODERATOR", "CREATOR"].includes(newRole)) {
    return NextResponse.json(
      { message: "Invalid role. Must be MEMBER, MODERATOR, or CREATOR" },
      { status: 400 },
    );
  }

  const subbedit = await prisma.subbedit.findUnique({
    where: { name: subbeditName },
  });

  if (!subbedit)
    return NextResponse.json(
      { message: "Subbedit not found" },
      { status: 404 },
    );

  const relations = await prisma.userSubbedit.update({
    where: {
      userId_subbeditId: { userId: body.userId, subbeditId: subbedit.id },
    },
    data: { role: newRole },
  });

  return NextResponse.json(relations, { status: 200 });
}