import { NextRequest, NextResponse } from "next/server";
import User from "@models/User";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: number } },
) {
  const users = await User.findByPk(params.id);
  if (!users) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: users }, { status: 200 });
}
