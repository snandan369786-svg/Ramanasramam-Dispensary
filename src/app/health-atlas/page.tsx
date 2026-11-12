import type { Metadata } from "next";
import { conditions } from "@/content/health-atlas";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AtlasExplorer } from "@/components/atlas/AtlasExplorer";
import { MythFact } from "@/components/atlas/MythFact";
import { AtlasCta, AtlasDisclaimer } from "@/components/atlas/AtlasNotes";

export const metadata: Metadata = {
  title: "Health Atlas",
  description:
    "Understand common health conditions — diabetes, hypertension, obesity, heart disease, asthma, anaemia, osteoarthritis, kidney disease and more — in clear, everyday language. Educational information from the Sri Ramanasramam Dispensary.",
  alternates: { canonical: "/health-atlas" },
  openGraph: {
    title: "Health Atlas",
    description:
      "Explore common health conditions: what happens inside the body, causes, symptoms, diagnosis and management.",
    url: "/health-atlas",
  },
};

/* The three statements from different conditions shown on the landing page */
const featuredMyths = [
  ["diabetes", 0],
  ["hypertension", 0],
  ["obesity", 0],
] as const;

export default function HealthAtlasPage() {
  const myths = featuredMyths.map(([slug, i]) => {
    const c = conditions.find((x) => x.slug === slug)!;
    return { ...c.myths[i], condition: { name: c.name, slug: c.slug } };
  });

  return (
    <>
      <Navbar variant="solid" />
      <main id="main" className="pt-[72px]">
        <AtlasExplorer />

        <section aria-labelledby="myths-title" className="border-t border-line bg-ivory-deep/60 py-24 sm:py-28">
          <div className="container-page">
            <SectionHeading
              id="myths-title"
              eyebrow="Myth or Fact"
              title={
                <>
                  What do you <em className="text-forest-soft">believe?</em>
                </>
              }
              intro="Common beliefs about health are not always accurate. Test yourself, then read the evidence behind each answer."
            />
            <Reveal delay={120} className="mt-14">
              <MythFact items={myths} />
            </Reveal>
          </div>
        </section>

        <div className="container-page py-14">
          <AtlasDisclaimer />
        </div>

        <AtlasCta />
      </main>
      <Footer />
    </>
  );
}
