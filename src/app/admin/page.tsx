import { auth } from "@/auth";

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                Dashboard
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                Welcome back, {session?.user?.name || "Admin"}.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder Stats */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-950 dark:border-slate-800">
                    <h3 className="text-sm font-medium text-slate-500">Total Members</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">124</p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-950 dark:border-slate-800">
                    <h3 className="text-sm font-medium text-slate-500">Upcoming Events</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">3</p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-950 dark:border-slate-800">
                    <h3 className="text-sm font-medium text-slate-500">Pending Tasks</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">8</p>
                </div>
            </div>
        </div>
    );
}
