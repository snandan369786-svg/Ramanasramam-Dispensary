import {
  Bean,
  Bone,
  Brain,
  Droplet,
  Droplets,
  Flame,
  Gauge,
  HeartPulse,
  Scale,
  Wind,
  type LucideProps,
} from "lucide-react";
import type { ConditionIcon } from "@/content/health-atlas";

/** Thyroid gland: two lobes joined by an isthmus, drawn in Lucide's style. */
function Thyroid({ strokeWidth = 1.25, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v4" />
      <path d="M10.5 13.5c.5.6 2.5.6 3 0" />
      <path d="M10.5 13.5C10 8 8.5 5 6.5 5S3.5 8 4 13.5 6.5 21 8.5 20.5s2.5-3 2-7Z" />
      <path d="M13.5 13.5C14 8 15.5 5 17.5 5s3 3 2.5 8.5-2.5 7.5-4.5 7-2.5-3-2-7Z" />
    </svg>
  );
}

const map = {
  glucose: Droplet,
  pressure: Gauge,
  weight: Scale,
  heart: HeartPulse,
  airway: Wind,
  blood: Droplets,
  joint: Bone,
  kidney: Bean,
  thyroid: Thyroid,
  brain: Brain,
  reflux: Flame,
} satisfies Record<ConditionIcon, React.ComponentType<LucideProps>>;

export function ConditionGlyph({
  icon,
  ...props
}: { icon: ConditionIcon } & LucideProps) {
  const Icon = map[icon];
  return <Icon aria-hidden strokeWidth={1.25} {...props} />;
}
