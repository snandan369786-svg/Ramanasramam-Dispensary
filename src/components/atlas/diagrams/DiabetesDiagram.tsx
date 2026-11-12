import { c, label, labelStrong, type DiagramProps } from "./palette";

/* Glucose sits in the bloodstream; insulin "unlocks" the cell. */
const glucoseSpots = Array.from({ length: 14 }, (_, i) => ({
  x: 36 + i * 24.5,
  y: i % 2 ? 176 : 160,
}));
const insulinSpots = [
  { x: 250, y: 170 }, { x: 292, y: 162 }, { x: 330, y: 178 },
  { x: 210, y: 180 }, { x: 170, y: 162 }, { x: 128, y: 178 },
];
const cellGlucose = [
  { x: 186, y: 262 }, { x: 212, y: 254 }, { x: 200, y: 280 },
  { x: 222, y: 276 }, { x: 178, y: 284 },
];

function Hex({ x, y, on, tone = c.gold }: { x: number; y: number; on: boolean; tone?: string }) {
  return (
    <polygon
      className="t"
      points="0,-5.5 4.8,-2.75 4.8,2.75 0,5.5 -4.8,2.75 -4.8,-2.75"
      transform={`translate(${x} ${y})`}
      fill={tone}
      stroke={c.paper}
      strokeWidth="1"
      style={{ opacity: on ? 1 : 0 }}
    />
  );
}

function Insulin({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g className="t" transform={`translate(${x} ${y})`} style={{ opacity: on ? 1 : 0 }}>
      <circle r="4.5" fill={c.paper} stroke={c.forest} strokeWidth="1.6" />
      <path d="M4.5 0h7M9 0v3" stroke={c.forest} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export function DiabetesDiagram({ step }: DiagramProps) {
  const glucoseInBlood = [9, 9, 4, 14][step];
  const insulinCount = [0, 6, 6, 2][step];
  const inCell = [0, 0, 5, 1][step];
  const level = [0.62, 0.62, 0.4, 0.92][step];
  const doorOpen = step === 2;

  return (
    <svg viewBox="0 0 400 320" className="atlas-diagram h-full w-full">
      {/* Blood glucose meter */}
      <g>
        <text x="200" y="22" textAnchor="middle" style={label}>BLOOD GLUCOSE</text>
        <rect x="130" y="32" width="140" height="10" rx="5" fill={c.mist} stroke={c.line} />
        <rect x="158" y="32" width="46" height="10" fill={c.sageLight} />
        <rect
          className="t"
          x="130"
          y="32"
          width="140"
          height="10"
          rx="5"
          fill={step === 3 ? c.blood : c.gold}
          style={{ transform: `scaleX(${level})`, transformOrigin: "left", transformBox: "fill-box" }}
        />
        <text x="181" y="56" textAnchor="middle" style={{ ...label, fontSize: 9 }}>healthy range</text>
        <text className="t" x="282" y="41" style={{ ...labelStrong, fill: c.blood, opacity: step === 3 ? 1 : 0 }}>HIGH</text>
      </g>

      {/* Food */}
      <g style={{ opacity: step === 0 ? 1 : 0.55 }} className="t">
        <path d="M28 76h44a22 22 0 0 1-44 0Z" fill={c.paper} stroke={c.forest} strokeWidth="1.4" />
        <path d="M38 70c2-6 8-6 10 0M50 68c2-7 9-7 11 0" fill="none" stroke={c.gold} strokeWidth="1.4" strokeLinecap="round" />
        <text x="50" y="116" textAnchor="middle" style={labelStrong}>FOOD</text>
        <path d="M50 122v12" stroke={c.gold} strokeWidth="1.6" markerEnd="url(#dArrowGold)" />
      </g>

      {/* Pancreas */}
      <g className="t" style={{ opacity: step === 0 ? 0.55 : 1 }}>
        <path
          d="M300 66c-6-14 8-24 22-18 16 6 34 4 48 10 10 5 8 16-4 16-14 0-30-2-44 2-12 4-18 0-22-10Z"
          fill={step === 3 ? c.mist : c.sageLight}
          stroke={c.forest}
          strokeWidth="1.4"
        />
        <text x="336" y="104" textAnchor="middle" style={labelStrong}>PANCREAS</text>
        <path d="M318 110v24" stroke={c.forest} strokeWidth="1.6" markerEnd="url(#dArrowForest)" strokeDasharray={step === 3 ? "3 3" : undefined} />
      </g>

      {/* Bloodstream */}
      <text x="200" y="134" textAnchor="middle" style={label}>BLOODSTREAM</text>
      <rect x="12" y="142" width="376" height="52" rx="26" fill={c.bloodSoft} stroke={c.bloodMid} strokeWidth="1.2" />
      {glucoseSpots.map((p, i) => (
        <Hex key={i} {...p} on={i < glucoseInBlood} tone={step === 3 ? c.blood : c.gold} />
      ))}
      {insulinSpots.map((p, i) => (
        <Insulin key={i} {...p} on={i < insulinCount} />
      ))}

      {/* Into the cell */}
      <path
        className="t"
        d="M200 198v14"
        stroke={c.gold}
        strokeWidth="1.8"
        markerEnd="url(#dArrowGold)"
        style={{ opacity: doorOpen ? 1 : 0 }}
      />
      <circle cx="200" cy="268" r="44" fill={c.mist} stroke={c.sage} strokeWidth="1.4" />
      {/* the "door" — an insulin receptor on the cell surface */}
      <rect x="190" y="220" width="20" height="9" rx="2" fill={c.paper} stroke={c.forest} strokeWidth="1.4" />
      <rect
        className="t"
        x="192"
        y="222"
        width="16"
        height="5"
        rx="1"
        fill={step === 3 ? c.blood : c.forest}
        style={{ transform: doorOpen ? "scaleX(0.1)" : "none" }}
      />
      {cellGlucose.map((p, i) => (
        <Hex key={i} {...p} on={i < inCell} />
      ))}
      <text x="262" y="262" style={labelStrong}>BODY CELL</text>
      <text x="262" y="278" style={{ ...label, fontSize: 10 }}>muscle · fat · liver</text>
      <text className="t" x="262" y="294" style={{ ...label, fontSize: 10, fill: c.blood, opacity: step === 3 ? 1 : 0 }}>
        glucose can’t get in
      </text>

      {/* Legend */}
      <g transform="translate(20 252)">
        <Hex x={6} y={0} on />
        <text x="18" y="4" style={{ ...label, fontSize: 10 }}>glucose</text>
        <g transform="translate(6 22)">
          <circle r="4.5" fill={c.paper} stroke={c.forest} strokeWidth="1.6" />
          <path d="M4.5 0h7M9 0v3" stroke={c.forest} strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <text x="24" y="26" style={{ ...label, fontSize: 10 }}>insulin</text>
      </g>

      <defs>
        <marker id="dArrowGold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={c.gold} />
        </marker>
        <marker id="dArrowForest" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={c.forest} />
        </marker>
      </defs>
    </svg>
  );
}
