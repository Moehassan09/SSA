import { prisma } from "@/lib/prisma";
import { AnnouncementForm } from "@/components/admin/announcement-form";
import { format } from "date-fns";

export default async function AnnouncementsPage() {
    const announcements = await prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
        include: { createdBy: true },
    });

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-display mb-8">
                Announcements
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <AnnouncementForm />
                </div>

                <div className="lg:col-span-2">
                    <div className="rounded-xl bg-white shadow-sm border border-slate-100 dark:bg-slate-950 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b dark:border-slate-800">
                            <h3 className="font-semibold">All Announcements</h3>
                        </div>
                        <ul className="divide-y dark:divide-slate-800">
                            {announcements.map((announcement) => (
                                <li key={announcement.id} className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${announcement.type === 'urgent' ? 'bg-red-100 text-red-800' :
                                                announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                            {announcement.type}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {format(announcement.createdAt, "MMM d, yyyy")}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-medium mb-1">{announcement.title}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                        {announcement.message}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Posted by {announcement.createdBy.name}
                                    </p>
                                </li>
                            ))}
                            {announcements.length === 0 && (
                                <li className="p-6 text-center text-slate-500">
                                    No announcements yet.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
