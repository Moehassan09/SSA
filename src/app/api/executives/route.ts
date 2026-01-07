
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const executives = await prisma.executive.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return NextResponse.json(executives);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch executives" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, role, image, bio } = data;

        const executive = await prisma.executive.create({
            data: {
                name,
                role,
                image,
                bio,
            },
        });

        return NextResponse.json(executive);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create executive" },
            { status: 500 }
        );
    }
}
