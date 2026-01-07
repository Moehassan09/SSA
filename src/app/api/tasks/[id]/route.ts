
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, description, priority, status, dueDate, assignedToId } = body;

        const task = await prisma.task.update({
            where: {
                id: params.id,
            },
            data: {
                title,
                description,
                priority,
                status,
                dueDate: dueDate ? new Date(dueDate) : null,
                assignedToId: assignedToId || null,
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("[TASK_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const task = await prisma.task.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("[TASK_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
