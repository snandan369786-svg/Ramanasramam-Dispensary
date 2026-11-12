/** Diagram colours — brand tokens plus a muted, non-alarming blood tone. */
export const c = {
  forest: "var(--color-forest)",
  forestDeep: "var(--color-forest-deep)",
  sage: "var(--color-sage)",
  sageLight: "var(--color-sage-light)",
  mist: "var(--color-sage-mist)",
  gold: "var(--color-gold)",
  goldLight: "var(--color-gold-light)",
  paper: "var(--color-paper)",
  ivory: "var(--color-ivory)",
  line: "var(--color-line)",
  muted: "var(--color-muted)",
  blood: "#a8655a",
  bloodSoft: "#ecd9d3",
  bloodMid: "#d6aea4",
  inflamed: "#c98d80",
};

export type DiagramProps = { step: number };

/** Shared SVG text style */
export const label = {
  fontFamily: "var(--font-sans)",
  fontSize: 11,
  letterSpacing: "0.06em",
  fill: "var(--color-muted)",
} as const;

export const labelStrong = {
  ...label,
  fill: "var(--color-forest-deep)",
  fontWeight: 600,
} as const;
