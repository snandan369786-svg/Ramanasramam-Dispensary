"use client";

import { useEffect } from "react";

/** Scrolls to the section named in the URL hash after arriving from another page. */
export function HashScroller() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}
