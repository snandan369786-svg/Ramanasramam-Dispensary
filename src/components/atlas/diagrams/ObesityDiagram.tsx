import { c, label, labelStrong, type DiagramProps } from "./palette";

const CX = 200;
const CY = 160;

const nodes = [
  { id: "genes", title: "Genes", sub: "appetite · fat storage", x: 14, y: 22, steps: [1] },
  { id: "hormones", title: "Hormones & brain", sub: "leptin · ghrelin", x: 256, y: 22, steps: [2] },
  { id: "environment", title: "Food & activity", sub: "what is around us", x: 256, y: 246, steps: [3] },
  { id: "life", title: "Sleep & stress", sub: "medicines · health", x: 14, y: 246, steps: [3] },
];
const W = 130;
const H = 52;

export function ObesityDiagram({ step }: DiagramProps) {
  const all = step === 4;

  return (
    <svg viewBox="0 0 400 320" className="atlas-diagram h-full w-full">
      {/* links between factors — they interact */}
      <g className="t" style={{ opacity: all ? 1 : 0 }}>
        <path
          d={`M${14 + W / 2} ${22 + H}V246M${256 + W / 2} ${22 + H}V246M${14 + W} ${22 + H / 2}H256M${14 + W} ${246 + H / 2}H256`}
          stroke={c.gold}
          strokeWidth="1.2"
          strokeDasharray="4 4"
          fill="none"
        />
      </g>

      {/* spokes to the centre */}
      {nodes.map((n) => {
        const on = all || n.steps.includes(step);
        const nx = n.x + W / 2;
        const ny = n.y + (n.y < CY ? H : 0);
        return (
          <path
            key={n.id}
            className="t"
            d={`M${nx} ${ny}L${CX + (nx < CX ? -36 : 36)} ${CY + (ny < CY ? -36 : 36)}`}
            stroke={on ? c.forest : c.line}
            strokeWidth={on ? 1.6 : 1}
            markerEnd={on ? "url(#oArrow)" : undefined}
          />
        );
      })}

      {/* centre — energy balance */}
      <circle cx={CX} cy={CY} r="62" fill={step === 0 || all ? c.sageLight : c.mist} stroke={c.forest} strokeWidth="1.3" className="t" />
      <text x={CX} y={CY - 26} textAnchor="middle" style={labelStrong}>BODY WEIGHT</text>
      <g className="t" style={{ transform: `rotate(${step === 0 ? -9 : -4}deg)`, transformOrigin: `${CX}px ${CY + 4}px`, transformBox: "view-box" }}>
        <path d={`M${CX - 44} ${CY + 4}H${CX + 44}`} stroke={c.forest} strokeWidth="2" strokeLinecap="round" />
        <rect x={CX - 48} y={CY - 10} width="22" height="14" rx="3" fill={c.gold} />
        <rect x={CX + 30} y={CY - 6} width="16" height="10" rx="3" fill={c.sage} />
      </g>
      <path d={`M${CX} ${CY + 6}l-8 14h16Z`} fill={c.forest} />
      <text x={CX - 38} y={CY + 38} textAnchor="middle" style={{ ...label, fontSize: 9.5 }}>energy in</text>
      <text x={CX + 40} y={CY + 38} textAnchor="middle" style={{ ...label, fontSize: 9.5 }}>energy used</text>

      {/* factors */}
      {nodes.map((n) => {
        const on = all || n.steps.includes(step);
        return (
          <g key={n.id} className="t" style={{ opacity: on ? 1 : 0.55 }}>
            <rect className="t" x={n.x} y={n.y} width={W} height={H} rx="6" fill={on ? c.forest : c.paper} stroke={on ? c.forest : c.line} />
            <text x={n.x + 12} y={n.y + 22} style={{ ...labelStrong, fontSize: 12, letterSpacing: "0.01em", fill: on ? c.ivory : c.forestDeep }}>
              {n.title}
            </text>
            <text x={n.x + 12} y={n.y + 39} style={{ ...label, fontSize: 9.5, letterSpacing: "0.02em", fill: on ? c.goldLight : c.muted }}>
              {n.sub}
            </text>
          </g>
        );
      })}

      <defs>
        <marker id="oArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={c.forest} />
        </marker>
      </defs>
    </svg>
  );
}
