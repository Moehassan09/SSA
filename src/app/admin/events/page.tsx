
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    type: string;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: "",
        type: "social",
    });

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date) return;

        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({
                    title: "",
                    description: "",
                    date: "",
                    location: "",
                    image: "",
                    type: "social",
                });
                fetchEvents();
            } else {
                alert("Failed to create event");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-3xl font-bold mb-8">Manage Events</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-slate-900 dark:border-slate-800">
                        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="social">Social</option>
                                        <option value="educational">Educational</option>
                                        <option value="cultural">Cultural</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit">Add Event</Button>
                        </form>
                    </div>

                    {/* List */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Current Events</h2>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex flex-col gap-2 p-4 bg-slate-50 rounded-lg border dark:bg-slate-800/50 dark:border-slate-700"
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg">{event.title}</h3>
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full uppercase font-bold">{event.type}</span>
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            <p>{format(new Date(event.date), "PPP p")}</p>
                                            <p>{event.location}</p>
                                        </div>
                                    </div>
                                ))}
                                {events.length === 0 && (
                                    <p className="text-slate-500">No events found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
