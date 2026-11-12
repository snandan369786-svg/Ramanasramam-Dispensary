"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { history, type HistoryPhoto } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

const photoKeys = Object.keys(history.photos) as HistoryPhoto[];

/** "Late 1920s" → { year: "1920s", label: "Late" }; "16 April 2010 – Present" → { "2010 – Present", "16 April" } */
function splitDate(date: string) {
  const year = date.match(/\d{4}s?(?:\s*–\s*Present)?/)?.[0] ?? date;
  return { year, label: date.replace(year, "").trim() };
}

function Photo({ photo, priority = false }: { photo: HistoryPhoto; priority?: boolean }) {
  const p = history.photos[photo];
  return (
    <Image
      src={p.src}
      alt={p.alt}
      width={p.width}
      height={p.height}
      sizes="(min-width: 1024px) 440px, 90vw"
      quality={90}
      priority={priority}
      className="h-full w-full object-contain"
    />
  );
}

/**
 * Timeline of the dispensary's history, used on the /history page.
 * On large screens a single framed photograph beside the timeline changes to
 * match the milestone being read; on small screens each photo appears inline.
 */
export function HistoryTimeline() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const milestones = history.milestones;
  const current = milestones[active].photo;

  // Which milestone is in the middle of the screen
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-milestone]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.milestone))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Gold line that fills as the reader moves down the timeline
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const r = list.getBoundingClientRect();
      const progress = (window.innerHeight * 0.5 - r.top) / r.height;
      fill.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-label="Timeline" className="border-t border-line bg-ivory-deep/50 py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Large screens: one photograph that follows the story */}
        <div className="hidden lg:col-span-5 lg:block">
          <figure className="sticky top-32">
            <div className="relative aspect-[4/5] max-h-[calc(100vh-14rem)] w-full border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgba(19,40,32,0.45)]">
              {photoKeys.map((key, i) => (
                <div
                  key={key}
                  aria-hidden={key !== current}
                  className={`absolute inset-5 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                    key === current ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Photo photo={key} priority={i === 0} />
                </div>
              ))}
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-xs tracking-wide text-muted" aria-live="polite">
              <span aria-hidden className="h-px w-6 bg-gold" />
              {history.photos[current].caption}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7">
          <ol ref={listRef} className="relative pl-10 sm:pl-14">
            {/* track and progress fill */}
            <span aria-hidden className="absolute bottom-0 left-0 top-3 w-px bg-gold/25" />
            <span
              ref={fillRef}
              aria-hidden
              className="absolute bottom-0 left-0 top-3 w-px origin-top bg-gold"
              style={{ transform: "scaleY(0)" }}
            />

            {milestones.map((m, i) => {
              const { year, label } = splitDate(m.date);
              const reached = i <= active;
              const newPhoto = milestones.findIndex((x) => x.photo === m.photo) === i;
              return (
                <li key={m.date} data-milestone={i} className="relative pb-16 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-10 top-4 -ml-[5px] h-[11px] w-[11px] rotate-45 border transition-colors duration-500 sm:-left-14 ${
                      reached ? "border-gold bg-gold" : "border-gold/60 bg-ivory"
                    }`}
                  />
                  <Reveal>
                    <p className="flex flex-col">
                      {label && <span className="eyebrow mb-2 text-[0.66rem] text-muted">{label}</span>}
                      <span
                        className={`font-serif text-[3rem] font-medium leading-none transition-colors duration-500 sm:text-[3.6rem] ${
                          i === active ? "text-gold" : "text-gold/55"
                        }`}
                      >
                        {year}
                      </span>
                    </p>
                    <h2 className="mt-4 font-serif text-[1.75rem] leading-tight text-forest-deep sm:text-[2rem]">
                      {m.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-[1rem] leading-[1.8] text-muted">{m.text}</p>
                    {m.list && (
                      <ul className="mt-5 max-w-xl border-t border-line">
                        {m.list.map((item, n) => (
                          <li key={item} className="flex items-baseline gap-4 border-b border-line py-3 text-[0.97rem] text-ink">
                            <span className="font-serif text-sm italic text-gold">{String(n + 1).padStart(2, "0")}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Small screens: show each photo once, where it first belongs */}
                    {newPhoto && (
                      <figure className={`mt-7 lg:hidden ${m.photo === "doctor" ? "max-w-[260px]" : "max-w-md"}`}>
                        <div className="border border-line bg-paper p-2">
                          <Photo photo={m.photo} />
                        </div>
                        <figcaption className="mt-2.5 text-[0.75rem] italic text-muted">
                          {history.photos[m.photo].caption}
                        </figcaption>
                      </figure>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal className="mt-16 border-t border-line pt-10">
            <p className="font-serif text-[1.55rem] leading-snug text-forest-deep sm:text-[1.8rem]">
              {history.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
