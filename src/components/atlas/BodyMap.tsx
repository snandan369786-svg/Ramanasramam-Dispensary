import Link from "next/link";
import { conditions } from "@/content/health-atlas";

/**
 * "Plate I" — an engraved-style figure with points marking where each
 * condition mainly acts. Points link to the condition pages.
 * Positions are percentages of the 320 × 560 figure.
 */
const points: Record<string, { x: number; y: number; side?: "left" | "right" }> = {
  migraine: { x: 160, y: 50 },
  hypothyroidism: { x: 160, y: 104 },
  hypertension: { x: 99, y: 168, side: "left" },
  asthma: { x: 140, y: 158, side: "left" },
  "coronary-artery-disease": { x: 174, y: 170 },
  "acid-reflux": { x: 176, y: 210 },
  diabetes: { x: 148, y: 226, side: "left" },
  "chronic-kidney-disease": { x: 186, y: 244 },
  obesity: { x: 128, y: 268, side: "left" },
  anaemia: { x: 226, y: 262 },
  osteoarthritis: { x: 136, y: 418, side: "left" },
};

/* Left half of the silhouette, from the neck down to the inner leg.
   The right half is mirrored, then the outline is smoothed. */
const half: [number, number][] = [
  [148, 92], [146, 110], [126, 116], [106, 124], [96, 140], [92, 172],
  [88, 212], [84, 252], [80, 290], [82, 312], [90, 316], [96, 296],
  [100, 256], [106, 216], [110, 184], [114, 216], [114, 252], [110, 292],
  [112, 334], [118, 382], [120, 430], [122, 480], [120, 520], [112, 536],
  [126, 543], [146, 539], [148, 500], [150, 440], [154, 384], [158, 340],
];

function smoothClosed(pts: [number, number][]) {
  const n = pts.length;
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return `${d} Z`;
}

const body = smoothClosed([
  ...half,
  [160, 336],
  ...half
    .slice()
    .reverse()
    .map(([x, y]) => [320 - x, y] as [number, number]),
]);

export function BodyMap() {
  const linked = conditions.filter((c) => points[c.slug]);

  return (
    <figure className="relative mx-auto w-full max-w-[380px]">
      <div className="relative rounded-[6px] border border-line bg-paper px-6 pb-6 pt-10 shadow-[0_30px_60px_-40px_rgba(19,40,32,0.45)]">
        {/* Plate frame */}
        <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[3px] border border-line/80" />
        <p aria-hidden className="absolute left-6 top-5 font-serif text-[0.8rem] italic text-sage">
          Plate I
        </p>
        <p aria-hidden className="eyebrow absolute right-6 top-5 text-[0.6rem] text-gold">
          The Human Body
        </p>

        <div className="relative mx-auto aspect-[320/560] w-[70%]">
          <svg viewBox="0 0 320 560" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* faint measurement grid, like an engraved plate */}
            <g stroke="var(--color-line)" strokeWidth="0.6">
              {Array.from({ length: 13 }, (_, i) => (
                <line key={`h${i}`} x1="0" x2="320" y1={i * 45 + 10} y2={i * 45 + 10} strokeDasharray="2 5" />
              ))}
              <line x1="160" x2="160" y1="0" y2="560" strokeDasharray="2 5" />
            </g>
            <circle cx="160" cy="58" r="33" fill="var(--color-sage-mist)" stroke="var(--color-forest)" strokeWidth="1.2" />
            <path d={body} fill="var(--color-sage-mist)" stroke="var(--color-forest)" strokeWidth="1.2" strokeLinejoin="round" />
            {/* hint of organs */}
            <g fill="none" stroke="var(--color-sage)" strokeWidth="0.9" opacity="0.8">
              <path d="M152 132c-14 2-24 20-24 44 0 14 6 20 14 16 8-4 10-18 10-30Z" />
              <path d="M168 132c14 2 24 20 24 44 0 14-6 20-14 16-8-4-10-18-10-30Z" />
              <path d="M170 196c14-4 28 2 28 14s-14 20-30 16" />
              <ellipse cx="134" cy="244" rx="7" ry="11" />
              <ellipse cx="186" cy="244" rx="7" ry="11" />
              <circle cx="136" cy="420" r="9" />
              <circle cx="184" cy="420" r="9" />
            </g>
          </svg>

          {linked.map((c) => {
            const p = points[c.slug];
            const left = p.side === "left";
            return (
              <Link
                key={c.slug}
                href={`/health-atlas/${c.slug}`}
                className="group absolute -ml-[14px] -mt-[14px] flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-offset-0"
                style={{ left: `${(p.x / 320) * 100}%`, top: `${(p.y / 560) * 100}%` }}
              >
                <span aria-hidden className="absolute h-7 w-7 rounded-full bg-gold/20 motion-safe:animate-[atlas-pulse_3.2s_ease-out_infinite]" />
                <span aria-hidden className="relative h-2.5 w-2.5 rounded-full border border-paper bg-gold shadow-[0_0_0_3px_rgba(168,132,74,0.18)] transition-transform duration-300 group-hover:scale-150 group-focus-visible:scale-150" />
                <span
                  className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-[3px] bg-forest-deep px-2.5 py-1.5 text-[0.72rem] font-medium text-ivory opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${left ? "right-8 translate-x-1 group-hover:translate-x-0" : "left-8 -translate-x-1 group-hover:translate-x-0"}`}
                >
                  {c.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-4 text-center text-[0.8rem] text-muted">
        Select a point to explore a condition.
      </figcaption>
    </figure>
  );
}
