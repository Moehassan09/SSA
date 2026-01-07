
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ExecutiveCard } from "@/components/team/executive-card";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getExecutives() {
    // If the table doesn't exist yet/migration pending, this might fail, but we handled migration.
    const executives = await prisma.executive.findMany({
        orderBy: {
            order: "asc",
        },
    });
    return executives;
}

export default async function TeamPage() {
    const executives = await getExecutives();

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {/* Simple Hero Section */}
                <section className="relative overflow-hidden py-20 bg-primary/5">
                    {/* Decorative Background Blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl pointer-events-none"></div>

                    <Container>
                        <div className="mx-auto max-w-3xl text-center relative z-10">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl font-display mb-6">
                                Meet The Executives
                            </h1>
                            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                                The passionate leaders dedicated to serving the Somali Student Association and our community.
                            </p>
                        </div>
                    </Container>
                </section>

                <section className="py-20">
                    <Container>
                        {executives.length > 0 ? (
                            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {executives.map((exec) => (
                                    <ExecutiveCard key={exec.id} exec={exec} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                <p className="text-xl text-slate-500 font-medium">Coming Soon</p>
                                <p className="text-slate-400 mt-2">Executive profiles are being updated.</p>
                            </div>
                        )}
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
}
