import { c, label, labelStrong, type DiagramProps } from "./palette";

const arrowXs = [120, 170, 220, 270, 320];
const cellXs = [96, 150, 204, 258, 312, 356];

export function HypertensionDiagram({ step }: DiagramProps) {
  const high = step >= 2;
  const thick = high ? 1 : 0;
  const push = high ? 1.35 : 0.85;

  return (
    <svg viewBox="0 0 400 320" className="atlas-diagram h-full w-full">
      {/* Pressure wave */}
      <g className="t" style={{ opacity: step === 0 || high ? 1 : 0.35 }}>
        <path
          d={
            high
              ? "M80 52c12 0 14-28 26-28s14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 12 28 24 28"
              : "M80 62c12 0 14-28 26-28s14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 14 22 24 22 12-22 24-22 12 28 24 28"
          }
          fill="none"
          stroke={high ? c.blood : c.forest}
          strokeWidth="1.6"
          className="t"
        />
        <text x="106" y={high ? 16 : 26} textAnchor="middle" style={{ ...label, fontSize: 9.5 }} className="t">
          systolic
        </text>
        <text x="130" y={high ? 60 : 70} textAnchor="middle" style={{ ...label, fontSize: 9.5 }} className="t">
          diastolic
        </text>
        <text className="t" x="380" y="16" textAnchor="end" style={{ ...labelStrong, fill: c.blood, opacity: high ? 1 : 0 }}>
          STAYS HIGH
        </text>
      </g>

      {/* Artery walls */}
      <g>
        <rect x="80" y="96" width="306" height="16" fill={c.bloodMid} />
        <rect x="80" y="208" width="306" height="16" fill={c.bloodMid} />
        {/* thickened inner layer */}
        <rect className="t" x="80" y="112" width="306" height="14" fill={c.inflamed}
          style={{ transform: `scaleY(${thick})`, transformOrigin: "top", transformBox: "fill-box" }} />
        <rect className="t" x="80" y="194" width="306" height="14" fill={c.inflamed}
          style={{ transform: `scaleY(${thick})`, transformOrigin: "bottom", transformBox: "fill-box" }} />
        {/* lumen */}
        <rect className="t" x="80" y="112" width="306" height="96" fill={c.bloodSoft}
          style={{ transform: `scaleY(${high ? 0.71 : 1})`, transformOrigin: "center", transformBox: "fill-box" }} />
        <path d="M80 96h306M80 224h306" stroke={c.blood} strokeWidth="1.2" />
      </g>

      {/* Blood cells flowing */}
      <g className="motion-safe:animate-[atlas-flow_2.4s_linear_infinite]" style={{ ["--flow" as string]: "54px" }}>
        {cellXs.map((x, i) => (
          <ellipse key={x} cx={x - 54} cy={i % 2 ? 150 : 170} rx="9" ry="5" fill={c.blood} opacity="0.55" />
        ))}
      </g>
      <rect x="0" y="100" width="80" height="120" fill={c.ivory} />
      <rect x="386" y="100" width="14" height="120" fill={c.ivory} />
      {/* Heart */}
      <g transform="translate(40 160)">
        <path
          className={step === 0 ? "motion-safe:animate-[atlas-beat_1.1s_ease-in-out_infinite]" : ""}
          d="M0 14C-18 2-22-10-14-17-7-23 0-17 0-11 0-17 7-23 14-17 22-10 18 2 0 14Z"
          fill={c.bloodMid}
          stroke={c.blood}
          strokeWidth="1.4"
        />
        <text x="0" y="40" textAnchor="middle" style={labelStrong}>HEART</text>
      </g>

      {/* Pressure on the walls */}
      {arrowXs.map((x) => (
        <g key={x} className="t" style={{ opacity: step === 1 ? 0.35 : 1 }}>
          <g className="t" style={{ transform: `scaleY(${push})`, transformOrigin: "bottom", transformBox: "fill-box" }}>
            <path d={`M${x} 150v-22`} stroke={high ? c.blood : c.forest} strokeWidth={high ? 2.2 : 1.5} markerEnd={high ? "url(#hArrowBlood)" : "url(#hArrowForest)"} />
          </g>
          <g className="t" style={{ transform: `scaleY(${push})`, transformOrigin: "top", transformBox: "fill-box" }}>
            <path d={`M${x} 170v22`} stroke={high ? c.blood : c.forest} strokeWidth={high ? 2.2 : 1.5} markerEnd={high ? "url(#hArrowBlood)" : "url(#hArrowForest)"} />
          </g>
        </g>
      ))}

      {/* Elastic stretch and recoil */}
      <g className="t" style={{ opacity: step === 1 ? 1 : 0 }}>
        {[150, 300].map((x) => (
          <g key={x}>
            <path d={`M${x} 90v-14M${x} 230v14`} stroke={c.forest} strokeWidth="1.4" markerEnd="url(#hArrowForest)" />
            <path d={`M${x + 14} 76v14M${x + 14} 244v-14`} stroke={c.sage} strokeWidth="1.4" markerEnd="url(#hArrowSage)" />
          </g>
        ))}
        <text x="232" y="84" textAnchor="middle" style={{ ...label, fontSize: 10 }}>stretches · recoils</text>
      </g>

      {/* Plaque on a damaged lining */}
      {[{ x: 236, y: 126, top: true }, { x: 324, y: 194, top: false }].map((p) => (
        <ellipse key={p.x} className="t" cx={p.x} cy={p.y} rx="18" ry="7" fill={c.goldLight} stroke={c.gold}
          style={{ opacity: high ? 1 : 0, transform: high ? "scale(1)" : "scale(0.4)" }} />
      ))}

      {/* Labels */}
      <text x="386" y="250" textAnchor="end" className="t" style={{ ...labelStrong, opacity: step === 3 ? 0 : 1 }}>
        {high ? "THICKER, STIFFER WALL" : "ARTERY WALL"}
      </text>

      {/* Organs under strain */}
      <g className="t" style={{ opacity: step === 3 ? 1 : 0 }}>
        {["Brain", "Heart", "Kidneys", "Eyes"].map((o, i) => {
          const x = 120 + i * 80;
          return (
            <g key={o}>
              <path d={`M${x} 226v26`} stroke={c.blood} strokeDasharray="3 3" />
              <circle cx={x} cy="270" r="16" fill={c.paper} stroke={c.blood} strokeWidth="1.4" />
              <text x={x} y="274" textAnchor="middle" style={{ ...labelStrong, fontSize: 9, fill: c.blood }}>!</text>
              <text x={x} y="304" textAnchor="middle" style={labelStrong}>{o.toUpperCase()}</text>
            </g>
          );
        })}
      </g>

      <defs>
        {[["Forest", c.forest], ["Blood", c.blood], ["Sage", c.sage]].map(([n, col]) => (
          <marker key={n} id={`hArrow${n}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={col} />
          </marker>
        ))}
      </defs>
    </svg>
  );
}
