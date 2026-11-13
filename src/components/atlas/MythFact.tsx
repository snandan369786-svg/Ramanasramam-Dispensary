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
            <span className="eyebrow text-[0.62rem] text-gold">
              {item.condition.name}
            </span>
          )}
        </div>
        <p className="mt-5 font-serif text-[1.55rem] leading-snug text-forest-deep">
          “{item.statement}”
        </p>

        <div className="mt-auto pt-8">
          <p className="text-[0.8rem] text-muted">
            {revealed
              ? "Myth or fact?"
              : "Myth or fact? Make your choice to reveal the answer."}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(["myth", "fact"] as const).map((v) => {
              const chosen = guess === v;
              const isAnswer = item.verdict === v;
              const wrongPick = revealed && chosen && !isAnswer;
              const rightAnswer = revealed && isAnswer;
              const style = !revealed
                ? "border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory"
                : rightAnswer
                  ? "border-forest bg-forest text-ivory"
                  : wrongPick
                    ? "border-[#9b3b2f] bg-[#9b3b2f] text-ivory"
                    : "border-forest/15 text-forest/40";
              return (
                <div key={v} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setGuess(v)}
                    disabled={revealed}
                    aria-pressed={chosen}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-[4px] border py-3 text-[0.84rem] font-medium capitalize transition-all duration-300 disabled:cursor-default ${style}`}
                  >
                    {rightAnswer && (
                      <Check aria-hidden className="h-4 w-4" strokeWidth={2} />
                    )}
                    {wrongPick && (
                      <X aria-hidden className="h-4 w-4" strokeWidth={2} />
                    )}
                    {v}
                  </button>
                  {revealed && (
                    <span
                      className={`mt-1.5 text-[0.72rem] ${
                        wrongPick
                          ? "text-[#9b3b2f]"
                          : rightAnswer
                            ? "text-forest"
                            : "text-transparent"
                      }`}
                    >
                      {wrongPick
                        ? "Your answer"
                        : rightAnswer
                          ? chosen
                            ? "Your answer · right"
                            : "Right answer"
                          : "–"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {revealed && (
            <div aria-live="polite">
              <p
                className={`fade-up mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold ${correct ? "text-forest" : "text-[#9b3b2f]"}`}
              >
                {correct ? (
                  <Check aria-hidden className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <X aria-hidden className="h-4 w-4" strokeWidth={2} />
                )}
                {correct
                  ? `Correct, this is a ${isMyth ? "myth" : "fact"}.`
                  : `Not quite, this is actually a ${isMyth ? "myth" : "fact"}.`}
              </p>
              <p className="fade-up mt-2 text-[0.95rem] leading-relaxed text-ink/85">
                {item.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {(revealed || item.condition) && (
        <div className="flex items-center justify-between gap-4 border-t border-line px-7 py-4 sm:px-8">
          {item.condition ? (
            <Link
              href={`/health-atlas/${item.condition.slug}`}
              className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-forest"
            >
              Read about {item.condition.name}
              <ArrowRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.6}
              />
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
              <RotateCcw
                aria-hidden
                className="h-3.5 w-3.5"
                strokeWidth={1.6}
              />
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
