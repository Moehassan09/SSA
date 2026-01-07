
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface Executive {
    id: string;
    name: string;
    role: string;
    image?: string;
    bio?: string;
    order: number;
}

export default function AdminExecutivesPage() {
    const [executives, setExecutives] = useState<Executive[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        image: "",
        bio: "",
    });

    const fetchExecutives = async () => {
        try {
            const res = await fetch("/api/executives");
            if (res.ok) {
                const data = await res.json();
                setExecutives(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExecutives();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.role) return;

        try {
            const res = await fetch("/api/executives", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ name: "", role: "", image: "", bio: "" });
                fetchExecutives();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-3xl font-bold mb-8">Manage Executives</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-slate-900 dark:border-slate-800">
                        <h2 className="text-xl font-semibold mb-4">Add New Executive</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                                <p className="text-xs text-slate-500 mt-1">Provide a direct link to the image.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio</label>
                                <textarea
                                    className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                    rows={3}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                            <Button type="submit">Add Executive</Button>
                        </form>
                    </div>

                    {/* List */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Current Executives</h2>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="space-y-4">
                                {executives.map(exec => (
                                    <div key={exec.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border dark:bg-slate-800/50 dark:border-slate-700">
                                        <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                            {exec.image ? (
                                                <img src={exec.image} alt={exec.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-400">?</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{exec.name}</p>
                                            <p className="text-sm text-slate-500">{exec.role}</p>
                                        </div>
                                    </div>
                                ))}
                                {executives.length === 0 && <p className="text-slate-500">No executives added yet.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
