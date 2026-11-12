"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/** Sticky contents with scroll-spy: a side rail on large screens, chips on small. */
export function ConditionToc({
  items,
  variant,
}: {
  items: TocItem[];
  variant: "chips" | "rail";
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active chip visible in the horizontal strip
  useEffect(() => {
    const chip = document.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    const strip = chip?.closest("ul");
    if (!chip || !strip) return;
    strip.scrollTo({
      left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  if (variant === "chips")
    return (
      <nav
        aria-label="On this page"
        className="sticky top-[72px] z-30 border-b border-line bg-ivory/95 backdrop-blur-md lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-10">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                data-chip={i.id}
                aria-current={active === i.id ? "location" : undefined}
                className={`block rounded-full border px-3.5 py-1.5 text-[0.78rem] transition-colors ${
                  active === i.id ? "border-forest bg-forest text-ivory" : "border-line text-muted hover:text-forest"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );

  return (
      <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
        <p className="eyebrow text-gold">On this page</p>
        <ol className="mt-5 border-l border-line">
          {items.map((i, n) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "location" : undefined}
                className={`-ml-px flex gap-3 border-l py-2 pl-4 text-[0.88rem] transition-colors ${
                  active === i.id
                    ? "border-gold text-forest-deep"
                    : "border-transparent text-muted hover:text-forest"
                }`}
              >
                <span className="w-5 font-serif italic text-sage">{String(n + 1).padStart(2, "0")}</span>
                {i.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
  );
}
