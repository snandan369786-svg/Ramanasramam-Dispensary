"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Stethoscope } from "lucide-react";
import { categories, conditions } from "@/content/health-atlas";
import { ConditionGlyph } from "./ConditionGlyph";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

/* Conditions grouped by chapter, in chapter order */
const groups = categories
  .map((cat, i) => ({
    cat,
    numeral: numerals[i],
    items: conditions.filter((c) => c.category === cat.id),
  }))
  .filter((g) => g.items.length);
const flat = groups.flatMap((g) => g.items);

/**
 * Branded dropdown (WAI-ARIA "select-only combobox" pattern).
 * Choosing a condition opens its page.
 */
export function ConditionPicker() {
  const router = useRouter();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", time: 0 });

  const chosenCondition = useMemo(() => flat.find((c) => c.slug === chosen), [chosen]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option in view, clear of the sticky chapter heading
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!open || !list || !el) return;
    const heading = 48;
    const top = el.offsetTop - heading;
    const bottom = el.offsetTop + el.offsetHeight + 8;
    if (top < list.scrollTop) list.scrollTop = Math.max(0, top);
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [active, open]);

  const choose = (index: number) => {
    const c = flat[index];
    if (!c) return;
    setChosen(c.slug);
    setOpen(false);
    router.push(`/health-atlas/${c.slug}`);
  };

  const openList = (start?: number) => {
    const current = chosen ? flat.findIndex((c) => c.slug === chosen) : 0;
    setActive(start ?? Math.max(0, current));
    setOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = flat.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) return openList();
        setActive((i) => Math.min(last, i + 1));
        return;
      case "ArrowUp":
        e.preventDefault();
        if (!open) return openList();
        setActive((i) => Math.max(0, i - 1));
        return;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        return;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(last);
        }
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openList();
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        // Type a letter to jump to a matching condition
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const now = Date.now();
          const t = typeahead.current;
          t.text = now - t.time > 700 ? e.key.toLowerCase() : t.text + e.key.toLowerCase();
          t.time = now;
          const match = flat.findIndex((c) => c.name.toLowerCase().startsWith(t.text));
          if (match >= 0) {
            if (!open) openList(match);
            else setActive(match);
          }
        }
    }
  };

  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;
  let index = -1;

  return (
    <div ref={rootRef} className="relative max-w-xl">
      <span id={`${id}-label`} className="sr-only">
        Select a health condition
      </span>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`group flex h-16 w-full items-center gap-4 rounded-[6px] border bg-paper pl-5 pr-3 text-left shadow-[0_14px_30px_-24px_rgba(19,40,32,0.5)] transition-colors duration-300 focus-visible:outline-offset-2 ${
          open ? "border-gold" : "border-line hover:border-gold/60"
        }`}
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage/50 text-forest">
          {chosenCondition ? (
            <ConditionGlyph icon={chosenCondition.icon} className="h-4 w-4" />
          ) : (
            <Stethoscope aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold">
            Health condition
          </span>
          <span className={`mt-0.5 block truncate text-[1rem] ${chosenCondition ? "text-forest-deep" : "text-muted"}`}>
            {chosenCondition ? chosenCondition.name : "Select a health condition"}
          </span>
        </span>
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] transition-all duration-300 ${
            open ? "bg-forest text-ivory" : "bg-sage-mist text-forest group-hover:bg-forest group-hover:text-ivory"
          }`}
        >
          <ChevronDown
            aria-hidden
            strokeWidth={1.6}
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Panel */}
      <div
        className={`absolute inset-x-0 top-full z-40 mt-2 origin-top overflow-hidden rounded-[6px] border border-line bg-paper shadow-[0_28px_60px_-28px_rgba(19,40,32,0.45)] transition-[opacity,transform] duration-200 ${
          open ? "visible scale-100 opacity-100" : "invisible scale-[0.98] opacity-0"
        }`}
      >
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          tabIndex={-1}
          className="relative max-h-[min(26rem,60vh)] overflow-y-auto overscroll-contain pb-2"
        >
          {groups.map((g) => (
            <li key={g.cat.id} role="presentation">
              <div
                role="presentation"
                className="sticky top-0 z-10 flex items-baseline gap-2.5 border-b border-line/70 bg-paper/95 px-5 pb-2 pt-3 backdrop-blur"
              >
                <span className="font-serif text-[0.85rem] italic text-sage">{g.numeral}</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  {g.cat.name}
                </span>
              </div>
              <ul role="group" aria-label={g.cat.name} className="py-1">
                {g.items.map((c) => {
                  index += 1;
                  const i = index;
                  const isActive = open && i === active;
                  const isChosen = c.slug === chosen;
                  return (
                    <li
                      key={c.slug}
                      id={optionId(i)}
                      data-index={i}
                      role="option"
                      aria-selected={isChosen}
                      onPointerMove={() => setActive(i)}
                      onClick={() => choose(i)}
                      className={`mx-2 flex cursor-pointer items-center gap-3.5 rounded-[4px] px-3 py-2.5 transition-colors ${
                        isActive ? "bg-sage-mist" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isActive ? "border-forest bg-forest text-gold-light" : "border-sage/40 text-forest"
                        }`}
                      >
                        <ConditionGlyph icon={c.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[1.12rem] leading-tight text-forest-deep">{c.name}</span>
                        {c.aka && (
                          <span className="block truncate text-[0.76rem] text-muted">{c.aka[0]}</span>
                        )}
                      </span>
                      {isChosen ? (
                        <Check aria-hidden className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                      ) : (
                        <ArrowRight
                          aria-hidden
                          strokeWidth={1.6}
                          className={`h-4 w-4 shrink-0 text-gold transition-all duration-200 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        <p className="border-t border-line bg-ivory px-5 py-2.5 text-[0.72rem] text-muted">
          <span className="hidden sm:inline">Use ↑ ↓ to move, Enter to open. </span>
          {flat.length} conditions in {groups.length} chapters
        </p>
      </div>
    </div>
  );
}
