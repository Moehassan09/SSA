import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, MessageCircle } from "lucide-react";

const socials = [
    {
        name: "Instagram",
        icon: Instagram,
        handle: "@ssa_university",
        color: "bg-pink-600",
        link: "#",
    },
    {
        name: "Twitter/X",
        icon: Twitter,
        handle: "@ssa_uni",
        color: "bg-blue-400",
        link: "#",
    },
    {
        name: "Discord",
        icon: MessageCircle,
        handle: "SSA Community",
        color: "bg-indigo-500",
        link: "#",
    },
];

export function SocialHub() {
    return (
        <section id="social" className="py-20">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
                        Connect With Us
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        Follow us on social media to stay updated on events and announcements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {socials.map((social) => (
                        <div
                            key={social.name}
                            className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow"
                        >
                            <div className={`p-4 rounded-full ${social.color} text-white mb-6`}>
                                <social.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{social.name}</h3>
                            <p className="text-slate-500 mb-6">{social.handle}</p>

                            {/* QR Code Placeholder */}
                            <div className="w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                                <span className="text-sm text-slate-400">QR Code</span>
                            </div>

                            <Button variant="outline" className="w-full">
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
