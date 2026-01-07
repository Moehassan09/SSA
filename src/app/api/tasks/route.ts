
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                assignedTo: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("[TASKS_GET]", error);
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
        const { title, description, priority, status, dueDate, assignedToId } = body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority,
                status,
                dueDate: dueDate ? new Date(dueDate) : null,
                assignedToId: assignedToId || null,
                createdById: session.user.id,
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("[TASKS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
