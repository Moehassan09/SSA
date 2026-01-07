import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export default function GalleryPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="bg-slate-50 dark:bg-slate-900/50 py-12">
                    <Container>
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl font-display">
                                Gallery
                            </h1>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                                Capturing moments from our events, gatherings, and celebrations.
                            </p>
                        </div>
                    </Container>
                </div>

                <Container className="mt-12 mb-20">
                    <GalleryGrid />
                </Container>
            </main>
            <Footer />
        </div>
    );
}
