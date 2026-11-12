"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import type { Myth } from "@/content/health-atlas";

type Item = Myth & { condition?: { name: string; slug: string } };

function MythCard({ item, index }: { item: Item; index: number }) {
  const [guess, setGuess] = useState<Item["verdict"] | null>(null);
  const revealed = guess !== null;
  const correct = guess === item.verdict;
  const isMyth = item.verdict === "myth";

  return (
    <li className="flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-paper">
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-serif text-sm italic text-sage">
            Statement {String(index + 1).padStart(2, "0")}
          </span>
          {item.condition && (
            <span className="eyebrow text-[0.62rem] text-gold">{item.condition.name}</span>
          )}
        </div>
        <p className="mt-5 font-serif text-[1.55rem] leading-snug text-forest-deep">
          “{item.statement}”
        </p>

        {!revealed ? (
          <div className="mt-auto pt-8">
            <p className="text-[0.8rem] text-muted">Myth or fact? Make your choice to reveal the answer.</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(["myth", "fact"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setGuess(v)}
                  className="rounded-[4px] border border-forest/25 py-3 text-[0.84rem] font-medium capitalize text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-8" aria-live="polite">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] ${
                  isMyth ? "bg-forest-deep text-gold-light" : "bg-sage-light text-forest-deep"
                }`}
              >
                {isMyth ? <X aria-hidden className="h-3.5 w-3.5" strokeWidth={2} /> : <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />}
                {isMyth ? "Myth" : "Fact"}
              </span>
              <span className="text-[0.82rem] text-muted">
                {correct ? "You got it." : "Not quite."}
              </span>
            </div>
            <p className="fade-up mt-4 text-[0.95rem] leading-relaxed text-ink/85">{item.explanation}</p>
          </div>
        )}
      </div>

      {(revealed || item.condition) && (
        <div className="flex items-center justify-between gap-4 border-t border-line px-7 py-4 sm:px-8">
          {item.condition ? (
            <Link
              href={`/health-atlas/${item.condition.slug}`}
              className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-forest"
            >
              Read about {item.condition.name}
              <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.6} />
            </Link>
          ) : (
            <span />
          )}
          {revealed && (
            <button
              type="button"
              onClick={() => setGuess(null)}
              className="inline-flex items-center gap-1.5 text-[0.78rem] text-muted hover:text-forest"
            >
              <RotateCcw aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
              Try again
            </button>
          )}
        </div>
      )}
    </li>
  );
}

export function MythFact({
  items,
  className = "md:grid-cols-2 lg:grid-cols-3",
}: {
  items: Item[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-6 ${className}`}>
      {items.map((item, i) => (
        <MythCard key={item.statement} item={item} index={i} />
      ))}
    </ul>
  );
}
