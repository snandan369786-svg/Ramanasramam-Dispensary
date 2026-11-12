/**
 * Decorative motifs inspired by South Indian temple architecture:
 * the mandapa arch (thoranam) and a simple lotus mark.
 * Purely ornamental — hidden from assistive technology.
 */

export function ArchMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 220"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* Outer cusped arch */}
      <path d="M20 220V120C20 60 80 14 200 6c120 8 180 54 180 114v100" />
      <path d="M44 220V124C44 72 96 34 200 26c104 8 156 46 156 98v96" />
      {/* Cusps */}
      {Array.from({ length: 9 }).map((_, i) => {
        const t = (i + 1) / 10;
        const angle = Math.PI * (1 - t);
        const cx = 200 + Math.cos(angle) * 150;
        const cy = 124 - Math.sin(angle) * 92;
        return <circle key={i} cx={cx} cy={cy} r="5" />;
      })}
      {/* Kalasha finial */}
      <path d="M200 6v-4M194 2h12" />
      {/* Pillars */}
      <path d="M20 220h24M356 220h24" />
      <path d="M32 140v80M368 140v80" strokeDasharray="2 6" />
    </svg>
  );
}

export function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
    >
      <path d="M24 4c4 6 4 16 0 24-4-8-4-18 0-24Z" />
      <path d="M24 28c-3-7-9-12-16-13 1 7 7 12 16 13Z" />
      <path d="M24 28c3-7 9-12 16-13-1 7-7 12-16 13Z" />
      <path d="M6 28h36" />
    </svg>
  );
}

/** A thin rule with a centred lotus, used between editorial passages. */
export function OrnamentRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-current opacity-30" />
      <LotusMark className="h-5 w-8 opacity-80" />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}
