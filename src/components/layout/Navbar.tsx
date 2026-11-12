"use client";

import { useEffect, useState } from "react";
import { SiteLink } from "@/components/ui/SiteLink";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks, site, visitingHours } from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";

/**
 * `overlay` — transparent over a dark hero until scrolled (home page).
 * `solid`   — always on an ivory background (inner pages).
 */
export function Navbar({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Inner pages highlight their top-level section (e.g. /health-atlas/asthma → /health-atlas)
  const [active, setActive] = useState(
    pathname === "/"
      ? "/#home"
      : (navLinks.find((l) => !l.href.startsWith("/#") && pathname.startsWith(l.href))?.href ?? pathname),
  );

  // Solid background once the hero has been scrolled past a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page, highlight the section currently in view
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navLinks
      .filter((l) => l.href.startsWith("/#"))
      .map((l) => document.getElementById(l.href.slice(2)))
      .filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`/#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Lock scroll and support Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = variant === "solid" || scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-line/80 bg-ivory/92 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-forest-deep/50 to-transparent"
        }`}
      >
        <SiteLink
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </SiteLink>

        <nav
          aria-label="Primary"
          className={`container-page flex items-center justify-between transition-all duration-500 ${solid ? "h-[72px]" : "h-[84px]"}`}
        >
          <SiteLink
            href="/#home"
            className={`flex shrink-0 items-center gap-3 whitespace-nowrap transition-colors ${solid ? "text-forest" : "text-ivory"}`}
            onClick={() => setOpen(false)}
          >
            <Emblem className="h-12 sm:h-14" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[0.98rem] font-semibold uppercase tracking-[0.12em] sm:text-[1.08rem]">
                Sri Ramanasramam
              </span>
              <span
                className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] sm:text-[0.64rem] ${solid ? "text-gold" : "text-gold-light"}`}
              >
                Dispensary
              </span>
            </span>
            <span className="sr-only">{site.name} — Home</span>
          </SiteLink>

          <div className="ml-6 hidden items-center gap-1 xl:flex">
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <SiteLink
                      href={link.href}
                      aria-current={
                        isActive
                          ? link.href.startsWith("/#")
                            ? "location"
                            : "page"
                          : undefined
                      }
                      className={`relative whitespace-nowrap px-2 py-2 text-[0.84rem] tracking-[0.01em] transition-colors 2xl:px-4 ${
                        solid
                          ? isActive
                            ? "text-forest-deep"
                            : "text-muted hover:text-forest-deep"
                          : isActive
                            ? "text-ivory"
                            : "text-ivory/75 hover:text-ivory"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-2 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 2xl:inset-x-4 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors xl:hidden ${solid ? "text-forest hover:bg-forest/5" : "text-ivory hover:bg-ivory/10"}`}
          >
            {open ? (
              <X strokeWidth={1.4} className="h-6 w-6" />
            ) : (
              <Menu strokeWidth={1.4} className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu — rendered outside <header> because its backdrop-filter
          would otherwise become the containing block for this fixed panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-ivory xl:hidden"
      >
        <div className="container-page flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-line">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="fade-up border-b border-line"
                style={{ "--delay": `${i * 45}ms` } as React.CSSProperties}
              >
                <SiteLink
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-[1.9rem] text-forest-deep"
                >
                  {link.label}
                  <ArrowRight
                    strokeWidth={1.2}
                    className="h-5 w-5 text-gold"
                    aria-hidden
                  />
                </SiteLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <p className="eyebrow text-gold">Visiting hours</p>
            <p className="mt-2 text-muted">
              Monday – Saturday · {visitingHours.time}
            </p>
            <SiteLink
              href="/#visit"
              onClick={() => setOpen(false)}
              className="mt-6 flex w-full items-center justify-center rounded-[3px] bg-forest px-6 py-4 text-sm font-medium text-ivory"
            >
              Visit the Dispensary
            </SiteLink>
          </div>
        </div>
      </div>
    </>
  );
}
