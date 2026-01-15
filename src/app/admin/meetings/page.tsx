
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, MapPin, Users } from "lucide-react";

interface Meeting {
    id: string;
    title: string;
    date: string;
    location: string | null;
    agenda: string | null;
    attendees: { name: string; email: string }[];
}

export default function AdminMeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        agenda: "",
    });

    const fetchMeetings = async () => {
        try {
            const res = await fetch("/api/meetings");
            if (res.ok) {
                const data = await res.json();
                setMeetings(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date) return;

        try {
            const res = await fetch("/api/meetings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({
                    title: "",
                    date: "",
                    location: "",
                    agenda: "",
                });
                fetchMeetings();
            } else {
                alert("Failed to create meeting");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this meeting?")) return;
        try {
            const res = await fetch(`/api/meetings/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchMeetings();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-3xl font-bold mb-8">Manage Meetings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-slate-900 dark:border-slate-800 sticky top-8">
                            <h2 className="text-xl font-semibold mb-4">Schedule Meeting</h2>
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
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Agenda</label>
                                    <textarea
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        rows={4}
                                        value={formData.agenda}
                                        onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                                    />
                                </div>
                                <Button type="submit" className="w-full">Schedule Meeting</Button>
                            </form>
                        </div>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
                        {isLoading ? (
                            <div className="text-center py-8">Loading meetings...</div>
                        ) : (
                            <>
                                {meetings.length === 0 ? (
                                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg dark:bg-slate-900">
                                        No meetings scheduled.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {meetings.map((meeting) => (
                                            <div
                                                key={meeting.id}
                                                className="bg-white p-4 rounded-lg shadow-sm border dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg">{meeting.title}</h3>
                                                    <button
                                                        onClick={() => handleDelete(meeting.id)}
                                                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-primary" />
                                                        <span>{format(new Date(meeting.date), "PPP p")}</span>
                                                    </div>
                                                    {meeting.location && (
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-primary" />
                                                            <span>{meeting.location}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {meeting.agenda && (
                                                    <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                        <p className="font-semibold text-xs text-slate-500 uppercase mb-1">Agenda</p>
                                                        <p className="whitespace-pre-wrap">{meeting.agenda}</p>
                                                    </div>
                                                )}

                                                <div className="mt-3 pt-3 border-t flex items-center gap-2 dark:border-slate-800">
                                                    <Users className="w-4 h-4 text-slate-400" />
                                                    <span className="text-xs text-slate-500">
                                                        {meeting.attendees.length} Attendees
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
