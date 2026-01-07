import { Container } from "@/components/ui/container";

export function Footer() {
    return (
        <footer className="border-t bg-white dark:bg-slate-950">
            <Container className="py-8 md:py-12">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm leading-loose text-slate-600 dark:text-slate-400 md:text-left">
                        &copy; {new Date().getFullYear()} Somali Student Association. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Social links will go here */}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
