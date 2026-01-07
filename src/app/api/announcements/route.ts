import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const announcements = await prisma.announcement.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(announcements);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const json = await req.json();
        const announcement = await prisma.announcement.create({
            data: {
                ...json,
                createdById: session.user.id,
            },
        });
        return NextResponse.json(announcement);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
    }
}
