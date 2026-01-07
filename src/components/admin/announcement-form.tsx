"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AnnouncementForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("info");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, message, type }),
            });

            if (res.ok) {
                setTitle("");
                setMessage("");
                setType("info");
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to create announcement", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-950 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Create Announcement</h3>

            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-700"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-700"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-900 dark:border-slate-700"
                >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Post Announcement"}
            </Button>
        </form>
    );
}
