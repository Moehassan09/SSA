import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock Data (duplicated for now, normally fetched by ID)
const events = [
    {
        id: "1",
        title: "Somali Culture Night",
        description: "Join us for an evening of traditional music, dance, and poetry celebrating our rich heritage. Food will be served! We will have guest speakers, performances by local artists, and a fashion show showcasing traditional Somali attire. This is our biggest event of the year, so don't miss out!",
        date: new Date("2025-12-20T18:00:00"),
        location: "Grand Ballroom",
        image: "/images/culture-night.jpg",
        type: "cultural",
    },
    {
        id: "2",
        title: "Study Jam & Chai",
        description: "Prepare for finals with your fellow SSA members. We'll provide the chai and snacks, you bring the books.",
        date: new Date("2025-12-15T16:00:00"),
        location: "Library Room 304",
        image: "/images/study-jam.jpg",
        type: "educational",
    },
    {
        id: "3",
        title: "Winter Social",
        description: "A casual get-together to decompress after the semester. Games, movies, and good vibes.",
        date: new Date("2025-12-22T19:00:00"),
        location: "Student Center Lounge",
        image: "/images/social.jpg",
        type: "social",
    },
];

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const event = events.find((e) => e.id === id);

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="bg-slate-50 dark:bg-slate-900/50 py-8">
                <Container>
                    <Link
                        href="/events"
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Events
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
                        {event.title}
                    </h1>
                </Container>
            </div>

            <Container className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-8 flex items-center justify-center text-slate-400">
                            Image: {event.title}
                        </div>
                        <div className="prose dark:prose-invert max-w-none">
                            <h3 className="text-xl font-semibold mb-4">About this Event</h3>
                            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 sticky top-24">
                            <h3 className="text-lg font-semibold mb-6">Event Details</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Date</p>
                                        <p className="text-sm text-slate-500">{format(event.date, "EEEE, MMMM d, yyyy")}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Time</p>
                                        <p className="text-sm text-slate-500">{format(event.date, "h:mm a")}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-sm text-slate-500">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t">
                                <Button className="w-full" size="lg">
                                    Add to Calendar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
