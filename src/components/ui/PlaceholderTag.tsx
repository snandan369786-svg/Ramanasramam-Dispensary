/** A small, unmistakable label marking content that still needs to be supplied. */
export function PlaceholderTag({
  children = "Placeholder — to be updated",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] border border-dashed border-gold/60 bg-gold/[0.06] px-2 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-gold ${className}`}
    >
      <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
      {children}
    </span>
  );
}
