import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="bg-slate-50 dark:bg-slate-900/50 py-12">
                    <Container>
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl font-display">
                                Contact Us
                            </h1>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                                Have questions? Want to get involved? Reach out to us!
                            </p>
                        </div>
                    </Container>
                </div>

                <Container className="mt-12 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 font-display">Get in Touch</h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-8">
                                We'd love to hear from you. Whether you're a prospective member, an alumni, or just curious about our organization, feel free to send us a message.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-slate-600 dark:text-slate-400">ssa@university.edu</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Location</h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Student Center, Room 304<br />
                                            123 University Blvd<br />
                                            City, State 12345
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
