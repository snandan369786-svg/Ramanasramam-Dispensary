import Link from "next/link";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { getCategory, type Condition } from "@/content/health-atlas";
import { ConditionGlyph } from "./ConditionGlyph";

export function ConditionCard({ condition }: { condition: Condition }) {
  const category = getCategory(condition.category);
  return (
    <Link
      href={`/health-atlas/${condition.slug}`}
      className="group relative flex h-full flex-col rounded-[6px] border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-24px_rgba(19,40,32,0.35)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-sage/50 bg-ivory text-forest transition-colors duration-500 group-hover:border-gold group-hover:bg-forest group-hover:text-gold-light">
          <ConditionGlyph icon={condition.icon} className="h-6 w-6" />
        </span>
        {condition.understanding.diagram && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage">
            <MousePointerClick aria-hidden className="h-3 w-3" strokeWidth={1.8} />
            Interactive
          </span>
        )}
      </div>

      <p className="eyebrow mt-7 text-[0.66rem] text-gold">{category.name}</p>
      <h3 className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-forest-deep">
        {condition.name}
      </h3>
      {condition.aka && (
        <p className="mt-1 text-[0.82rem] italic text-muted">
          {condition.aka[0]}
        </p>
      )}
      <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
        {condition.summary}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.84rem] font-medium text-forest">
        Learn more
        <span className="sr-only"> about {condition.name}</span>
        <ArrowRight
          aria-hidden
          strokeWidth={1.6}
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
