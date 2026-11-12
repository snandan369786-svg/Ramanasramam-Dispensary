"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import {
  categories,
  conditions,
  getCategory,
  type CategoryId,
} from "@/content/health-atlas";
import { ConditionCard } from "./ConditionCard";
import { BodyMap } from "./BodyMap";
import { ConditionPicker } from "./ConditionPicker";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

export function AtlasExplorer() {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);

  // Restore the chapter filter from the URL (e.g. a condition page's breadcrumb)
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c && categories.some((x) => x.id === c)) setCategory(c as CategoryId);
  }, []);

  // Keep the URL shareable without adding history entries
  useEffect(() => {
    const qs = category === "all" ? "" : `?category=${category}`;
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs}${window.location.hash}`);
  }, [category]);

  const results = useMemo(
    () => (category === "all" ? conditions : conditions.filter((c) => c.category === category)),
    [category],
  );
  const counts = useMemo(() => {
    const m = new Map<CategoryId, number>();
    conditions.forEach((c) => m.set(c.category, (m.get(c.category) ?? 0) + 1));
    return m;
  }, []);

  const scrollToGrid = () => {
    const el = gridRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.6 || top < 0) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeCategory = category === "all" ? null : getCategory(category);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="atlas-title" className="grain relative z-10 pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pb-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span aria-hidden className="h-px w-8 bg-current opacity-70" />
              Health Atlas
            </p>
            <h1
              id="atlas-title"
              className="display mt-5 text-[2.7rem] text-forest-deep sm:text-6xl lg:text-[4.4rem]"
            >
              Understand your health.{" "}
              <em className="text-forest-soft">Take charge of your wellbeing.</em>
            </h1>
            <p className="mt-7 max-w-xl text-[1.06rem] leading-[1.8] text-muted">
              Explore common health conditions in clear, everyday language — what
              they are, what happens inside the body, their causes and symptoms,
              and how they are diagnosed and managed.
            </p>

            <div className="mt-10">
              <ConditionPicker />
            </div>
            <p className="mt-4 text-sm text-muted">
              Or browse all {conditions.length} conditions by body system below.
            </p>
          </div>

          <div className="lg:col-span-5">
            <BodyMap />
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <section aria-labelledby="categories-title" className="border-y border-line bg-paper py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span aria-hidden className="h-px w-8 bg-current opacity-70" />
                Browse by body system
              </p>
              <h2 id="categories-title" className="display mt-5 text-[2.2rem] text-forest-deep sm:text-5xl">
                Seven chapters <em className="text-forest-soft">of the body.</em>
              </h2>
            </div>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-muted">
              Choose a chapter to see its conditions.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[{ id: "all" as const, name: "All conditions", description: "The complete index of the atlas." }, ...categories].map(
              (cat, i) => {
                const active = category === cat.id;
                const count = cat.id === "all" ? conditions.length : (counts.get(cat.id) ?? 0);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setCategory(cat.id);
                      requestAnimationFrame(scrollToGrid);
                    }}
                    className={`group flex min-h-[148px] flex-col p-6 text-left transition-colors duration-300 ${
                      active ? "bg-forest text-ivory" : "bg-paper hover:bg-ivory"
                    }`}
                  >
                    <span className="flex w-full items-baseline justify-between">
                      <span className={`font-serif text-lg italic ${active ? "text-gold-light" : "text-sage"}`}>
                        {i === 0 ? "Index" : numerals[i - 1]}
                      </span>
                      <span className={`text-[0.72rem] font-semibold tracking-[0.12em] ${active ? "text-ivory/70" : "text-muted"}`}>
                        {count} {count === 1 ? "condition" : "conditions"}
                      </span>
                    </span>
                    <span className={`mt-auto pt-6 font-serif text-[1.35rem] leading-tight ${active ? "text-ivory" : "text-forest-deep"}`}>
                      {cat.name}
                    </span>
                    <span className={`mt-1.5 text-[0.82rem] leading-snug ${active ? "text-ivory/70" : "text-muted"}`}>
                      {cat.description}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ── Conditions grid ───────────────────────────────────────────── */}
      <section aria-labelledby="conditions-title" className="py-20 sm:py-28">
        <div ref={gridRef} id="conditions" className="container-page scroll-mt-28">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
            <div>
              <h2 id="conditions-title" className="font-serif text-[2rem] leading-tight text-forest-deep sm:text-[2.4rem]">
                {activeCategory ? activeCategory.name : "All conditions"}
              </h2>
              <p className="mt-2 text-sm text-muted" aria-live="polite">
                Showing {results.length} of {conditions.length} conditions
              </p>
            </div>
            {category !== "all" && (
              <button
                type="button"
                onClick={() => setCategory("all")}
                className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-forest underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold sm:self-auto"
              >
                <X aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
                Clear filters
              </button>
            )}
          </div>

          {results.length ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c) => (
                <li key={c.slug}>
                  <ConditionCard condition={c} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-[6px] border border-dashed border-line bg-paper px-8 py-14 text-center">
              <p className="font-serif text-2xl text-forest-deep">Nothing found here yet.</p>
              <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                No conditions in this chapter match your search. Try a different word, or browse all conditions.
              </p>
              <button
                type="button"
                onClick={() => setCategory("all")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest underline decoration-gold/50 underline-offset-[6px]"
              >
                Show all conditions
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
