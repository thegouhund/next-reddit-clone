import { Comment, Subbedit } from "@/app/db/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { subbeditName: number, postId: string } }) {
    const body = await request.json();

    if (!body.body) {
        return NextResponse.json(
            { message: "Post body is required" },
            { status: 400 }
        );
    }

    const subbedit = await Subbedit.findOne({
        where: { name: params.subbeditName },
        attributes: ['id'],
    });

    if (!subbedit) {
        return NextResponse.json(
            { message: "Subbedit not found" },
            { status: 404 }
        );
    }

    const comment = await Comment.create({
        ...body,
        userId: 1,
        postId: params.postId,
        subbeditId: subbedit.getDataValue("id"),
    });

    return NextResponse.json(comment, { status: 201 });
}