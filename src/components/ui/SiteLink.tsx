"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

/**
 * Internal link that understands home-page section anchors ("/#about").
 *  - On the home page, it becomes a plain in-page anchor ("#about") so the
 *    browser scrolls smoothly to the section.
 *  - On other pages, it navigates to the home page without Next's own
 *    scroll handling; <HashScroller /> on the home page then jumps to the
 *    section once it has rendered.
 */
export function SiteLink({
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const pathname = usePathname();
  if (href.startsWith("/#")) {
    if (pathname === "/") return <a href={href.slice(1)} {...props} />;
    return <Link href={href} scroll={false} {...props} />;
  }
  return <Link href={href} {...props} />;
}
