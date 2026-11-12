import { ArrowRight } from "lucide-react";
import { services } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-y border-line bg-paper py-24 sm:py-32"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="services-title"
              eyebrow="Medical Services"
              title={
                <>
                  Essential care,
                  <br className="hidden sm:block" />{" "}
                  <em className="text-forest-soft">offered freely.</em>
                </>
              }
            />
          </div>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[1.05rem] leading-[1.8] text-muted">
              From the first consultation to laboratory investigations and the
              medicines that follow, every service at the dispensary is provided{" "}
              <strong className="font-medium text-forest">
                free of charge
              </strong>
              .
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 3) * 80}
              className="group relative flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-ivory lg:min-h-[290px] lg:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-sage/50 text-forest transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                  <ServiceGlyph icon={s.icon} className="h-6 w-6" />
                </span>
                <span className="font-serif text-sm italic text-sage">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 font-serif text-[1.6rem] font-medium leading-tight text-forest-deep">
                {s.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {s.description}
              </p>
            </Reveal>
          ))}

          {/* Closing tile with a call to action; it fills the last cell of the grid */}
          <Reveal
            as="li"
            delay={240}
            className="flex flex-col justify-between gap-8 bg-forest p-8 text-ivory lg:min-h-[290px] lg:p-9"
          >
            <p className="font-serif text-[1.75rem] leading-tight sm:text-[2rem]">
              No fees. <em className="text-gold-light">No distinction.</em>
            </p>
            <a
              href="#visit"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ivory/90 hover:text-ivory"
            >
              Plan your visit
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
