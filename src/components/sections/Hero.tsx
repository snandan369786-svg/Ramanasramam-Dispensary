import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { images, site, visitingHours } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArchMotif } from "@/components/ui/Ornaments";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-deep text-ivory"
    >
      {/* Photograph */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="hero-zoom object-cover object-[62%_40%]"
        />
      </div>
      {/* Tonal overlays for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/92 via-forest-deep/72 to-forest-deep/45 lg:via-forest-deep/65 lg:to-forest-deep/15"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent"
      />

      {/* Architectural ornament */}
      <ArchMotif className="pointer-events-none absolute -right-20 top-28 -z-10 hidden w-[520px] text-gold-light/25 lg:block" />

      <div className="container-page flex flex-1 flex-col justify-center pb-12 pt-32 sm:pt-36">
        <div className="max-w-[46rem]">
          <p
            className="fade-up eyebrow flex items-center gap-3 text-gold-light"
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            <span aria-hidden className="h-px w-10 bg-gold-light/70" />A service
            of {site.operator}
            <span className="hidden sm:inline">· Tiruvannamalai</span>
          </p>

          <h1
            id="hero-title"
            className="fade-up display mt-7 text-[2.9rem] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]"
            style={{ "--delay": "220ms" } as React.CSSProperties}
          >
            Compassionate Healthcare.
            <span className="mt-1 block italic text-gold-light/95">
              A Service Without Boundaries.
            </span>
          </h1>

          <p
            className="fade-up mt-7 max-w-xl text-[1.06rem] leading-[1.75] text-ivory/80 sm:text-lg"
            style={{ "--delay": "340ms" } as React.CSSProperties}
          >
            Providing free medical consultations, treatment and medicines with
            compassion and dedication to the community in Tiruvannamalai.
          </p>

          <div
            className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ "--delay": "460ms" } as React.CSSProperties}
          >
            <ButtonLink
              href="#services"
              variant="light"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={1.6} />}
            >
              Explore Our Services
            </ButtonLink>
            <ButtonLink
              href="#visit"
              variant="outline-light"
              icon={<MapPin className="h-4 w-4" strokeWidth={1.6} />}
            >
              Find Our Location
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Free-care statement band */}
      <div className="relative border-t border-ivory/15 bg-forest-deep/55 backdrop-blur-sm">
        <div className="container-page grid gap-6 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:grid-cols-[auto_1fr_auto]">
          <p className="flex items-center gap-4">
            <span className="display text-[3rem] leading-none text-gold-light sm:text-[3.4rem]">
              100%
            </span>
            <span className="flex flex-col gap-1 border-l border-gold-light/40 pl-4 text-[0.7rem] font-semibold uppercase leading-none tracking-[0.2em] text-ivory">
              <span>Free</span>
              <span>Medical Care</span>
            </span>
          </p>
          <p className="max-w-xl border-ivory/15 text-[0.95rem] leading-relaxed text-ivory/75 sm:border-l sm:pl-10">
            Consultations, treatment and medicines are provided entirely free of
            charge — to everyone who comes.
          </p>
          <p className="hidden text-right text-sm text-ivory/70 lg:block">
            <span className="eyebrow block text-gold-light">Open</span>
            <span className="mt-1.5 block">
              Mon – Sat · {visitingHours.time}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
