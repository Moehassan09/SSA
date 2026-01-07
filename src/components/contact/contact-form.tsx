"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Message sent! (This is a demo)");
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                        First name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            required
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-800 dark:text-white"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                        Last name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            required
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-800 dark:text-white"
                        />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                    Email
                </label>
                <div className="mt-2.5">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-800 dark:text-white"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                    Message
                </label>
                <div className="mt-2.5">
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-800 dark:text-white"
                    />
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
}
