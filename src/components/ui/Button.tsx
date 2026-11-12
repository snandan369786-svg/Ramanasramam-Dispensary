import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "text";

const styles: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory hover:bg-forest-deep border border-forest hover:border-forest-deep",
  secondary:
    "bg-transparent text-forest border border-forest/30 hover:border-forest hover:bg-forest/[0.04]",
  light:
    "bg-ivory text-forest-deep border border-ivory hover:bg-white hover:border-white",
  "outline-light":
    "bg-transparent text-ivory border border-ivory/45 hover:border-ivory hover:bg-ivory/10",
  text: "text-forest underline-offset-[6px] decoration-gold/60 hover:underline px-0! py-0! border-0",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-[3px] px-6 py-3.5 text-[0.86rem] font-medium tracking-[0.02em] transition-all duration-300 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </a>
  );
}
