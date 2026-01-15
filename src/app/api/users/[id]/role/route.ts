
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        // Only admins can change roles
        if (!session?.user || session.user.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { role } = body;

        // Validation: Only allow specific roles
        if (!["admin", "exec", "member"].includes(role)) {
            return new NextResponse("Invalid role", { status: 400 });
        }

        const user = await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                role,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_ROLE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
