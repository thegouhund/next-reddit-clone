import { Subbedit } from "@models/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const subbedits = await Subbedit.findAll();
  return NextResponse.json(subbedits, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json(
      { message: "Subbedit name is required" },
      { status: 400 },
    );
  }

  const existingUser = await Subbedit.findOne({ where: { name: body.name } });
  if (existingUser) {
    return NextResponse.json(
      { message: "Subbedit with this name already exists" },
      { status: 400 },
    );
  }

  const subbedit = await Subbedit.create(body);
  console.log(subbedit);
  return NextResponse.json(subbedit, { status: 201 });
}
