"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyAddressButton({
  text,
  label = "Copy address",
  copiedLabel = "Address copied",
  srLabel,
  compact = false,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  /** Accessible name when the visible label is generic (e.g. "Copy") */
  srLabel?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-[3px] border border-forest/30 font-medium tracking-[0.02em] text-forest transition-all duration-300 hover:border-forest hover:bg-forest/[0.04] ${compact ? "px-3.5 py-2 text-[0.8rem]" : "px-6 py-3.5 text-[0.86rem]"}`}
    >
      {copied ? (
        <Check aria-hidden className="h-4 w-4 text-gold" strokeWidth={1.8} />
      ) : (
        <Copy aria-hidden className="h-4 w-4" strokeWidth={1.6} />
      )}
      <span>{copied ? copiedLabel : label}</span>
      {srLabel && <span className="sr-only"> {srLabel}</span>}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${copiedLabel} to clipboard` : ""}
      </span>
    </button>
  );
}
