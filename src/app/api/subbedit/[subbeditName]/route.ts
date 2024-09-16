import { Subbedit } from "@models/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { subbeditName: string } }) {
    const subbedit = await Subbedit.findOne({ where: { name: params.subbeditName } });
    return NextResponse.json(subbedit, { status: 200 });
}