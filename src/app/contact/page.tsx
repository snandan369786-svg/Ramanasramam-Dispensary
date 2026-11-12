import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, MapPin, Navigation } from "lucide-react";
import {
  address,
  contacts,
  mapsLinks,
  site,
  visitingHours,
} from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CopyAddressButton } from "@/components/visit/CopyAddressButton";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}, Tiruvannamalai. Email addresses for the dispensary, the President of ${site.operator} and the Ashram archives, with visiting hours and directions.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main id="main" className="pt-[72px]">
        {/* Intro */}
        <section
          aria-labelledby="contact-title"
          className="grain pb-16 pt-20 sm:pb-20 sm:pt-28"
        >
          <div className="container-page">
            <Reveal className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span aria-hidden className="h-px w-8 bg-current opacity-70" />
                Contact
              </p>
              <h1
                id="contact-title"
                className="display mt-5 text-[2.6rem] text-forest-deep sm:text-6xl lg:text-[4.2rem]"
              >
                We would be glad{" "}
                <em className="text-forest-soft">to hear from you.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-muted">
                Write to us with questions about the dispensary or Sri
                Ramanasramam. For medical care, please visit the dispensary
                during visiting hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contacts */}
        <section aria-label="Email contacts" className="pb-24 sm:pb-32">
          <div className="container-page">
            <ul className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
              {contacts.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.email}
                  delay={i * 90}
                  className="flex flex-col bg-paper p-8 sm:p-10"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sage/50 text-forest">
                    <Mail aria-hidden strokeWidth={1.3} className="h-5 w-5" />
                  </span>
                  <p className="eyebrow mt-8 text-gold">{c.role}</p>
                  <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-tight text-forest-deep">
                    {c.name}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    {c.note}
                  </p>
                  <div className="mt-auto pt-8">
                    <a
                      href={`mailto:${c.email}`}
                      className="group inline-flex items-center gap-2 break-all text-[1.02rem] font-medium text-forest underline decoration-gold/50 underline-offset-[6px] transition-colors hover:decoration-gold"
                    >
                      {c.email}
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.6}
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                    <div className="mt-5">
                      <CopyAddressButton
                        text={c.email}
                        label="Copy email"
                        copiedLabel="Email copied"
                        srLabel={`for ${c.name}`}
                        compact
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* Visiting */}
            <Reveal
              delay={120}
              className="mt-px grid gap-px overflow-hidden border border-t-0 border-line bg-line md:grid-cols-2"
            >
              <div className="bg-ivory p-8 sm:p-10">
                <div className="flex items-center gap-3 text-gold">
                  <Clock aria-hidden strokeWidth={1.4} className="h-5 w-5" />
                  <h2 className="eyebrow">Visiting Hours</h2>
                </div>
                <dl className="mt-6 space-y-3">
                  {visitingHours.rows.map((r) => (
                    <div
                      key={r.day}
                      className="flex items-baseline justify-between gap-6 border-b border-line pb-3"
                    >
                      <dt className="text-ink">{r.day}</dt>
                      <dd className="font-serif text-xl text-forest">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {visitingHours.notice}
                </p>
              </div>
              <div className="flex flex-col bg-ivory p-8 sm:p-10">
                <div className="flex items-center gap-3 text-gold">
                  <MapPin aria-hidden strokeWidth={1.4} className="h-5 w-5" />
                  <h2 className="eyebrow">Address</h2>
                </div>
                <address className="mt-6 not-italic leading-[1.8] text-muted">
                  <span className="block font-serif text-xl text-forest-deep">
                    {address.name}
                  </span>
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                  <ButtonLink
                    href={mapsLinks.directions}
                    icon={
                      <Navigation
                        aria-hidden
                        className="h-4 w-4"
                        strokeWidth={1.6}
                      />
                    }
                  >
                    Get Directions
                  </ButtonLink>
                  <ButtonLink href="/#visit" variant="secondary">
                    View map
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
