
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const meetings = await prisma.meeting.findMany({
            orderBy: {
                date: "desc",
            },
            include: {
                attendees: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(meetings);
    } catch (error) {
        console.error("[MEETINGS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, date, location, agenda } = body;

        const meeting = await prisma.meeting.create({
            data: {
                title,
                date: new Date(date),
                location,
                agenda,
            },
        });

        return NextResponse.json(meeting);
    } catch (error) {
        console.error("[MEETINGS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
