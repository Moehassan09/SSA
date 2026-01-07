import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function AboutSection() {
    return (
        <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <Container>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
                            Our Mission
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            The Somali Student Association (SSA) is dedicated to creating a welcoming space for Somali students and allies. We strive to celebrate our rich heritage, foster academic success, and build a strong network of future leaders.
                        </p>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            Through cultural events, educational workshops, and community service, we aim to empower our members and bridge the gap between our culture and the wider campus community.
                        </p>
                        <div className="mt-8">
                            <Button variant="secondary">Meet the Team</Button>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 shadow-xl">
                        {/* Placeholder for group photo */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                            <span className="text-lg font-medium">Group Photo Placeholder</span>
                        </div>
                    </div>
                </div>

                {/* Team Preview */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-center mb-10 font-display">Meet Our Exec Board</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800 mb-4" />
                                <h4 className="text-lg font-semibold">Member Name</h4>
                                <p className="text-sm text-slate-500">Position</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
