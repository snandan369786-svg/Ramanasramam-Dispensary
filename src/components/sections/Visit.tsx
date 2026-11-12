import { Clock, Info, MapPin, Navigation } from "lucide-react";
import { address, mapsLinks, visitingHours } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyAddressButton } from "@/components/visit/CopyAddressButton";
import { MapEmbed } from "@/components/visit/MapEmbed";

export function Visit() {
  const fullAddress = [address.name, ...address.lines].join("\n");

  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="grain py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="visit-title"
          eyebrow="Visiting Information"
          title={
            <>
              Plan your <em className="text-forest-soft">visit.</em>
            </>
          }
          intro="The dispensary is located at Sri Ramanasramam on Chengam Road, Tiruvannamalai. All consultations, treatment and medicines are free of charge."
        />

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line lg:mt-20 lg:grid-cols-2">
          {/* Hours */}
          <Reveal className="bg-paper p-8 sm:p-12">
            <div className="flex items-center gap-3 text-gold">
              <Clock aria-hidden strokeWidth={1.4} className="h-5 w-5" />
              <h3 className="eyebrow">Visiting Hours</h3>
            </div>
            <p className="display mt-8 text-5xl text-forest-deep sm:text-[3.6rem]">
              {visitingHours.time}
            </p>
            <dl className="mt-10 border-t border-line">
              {visitingHours.rows.map((row) => (
                <div
                  key={row.day}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                >
                  <dt className="text-[1.02rem] text-ink">{row.day}</dt>
                  <dd
                    className={
                      row.value === "Closed"
                        ? "text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted"
                        : "font-serif text-xl text-forest"
                    }
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 flex gap-3 rounded-[2px] bg-sage-mist px-4 py-4 text-sm leading-relaxed text-muted">
              <Info
                aria-hidden
                strokeWidth={1.5}
                className="mt-0.5 h-4 w-4 shrink-0 text-forest"
              />
              {visitingHours.notice}
            </p>
          </Reveal>

          {/* Location */}
          <Reveal delay={120} className="flex flex-col bg-paper p-8 sm:p-12">
            <div className="flex items-center gap-3 text-gold">
              <MapPin aria-hidden strokeWidth={1.4} className="h-5 w-5" />
              <h3 className="eyebrow">Location</h3>
            </div>
            <address className="mt-8 not-italic">
              <p className="font-serif text-[1.9rem] leading-tight text-forest-deep">
                {address.name}
              </p>
              <p className="mt-5 text-[1.05rem] leading-[1.8] text-muted">
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
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
              <CopyAddressButton text={fullAddress} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-px">
          <MapEmbed
            src={mapsLinks.embed}
            title="Map showing Sri Ramanasramam, Tiruvannamalai"
          />
        </Reveal>
      </div>
    </section>
  );
}
