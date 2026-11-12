import {
  Droplets,
  FlaskConical,
  HeartPulse,
  Microscope,
  Pill,
  Stethoscope,
  HandHeart,
  Smile,
  PersonStanding,
  Baby,
  type LucideProps,
} from "lucide-react";
import type { ServiceIcon } from "@/content/site";

const map = {
  consultation: Stethoscope,
  treatment: HandHeart,
  medicines: Pill,
  laboratory: Microscope,
  biochemistry: FlaskConical,
  electrolytes: Droplets,
  cardiology: HeartPulse,
  dentistry: Smile,
  physiotherapy: PersonStanding,
  pediatrics: Baby,
} satisfies Record<ServiceIcon, React.ComponentType<LucideProps>>;

export function ServiceGlyph({
  icon,
  ...props
}: { icon: ServiceIcon } & LucideProps) {
  const Icon = map[icon];
  return <Icon aria-hidden strokeWidth={1.25} {...props} />;
}
