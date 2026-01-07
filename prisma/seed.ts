import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@ssa.edu" },
        update: {},
        create: {
            email: "admin@ssa.edu",
            name: "Admin User",
            password,
            role: "admin",
        },
    });

    console.log({ admin });

    const event = await prisma.event.create({
        data: {
            title: "Somali Culture Night",
            description: "Join us for an evening of traditional music, dance, and poetry.",
            date: new Date("2025-12-20T18:00:00"),
            location: "Grand Ballroom",
            type: "cultural",
            createdById: admin.id,
        },
    });

    console.log({ event });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
