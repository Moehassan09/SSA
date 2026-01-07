import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: "asc" },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();

    if (!session || (session.user?.role !== "admin" && session.user?.role !== "exec")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const json = await req.json();
        const event = await prisma.event.create({
            data: {
                ...json,
                date: new Date(json.date),
                createdById: session.user.id,
            },
        });
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
