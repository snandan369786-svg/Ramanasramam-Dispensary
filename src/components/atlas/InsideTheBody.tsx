"use client";

import { useId, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DiagramId, Step } from "@/content/health-atlas";
import { DiabetesDiagram } from "./diagrams/DiabetesDiagram";
import { HypertensionDiagram } from "./diagrams/HypertensionDiagram";
import { ObesityDiagram } from "./diagrams/ObesityDiagram";
import { AsthmaDiagram } from "./diagrams/AsthmaDiagram";

const diagrams = {
  diabetes: DiabetesDiagram,
  hypertension: HypertensionDiagram,
  obesity: ObesityDiagram,
  asthma: AsthmaDiagram,
} satisfies Record<DiagramId, React.ComponentType<{ step: number }>>;

/** Step-by-step interactive explanation with a labelled diagram. */
export function InsideTheBody({
  diagram,
  steps,
  conditionName,
}: {
  diagram: DiagramId;
  steps: Step[];
  conditionName: string;
}) {
  const [step, setStep] = useState(0);
  const id = useId();
  const Diagram = diagrams[diagram];
  const current = steps[step];

  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-paper">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* Diagram plate */}
        <div className="relative border-b border-line bg-ivory p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <p className="font-serif text-sm italic text-sage">Inside the body</p>
            <p className="eyebrow text-[0.6rem] text-gold">
              Step {step + 1} of {steps.length}
            </p>
          </div>
          <div
            role="img"
            aria-label={`Diagram of ${conditionName}, step ${step + 1}: ${current.title}. ${current.text}`}
            className="mx-auto mt-4 aspect-[400/320] w-full max-w-[560px]"
          >
            <Diagram step={step} />
          </div>
          <p className="mt-3 text-center text-[0.72rem] text-muted">
            Simplified illustration — not to scale.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col p-5 sm:p-8">
          <ol className="space-y-2" aria-label="Steps">
            {steps.map((s, i) => {
              const active = i === step;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={active ? "step" : undefined}
                    aria-controls={`${id}-text`}
                    className={`flex w-full items-start gap-4 rounded-[4px] px-3 py-3 text-left transition-colors duration-300 ${
                      active ? "bg-sage-mist" : "hover:bg-ivory"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.75rem] font-semibold transition-colors ${
                        active
                          ? "border-forest bg-forest text-ivory"
                          : i < step
                            ? "border-gold/60 text-gold"
                            : "border-line text-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-serif text-[1.2rem] leading-snug ${active ? "text-forest-deep" : "text-forest/80"}`}>
                        {s.title}
                      </span>
                      {active && (
                        <span id={`${id}-text`} aria-live="polite" className="fade-up mt-1.5 block text-[0.92rem] leading-relaxed text-muted">
                          {s.text}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-[3px] border border-forest/25 px-4 py-2.5 text-[0.82rem] font-medium text-forest transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.6} />
              Previous
            </button>
            <div aria-hidden className="flex gap-1.5">
              {steps.map((s, i) => (
                <span key={s.title} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? "w-6 bg-gold" : "w-1.5 bg-line"}`} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="inline-flex items-center gap-2 rounded-[3px] bg-forest px-4 py-2.5 text-[0.82rem] font-medium text-ivory transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
