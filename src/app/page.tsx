import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/hero";
import { AboutSection } from "@/components/layout/about-section";
import { SocialHub } from "@/components/layout/social-hub";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <SocialHub />
      </main>
      <Footer />
    </div>
  );
}
