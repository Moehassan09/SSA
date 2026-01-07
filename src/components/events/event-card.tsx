import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    image: string;
    type: "social" | "educational" | "cultural";
}

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Placeholder for actual image */}
                <div className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                    Image: {event.title}
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {event.type}
                    </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white font-display">
                    {event.title}
                </h3>
                <p className="mb-6 flex-1 text-slate-600 dark:text-slate-300 line-clamp-3">
                    {event.description}
                </p>

                <div className="mb-6 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(event.date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{format(event.date, "h:mm a")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <Button asChild className="w-full">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
            </div>
        </div>
    );
}
