import { Comment, Subbedit, User } from "@models/index";
import { Post } from "@models/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
    const post = await Post.findByPk(parseInt(params.postId, 36),
        {
            include: [{ model: Comment, include: [{ model: User }] },
            { model: Subbedit }]
        });
        
    if (!post) {
        return NextResponse.json(
            { message: "Post not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(post, { status: 200 });
}