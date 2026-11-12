import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Doctors } from "@/components/sections/Doctors";
import { HealthAtlasTeaser } from "@/components/sections/HealthAtlasTeaser";
import { FreeCare } from "@/components/sections/FreeCare";
import { Visit } from "@/components/sections/Visit";
import { HashScroller } from "@/components/ui/HashScroller";

export default function HomePage() {
  return (
    <>
      <HashScroller />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Doctors />
        <HealthAtlasTeaser />
        <FreeCare />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
