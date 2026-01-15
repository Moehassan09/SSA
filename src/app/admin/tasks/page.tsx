
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Task {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
    assignedTo: User | null;
    assignedToId: string | null;
}

export default function AdminTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
        assignedToId: "",
    });

    const fetchData = async () => {
        try {
            const [tasksRes, usersRes] = await Promise.all([
                fetch("/api/tasks"),
                fetch("/api/users"),
            ]);

            if (tasksRes.ok && usersRes.ok) {
                const tasksData = await tasksRes.json();
                const usersData = await usersRes.json();
                setTasks(tasksData);
                setUsers(usersData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return;

        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({
                    title: "",
                    description: "",
                    status: "todo",
                    priority: "medium",
                    dueDate: "",
                    assignedToId: "",
                });
                fetchData();
            } else {
                alert("Failed to create task");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = async (task: Task, newStatus: string) => {
        try {
            const res = await fetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...task, status: newStatus }),
            });
            if (res.ok) {
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "text-red-600 bg-red-100 dark:bg-red-900/20";
            case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
            case "low": return "text-green-600 bg-green-100 dark:bg-green-900/20";
            default: return "text-slate-600 bg-slate-100";
        }
    };

    return (
        <div className="py-10">
            <Container>
                <h1 className="text-3xl font-bold mb-8">Manage Tasks</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-slate-900 dark:border-slate-800 sticky top-8">
                            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
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
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Priority</label>
                                        <select
                                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Status</label>
                                        <select
                                            className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Assign To</label>
                                    <select
                                        className="w-full rounded-md border border-slate-300 p-2 dark:bg-slate-800 dark:border-slate-700"
                                        value={formData.assignedToId}
                                        onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name || user.email}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button type="submit" className="w-full">Create Task</Button>
                            </form>
                        </div>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Board Tasks</h2>
                        {isLoading ? (
                            <div className="text-center py-8">Loading tasks...</div>
                        ) : (
                            <>
                                {tasks.length === 0 ? (
                                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg dark:bg-slate-900">
                                        No tasks found. Create one to get started.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="bg-white p-4 rounded-lg shadow-sm border border-l-4 dark:bg-slate-900 dark:border-slate-800 transition-all hover:shadow-md"
                                                style={{ borderLeftColor: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#d97706' : '#22c55e' }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className={cn("font-bold text-lg flex items-center gap-2", task.status === 'done' && "line-through text-slate-400")}>
                                                            {task.title}
                                                        </h3>
                                                        <p className="text-slate-600 dark:text-slate-400 mt-1">{task.description}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className={cn("text-xs px-2 py-1 rounded-full uppercase font-bold", getPriorityColor(task.priority))}>
                                                            {task.priority}
                                                        </span>
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) => handleStatusChange(task, e.target.value)}
                                                            className="text-xs border rounded p-1 dark:bg-slate-800 dark:border-slate-700"
                                                        >
                                                            <option value="todo">To Do</option>
                                                            <option value="in-progress">In Progress</option>
                                                            <option value="done">Done</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between text-sm text-slate-500 border-t pt-3 dark:border-slate-800">
                                                    <div className="flex gap-4">
                                                        {task.dueDate && (
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                                                            </div>
                                                        )}
                                                        {task.assignedTo && (
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                                    {task.assignedTo.name?.[0] || task.assignedTo.email[0]}
                                                                </div>
                                                                <span>{task.assignedTo.name || task.assignedTo.email}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(task.id)}
                                                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                                                    >
                                                        Delete
                                                    </button>
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
