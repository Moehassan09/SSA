import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface Announcement {
    id: string;
    title: string;
    message: string;
    type: "info" | "warning" | "urgent";
}

export function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    // Mock announcement
    const announcement: Announcement = {
        id: "1",
        title: "Upcoming General Body Meeting",
        message: "Join us this Friday at 5 PM in the Student Center for our first GBM of the semester!",
        type: "info",
    };

    if (!isVisible) return null;

    return (
        <div className="relative bg-primary px-6 py-3 text-white">
            <div className="flex items-center justify-center gap-x-3 text-sm font-medium">
                <AlertCircle className="h-5 w-5" />
                <p>
                    <span className="font-bold">{announcement.title}: </span>
                    {announcement.message}
                </p>
            </div>
            <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/10"
            >
                <span className="sr-only">Dismiss</span>
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
