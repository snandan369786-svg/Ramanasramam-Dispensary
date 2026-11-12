"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Google Maps embed behind a lightweight click-to-load facade.
 * Keeps the page fast (no third-party scripts until requested) and
 * respects visitors' privacy. Replace `src` with an official
 * Google Maps "Embed a map" URL if preferred.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-sage-mist sm:aspect-[16/9] lg:aspect-[21/9]">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex w-full flex-col items-center justify-center gap-4 text-forest"
          aria-label="Load interactive Google Map"
        >
          {/* Stylised map texture */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full text-sage/30"
            preserveAspectRatio="none"
            viewBox="0 0 800 340"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M0 220C140 200 220 250 360 210s260-90 440-60"
              strokeWidth="10"
            />
            <path
              d="M0 90c120 30 260-10 380 30s300 40 420 10"
              strokeWidth="3"
            />
            <path
              d="M300 0c-10 90 30 200 0 340M560 0c20 120-30 220 10 340"
              strokeWidth="3"
            />
            <path
              d="M120 0v340M700 0c-30 110 10 230-10 340"
              strokeWidth="1.5"
            />
          </svg>
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_10px_30px_-10px_rgba(19,40,32,0.6)] transition-transform duration-500 group-hover:-translate-y-1">
            <MapPin strokeWidth={1.4} className="h-7 w-7" aria-hidden />
          </span>
          <span className="relative rounded-[3px] bg-paper/90 px-4 py-2 text-sm font-medium backdrop-blur">
            View interactive map
          </span>
          <span className="relative text-xs text-muted">Loads Google Maps</span>
        </button>
      )}
    </div>
  );
}
