import User from "@/app/db/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const users = await User.findAll();
    return NextResponse.json({ message: users }, { status: 200 });
}


export async function POST(request: NextRequest) {
    const body = await request.json();

    if (!body.username || !body.email) {
        return NextResponse.json(
            { message: "Username and email are required" },
            { status: 400 }
        );
    }

    const existingUser = await User.findOne({ where: { email: body.email } });
    if (existingUser) {
        return NextResponse.json(
            { message: "User with this email already exists" },
            { status: 400 }
        );
    }
    const user = await User.create(body);
    return NextResponse.json({ data: user }, { status: 201 });
}