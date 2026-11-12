import { c, label, labelStrong, type DiagramProps } from "./palette";

const CX = 160;
const CY = 160;

/* Per step: lumen radius, muscle ring scale, lining inflamed, mucus visible */
const states = [
  { lumen: 78, muscle: 1, inflamed: 0, mucus: 0 },
  { lumen: 64, muscle: 1, inflamed: 1, mucus: 0 },
  { lumen: 46, muscle: 0.86, inflamed: 1, mucus: 0 },
  { lumen: 32, muscle: 0.86, inflamed: 1, mucus: 1 },
  { lumen: 70, muscle: 0.98, inflamed: 0.35, mucus: 0.25 },
];

/** Round to avoid server/client floating-point differences during hydration */
const r2 = (n: number) => Math.round(n * 100) / 100;

const angles = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2 + 0.3);

export function AsthmaDiagram({ step }: DiagramProps) {
  const s = states[step];
  const liningOuter = 100 * s.muscle;
  const cellR = (s.lumen + liningOuter) / 2;

  return (
    <svg viewBox="0 0 400 320" className="atlas-diagram h-full w-full">
      {/* surrounding lung tissue */}
      <circle cx={CX} cy={CY} r="140" fill={c.mist} stroke={c.line} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <circle key={i} cx={r2(CX + Math.cos(a) * 128)} cy={r2(CY + Math.sin(a) * 128)} r="9" fill={c.paper} stroke={c.sageLight} />
        );
      })}

      {/* smooth muscle ring */}
      <circle
        className="t"
        cx={CX}
        cy={CY}
        r="110"
        fill="none"
        stroke={step >= 2 && step < 4 ? c.blood : c.bloodMid}
        strokeWidth={step >= 2 && step < 4 ? 13 : 9}
        strokeDasharray="7 4"
        style={{ transform: `scale(${s.muscle})` }}
      />

      {/* airway lining */}
      <circle
        className="t"
        cx={CX}
        cy={CY}
        r="100"
        fill={c.inflamed}
        style={{ transform: `scale(${s.muscle})` }}
      />
      <circle
        className="t"
        cx={CX}
        cy={CY}
        r="100"
        fill={c.bloodSoft}
        style={{ transform: `scale(${s.muscle})`, opacity: 1 - s.inflamed }}
      />

      {/* inflammatory cells within the lining */}
      {angles.map((a, i) => (
        <circle
          key={i}
          className="t"
          cx={CX}
          cy={CY}
          r="3.4"
          fill={c.forest}
          style={{
            transform: `translate(${r2(Math.cos(a) * cellR)}px, ${r2(Math.sin(a) * cellR)}px)`,
            opacity: s.inflamed * 0.8,
          }}
        />
      ))}

      {/* open airway (air) */}
      <circle
        className="t"
        cx={CX}
        cy={CY}
        r="100"
        fill={c.paper}
        stroke={c.bloodMid}
        strokeWidth="1"
        style={{ transform: `scale(${s.lumen / 100})` }}
      />

      {/* mucus */}
      {angles.map((a, i) => (
        <ellipse
          key={i}
          className="t"
          cx={CX}
          cy={CY}
          rx={i % 2 ? 9 : 12}
          ry="6"
          fill={c.goldLight}
          stroke={c.gold}
          strokeWidth="0.8"
          style={{
            transform: `translate(${r2(Math.cos(a + 0.4) * (s.lumen - 4))}px, ${r2(Math.sin(a + 0.4) * (s.lumen - 4))}px) rotate(${r2((a + 0.4) * (180 / Math.PI) + 90)}deg)`,
            opacity: s.mucus,
          }}
        />
      ))}

      <text x={CX} y={CY + 4} textAnchor="middle" style={{ ...labelStrong, fontSize: 10 }}>AIR</text>

      {/* labels */}
      <g style={{ ...label, fontSize: 10.5 }}>
        <path d={`M${CX + 108} ${CY - 34}L312 96`} stroke={c.sage} />
        <text x="316" y="92" style={labelStrong}>MUSCLE</text>
        <text x="316" y="106" style={{ ...label, fontSize: 10 }}>
          {step >= 2 && step < 4 ? "tightened" : "relaxed"}
        </text>

        <path d={`M${CX + 84} ${CY + 30}L312 196`} stroke={c.sage} />
        <text x="316" y="192" style={labelStrong}>LINING</text>
        <text x="316" y="206" style={{ ...label, fontSize: 10 }}>
          {s.inflamed >= 1 ? "inflamed" : s.inflamed > 0 ? "calmer" : "healthy"}
        </text>

        <g className="t" style={{ opacity: s.mucus >= 1 ? 1 : 0 }}>
          <path d={`M${CX + 22} ${CY + 24}L312 266`} stroke={c.gold} />
          <text x="316" y="262" style={labelStrong}>MUCUS</text>
          <text x="316" y="276" style={{ ...label, fontSize: 10 }}>extra, thick</text>
        </g>
      </g>

      <text x="316" y="40" style={{ ...label, fontSize: 9.5 }}>AIRWAY</text>
      <text x="316" y="54" style={{ ...label, fontSize: 9.5 }}>CROSS-SECTION</text>
    </svg>
  );
}
