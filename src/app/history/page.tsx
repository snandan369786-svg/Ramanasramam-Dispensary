import type { Metadata } from "next";
import { history, site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { HistoryTimeline } from "@/components/sections/History";

export const metadata: Metadata = {
  title: "Our History",
  description: `The history of ${site.name}, Tiruvannamalai — from the first doctor at the Ashram in the late 1920s to the Korangu Thottam dispensary opened in 2010.`,
  alternates: { canonical: "/history" },
};

export default function HistoryPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main id="main" className="pt-[72px]">
        <section aria-labelledby="history-title" className="grain pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div className="container-page">
            <Reveal className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span aria-hidden className="h-px w-8 bg-current opacity-70" />
                Our History
              </p>
              <h1
                id="history-title"
                className="display mt-5 text-[2.6rem] text-forest-deep sm:text-6xl lg:text-[4.2rem]"
              >
                A legacy of{" "}
                <em className="text-forest-soft">compassionate care.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-muted">
                {history.intro}
              </p>
            </Reveal>
          </div>
        </section>

        <HistoryTimeline />
      </main>
      <Footer />
    </>
  );
}
