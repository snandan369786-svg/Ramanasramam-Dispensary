import { SiteLink } from "@/components/ui/SiteLink";
import { ArrowUpRight } from "lucide-react";
import {
  address,
  imageCredits,
  mapsLinks,
  navLinks,
  site,
  visitingHours,
} from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-ivory/75">
      <div className="container-page pb-10 pt-20 sm:pt-24">
        {/* Statement */}
        <p className="display max-w-3xl text-[2.2rem] text-ivory sm:text-5xl">
          Serving with compassion.{" "}
          <em className="text-gold-light">Caring without distinction.</em>
        </p>

        <div className="mt-16 grid gap-12 border-t border-ivory/12 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SiteLink
              href="/#home"
              className="flex items-center gap-3 text-ivory"
            >
              <Emblem className="h-14 text-gold-light" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold uppercase tracking-[0.12em]">
                  Sri Ramanasramam
                </span>
                <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-gold-light">
                  Dispensary
                </span>
              </span>
            </SiteLink>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              A free healthcare initiative operated by {site.operator},
              Tiruvannamalai.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="eyebrow text-gold-light">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <SiteLink
                    href={l.href}
                    className="transition-colors hover:text-ivory"
                  >
                    {l.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold-light">Address</h2>
            <address className="mt-5 text-sm not-italic leading-relaxed">
              {address.name}
              {address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={mapsLinks.view}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-ivory underline decoration-gold-light/50 underline-offset-4 hover:decoration-gold-light"
            >
              Open in Google Maps
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold-light">Visiting Hours</h2>
            <dl className="mt-5 space-y-3 text-sm">
              {visitingHours.rows.map((r) => (
                <div key={r.day}>
                  <dt className="text-ivory/60">{r.day}</dt>
                  <dd className="text-ivory">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-ivory/50">
              Timings may be subject to change.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ivory/12 pt-8 text-xs text-ivory/50 lg:flex-row lg:items-start lg:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <details className="group max-w-xl lg:text-right">
            <summary className="cursor-pointer list-none hover:text-ivory/80 [&::-webkit-details-marker]:hidden">
              Photography credits
              <span
                aria-hidden
                className="ml-1 inline-block transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="mt-3 space-y-1.5">
              {imageCredits.map((c) => (
                <li key={c.source}>
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:text-ivory/80 hover:underline"
                  >
                    {c.subject}
                  </a>{" "}
                  — {c.author}, {c.license}, via Wikimedia Commons
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
