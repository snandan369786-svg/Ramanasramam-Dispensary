import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck, HandHeart, Users } from "lucide-react";
import { images } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* What the dispensary stands for */
const principles = [
  {
    title: "Free of charge",
    text: "Consultations, treatment and medicines at no cost.",
    Icon: HandHeart,
  },
  {
    title: "Evidence-based care",
    text: "Treatment guided by current medical evidence and accepted clinical practice.",
    Icon: BookOpenCheck,
  },
  {
    title: "Without distinction",
    text: "The same care for everyone who comes.",
    Icon: Users,
  },
];

const communities = [
  "Ashram staff",
  "Visiting devotees",
  "Residents of Ramana Nagar",
  "Underprivileged members of the surrounding community",
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grain py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <SectionHeading
            id="about-title"
            eyebrow="About the Dispensary"
            title={
              <>
                Healthcare Rooted{" "}
                <em className="text-forest-soft">in Compassion</em>
              </>
            }
          />

          <Reveal
            delay={120}
            className="mt-9 space-y-5 text-[1.05rem] leading-[1.8] text-muted"
          >
            <p className="font-serif text-[1.45rem] leading-[1.5] text-forest-deep sm:text-[1.6rem]">
              Sri Ramanasramam Dispensary is a healthcare initiative operated by
              Sri Ramanasramam, dedicated to providing accessible and free
              medical care to those in need.
            </p>
            <p>
              With a commitment to compassionate service, the dispensary
              provides medical consultations, treatment and medicines{" "}
              <strong className="font-medium text-forest">
                without charge
              </strong>
              .
            </p>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-forest underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold"
            >
              Read our history, from the 1920s to today
            </Link>
          </Reveal>

          <Reveal delay={160} className="mt-12">
            <p className="eyebrow text-gold">Our principles</p>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-3">
              {principles.map(({ title, text, Icon }) => (
                <li key={title} className="bg-paper p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage/50 text-forest">
                    <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.4} />
                  </span>
                  <p className="mt-4 font-serif text-[1.2rem] leading-tight text-forest-deep">{title}</p>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-12">
            <p className="eyebrow text-gold">The dispensary serves</p>
            <ul className="mt-5 border-t border-line">
              {communities.map((c, i) => (
                <li
                  key={c}
                  className="flex items-baseline gap-5 border-b border-line py-4"
                >
                  <span className="font-serif text-sm italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.02rem] text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-6">
          <figure className="relative">
            <div
              aria-hidden
              className="absolute -right-3 -top-3 bottom-10 left-10 hidden border border-gold/40 sm:block lg:-right-5 lg:-top-5"
            />
            <div className="relative aspect-[4/5] overflow-hidden bg-sage-light">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                quality={90}
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-xs tracking-wide text-muted">
              <span aria-hidden className="h-px w-6 bg-gold" />
              Sri Ramanasramam Dispensary, Tiruvannamalai
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
