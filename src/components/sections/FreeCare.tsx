import Image from "next/image";
import { Pill, Stethoscope, HandHeart } from "lucide-react";
import { images } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { OrnamentRule } from "@/components/ui/Ornaments";

const pillars = [
  { label: "Consultations", Icon: Stethoscope },
  { label: "Treatment", Icon: HandHeart },
  { label: "Medicines", Icon: Pill },
];

export function FreeCare() {
  return (
    <section
      aria-labelledby="freecare-title"
      className="relative isolate overflow-hidden bg-forest-deep py-28 text-ivory sm:py-36 lg:py-44"
    >
      <Image
        src={images.service.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-50 mix-blend-luminosity"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/95 via-forest-deep/55 to-forest-deep/95"
      />

      <div className="container-page text-center">
        <Reveal>
          <OrnamentRule className="mx-auto max-w-xs text-gold-light" />
          <h2
            id="freecare-title"
            className="display mx-auto mt-10 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[4.6rem]"
          >
            Healthcare Is a Service.
            <span className="block italic text-gold-light">
              Not a Privilege.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-8 max-w-2xl text-[1.08rem] leading-[1.8] text-ivory/75 sm:text-lg">
            Guided by the spirit of selfless service, the dispensary is
            committed to making medical care accessible to everyone,
            irrespective of their financial circumstances.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <ul className="mx-auto mt-16 grid max-w-3xl border-y border-ivory/15 sm:grid-cols-3">
            {pillars.map(({ label, Icon }, i) => (
              <li
                key={label}
                className={`flex flex-col items-center gap-3 py-8 ${i > 0 ? "border-t border-ivory/15 sm:border-l sm:border-t-0" : ""}`}
              >
                <Icon
                  aria-hidden
                  strokeWidth={1.1}
                  className="h-7 w-7 text-gold-light"
                />
                <span className="font-serif text-2xl">{label}</span>
                <span className="eyebrow text-ivory/60">Free of charge</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
