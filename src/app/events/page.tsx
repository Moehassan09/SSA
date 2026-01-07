
"use client";

import { Container } from "@/components/ui/container";
import { EventCard, Event } from "@/components/events/event-card";
import { AnnouncementBanner } from "@/components/events/announcement-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from "react";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch("/api/events");
                if (res.ok) {
                    const data = await res.json();
                    // Transform date strings to Date objects
                    const eventsWithDates = data.map((e: any) => ({
                        ...e,
                        date: new Date(e.date),
                    }));
                    setEvents(eventsWithDates);
                }
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const upcomingEvents = events.filter((e) => e.date >= new Date());
    const pastEvents = events.filter((e) => e.date < new Date());

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {/* Hero / Header */}
                <div className="bg-primary py-20 text-white relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-blue-900/20 blur-3xl pointer-events-none"></div>

                    <Container className="relative">
                        <div className="max-w-2xl relative z-10">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-white">
                                Events
                            </h1>
                            <p className="mt-4 text-lg text-blue-50">
                                Stay connected with our upcoming activities, workshops, and celebrations.
                            </p>
                        </div>
                    </Container>
                </div>

                <AnnouncementBanner />

                <Container className="py-16">
                    {loading ? (
                        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-8 font-display text-slate-800 dark:text-white border-l-4 border-primary pl-4">Upcoming Events</h2>
                            {upcomingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl bg-slate-50 p-12 text-center text-slate-500 border border-dashed border-slate-200">
                                    No upcoming events scheduled at the moment.
                                </div>
                            )}

                            {pastEvents.length > 0 && (
                                <div className="mt-24">
                                    <h2 className="text-2xl font-bold mb-8 font-display text-slate-400 border-l-4 border-slate-300 pl-4">Past Events</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                                        {pastEvents.map((event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </main>
            <Footer />
        </div>
    );
}
