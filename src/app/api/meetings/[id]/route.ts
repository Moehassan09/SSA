
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, date, location, agenda } = body;

        const meeting = await prisma.meeting.update({
            where: {
                id: params.id,
            },
            data: {
                title,
                date: new Date(date),
                location,
                agenda,
            },
        });

        return NextResponse.json(meeting);
    } catch (error) {
        console.error("[MEETING_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const meeting = await prisma.meeting.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json(meeting);
    } catch (error) {
        console.error("[MEETING_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
