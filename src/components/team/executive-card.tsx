
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Executive {
    id: string;
    name: string;
    role: string;
    image?: string | null;
    bio?: string | null;
}

export function ExecutiveCard({ exec }: { exec: Executive }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
        >
            <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                {exec.image ? (
                    <Image
                        src={exec.image}
                        alt={exec.name}
                        width={400}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <span className="text-4xl">?</span>
                    </div>
                )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white opacity-100 transition-opacity">
                <h3 className="text-xl font-bold font-display">{exec.name}</h3>
                <p className="text-sm font-medium text-blue-200">{exec.role}</p>
                {exec.bio && (
                    <p className="mt-2 text-sm text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 line-clamp-3">
                        {exec.bio}
                    </p>
                )}
            </div>

            {/* Somali blue accent line */}
            <div className="absolute top-0 left-0 h-1.5 w-full bg-primary transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
        </motion.div>
    );
}
