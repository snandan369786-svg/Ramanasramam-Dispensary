import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  id,
}: Props) {
  const centered = align === "center";
  const light = tone === "light";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p
        className={`eyebrow flex items-center gap-3 ${centered ? "justify-center" : ""} ${light ? "text-gold-light" : "text-gold"}`}
      >
        <span aria-hidden className="h-px w-8 bg-current opacity-70" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`display mt-5 text-[2.4rem] sm:text-5xl lg:text-[3.6rem] ${light ? "text-ivory" : "text-forest-deep"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-[1.05rem] leading-[1.75] ${light ? "text-ivory/75" : "text-muted"} ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
