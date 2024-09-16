import { Post, Subbedit, User, Comment } from "@/app/db/model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "100");
    const posts = await Post.findAll({
        limit,
        order: [['createdAt', 'DESC']],
        include: [{ model: Subbedit }, { model: User }, { model: Comment }],
    });

    return NextResponse.json(posts, { status: 200 });
}