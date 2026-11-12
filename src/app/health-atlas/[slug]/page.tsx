import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Siren,
  Sprout,
} from "lucide-react";
import {
  conditions,
  getCategory,
  getCondition,
  type Condition,
} from "@/content/health-atlas";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConditionGlyph } from "@/components/atlas/ConditionGlyph";
import { ConditionCard } from "@/components/atlas/ConditionCard";
import { ConditionToc, type TocItem } from "@/components/atlas/ConditionToc";
import { InsideTheBody } from "@/components/atlas/InsideTheBody";
import { MythFact } from "@/components/atlas/MythFact";
import { AtlasCta, AtlasDisclaimer } from "@/components/atlas/AtlasNotes";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return conditions.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCondition(slug);
  if (!c) return {};
  const title = `${c.name} — Health Atlas`;
  return {
    title,
    description: `${c.summary} Learn about causes, symptoms, diagnosis, treatment and prevention.`,
    alternates: { canonical: `/health-atlas/${c.slug}` },
    openGraph: { title, description: c.summary, url: `/health-atlas/${c.slug}`, type: "article" },
  };
}

/* ── Building blocks ─────────────────────────────────────────────────────── */

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-36 border-t border-line pt-12 lg:scroll-mt-28">
      <p className="font-serif text-sm italic text-sage">{String(index).padStart(2, "0")}</p>
      <h2 id={`${id}-title`} className="display mt-1 text-[2.1rem] text-forest-deep sm:text-[2.6rem]">
        {title}
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl text-[1.02rem] leading-[1.8] text-muted">{children}</p>;
}

function Bullets({ items, columns = true }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={`mt-6 grid gap-x-10 gap-y-3 ${columns ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink/85">
          <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-7 max-w-3xl border-l-2 border-gold/60 bg-paper py-3 pl-5 pr-4 text-[0.92rem] italic leading-relaxed text-muted">
      {children}
    </p>
  );
}

function sectionsFor(c: Condition): TocItem[] {
  return [
    { id: "overview", label: "Overview" },
    { id: "inside-the-body", label: c.understanding.diagram ? "Inside the Body" : "Understanding the Condition" },
    { id: "causes", label: "Causes & Risk Factors" },
    { id: "symptoms", label: "Signs & Symptoms" },
    { id: "diagnosis", label: "Diagnosis" },
    { id: "treatment", label: "Treatment & Management" },
    { id: "prevention", label: "Prevention & Healthy Living" },
    { id: "consult", label: "When to Consult a Doctor" },
    { id: "myths", label: "Myth vs Fact" },
    { id: "references", label: "References" },
  ];
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function ConditionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCondition(slug);
  if (!c) notFound();

  const category = getCategory(c.category);
  const toc = sectionsFor(c);
  const publishers = [...new Set(c.references.map((r) => r.publisher.replace(/ \(.*\)$/, "")))];
  const related = [
    ...conditions.filter((x) => x.slug !== c.slug && x.category === c.category),
    ...conditions.filter((x) => x.slug !== c.slug && x.category !== c.category),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${c.name} — Health Atlas`,
    url: `${site.url}/health-atlas/${c.slug}`,
    about: { "@type": "MedicalCondition", name: c.name, alternateName: c.aka },
    audience: "https://schema.org/Patient",
    publisher: { "@type": "MedicalClinic", name: site.name },
    citation: c.references.map((r) => r.url),
  };

  return (
    <>
      <Navbar variant="solid" />
      <main id="main" className="pt-[72px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <header className="grain border-b border-line pb-16 pt-12 sm:pb-20 sm:pt-16">
          <div className="container-page">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-muted">
                <li>
                  <Link href="/health-atlas" className="hover:text-forest">Health Atlas</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/health-atlas?category=${category.id}#conditions`} className="hover:text-forest">
                    {category.name}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-forest-deep">{c.name}</li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-5">
                  <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-paper text-forest sm:h-20 sm:w-20">
                    <ConditionGlyph icon={c.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                  <p className="eyebrow text-gold">{category.name}</p>
                </div>
                <h1 className="display mt-7 text-[2.8rem] text-forest-deep sm:text-6xl lg:text-[4.6rem]">
                  {c.name}
                </h1>
                {c.aka && (
                  <p className="mt-3 text-[0.95rem] text-muted">
                    Also known as <span className="italic">{c.aka.join(", ")}</span>
                  </p>
                )}
                <p className="mt-7 max-w-2xl font-serif text-[1.45rem] leading-snug text-forest-soft sm:text-[1.65rem]">
                  {c.summary}
                </p>
              </div>

            </div>
          </div>
        </header>

        {/* Body — a plain block wrapper so the mobile contents strip can stay sticky */}
        <div>
        <ConditionToc items={toc} variant="chips" />
        <div className="container-page grid gap-12 pb-24 pt-8 lg:grid-cols-12 lg:gap-14 lg:pt-16">
          <div className="hidden lg:col-span-3 lg:block">
            <ConditionToc items={toc} variant="rail" />
          </div>

          <article className="min-w-0 space-y-16 lg:col-span-9">
            <Section id="overview" index={1} title="Overview">
              <div className="max-w-3xl space-y-5">
                {c.overview.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-[1.12rem] leading-[1.8] text-ink/90" : "text-[1.02rem] leading-[1.8] text-muted"}>
                    {p}
                  </p>
                ))}
              </div>
            </Section>

            <Section id="inside-the-body" index={2} title={toc[1].label}>
              <Lead>{c.understanding.intro}</Lead>
              <div className="mt-8">
                {c.understanding.diagram ? (
                  <InsideTheBody diagram={c.understanding.diagram} steps={c.understanding.steps} conditionName={c.name} />
                ) : (
                  <ol className="relative grid gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                    {c.understanding.steps.map((s, i) => (
                      <li key={s.title} className="bg-paper p-7">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 font-serif text-base text-gold">
                          {i + 1}
                        </span>
                        <h3 className="mt-5 font-serif text-[1.35rem] leading-snug text-forest-deep">{s.title}</h3>
                        <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{s.text}</p>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </Section>

            <Section id="causes" index={3} title="Causes & Risk Factors">
              <Lead>{c.causes.intro}</Lead>
              <Bullets items={c.causes.items} />
            </Section>

            <Section id="symptoms" index={4} title="Signs & Symptoms">
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {c.symptoms.items.map((s) => (
                  <li key={s} className="flex items-start gap-3 rounded-[6px] border border-line bg-paper px-5 py-4 text-[0.95rem] leading-snug text-ink/85">
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-gold" />
                    {s}
                  </li>
                ))}
              </ul>
              {c.symptoms.note && <Note>{c.symptoms.note}</Note>}
              <p className="mt-5 max-w-3xl text-[0.82rem] leading-relaxed text-muted">
                These symptoms can have many causes. Having one or more of them does not mean you have this condition — a doctor can assess them properly.
              </p>
            </Section>

            <Section id="diagnosis" index={5} title="Diagnosis">
              <dl className="divide-y divide-line border-y border-line">
                {c.diagnosis.items.map((d) => (
                  <div key={d.title} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                    <dt className="font-serif text-[1.3rem] leading-snug text-forest-deep">{d.title}</dt>
                    <dd className="text-[0.96rem] leading-relaxed text-muted">{d.text}</dd>
                  </div>
                ))}
              </dl>
              {c.diagnosis.note && <Note>{c.diagnosis.note}</Note>}
            </Section>

            <Section id="treatment" index={6} title="Treatment & Management">
              <Lead>{c.treatment.intro}</Lead>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {c.treatment.items.map((t, i) => (
                  <li key={t.title} className="rounded-[6px] border border-line bg-paper p-6">
                    <p className="font-serif text-sm italic text-sage">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-serif text-[1.35rem] leading-snug text-forest-deep">{t.title}</h3>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{t.text}</p>
                  </li>
                ))}
              </ul>
              <Note>Treatment is always individual. Do not start, stop or change any medicine without advice from your doctor.</Note>
            </Section>

            <Section id="prevention" index={7} title="Prevention & Healthy Living">
              <div className="rounded-[6px] bg-sage-mist p-7 sm:p-9">
                <div className="flex items-center gap-3 text-forest">
                  <Sprout aria-hidden className="h-5 w-5" strokeWidth={1.4} />
                  <p className="text-[1rem] text-forest-deep">{c.prevention.intro}</p>
                </div>
                <Bullets items={c.prevention.items} />
              </div>
            </Section>

            <Section id="consult" index={8} title="When to Consult a Doctor">
              <div className={`grid gap-4 ${c.consult.emergency.length ? "md:grid-cols-2" : ""}`}>
                {c.consult.emergency.length > 0 && (
                  <div className="rounded-[6px] bg-forest-deep p-7 text-ivory sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-gold-light">
                        <Siren aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <h3 className="font-serif text-[1.45rem] leading-tight">Seek emergency care if</h3>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {c.consult.emergency.map((e) => (
                        <li key={e} className="flex gap-3 text-[0.95rem] leading-relaxed text-ivory/85">
                          <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-light" />
                          {e}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t border-ivory/15 pt-5 text-[0.88rem] font-medium text-gold-light">
                      Call 108 (ambulance) or 112, or go to the nearest hospital emergency department.
                    </p>
                  </div>
                )}
                <div className="flex flex-col rounded-[6px] border border-line bg-paper p-7 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage/50 text-forest">
                      <CalendarCheck aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="font-serif text-[1.45rem] leading-tight text-forest-deep">See a doctor if</h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {c.consult.routine.map((r) => (
                      <li key={r} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/85">
                        <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#visit"
                    scroll={false}
                    className="group mt-auto inline-flex items-center gap-2 pt-7 text-[0.86rem] font-medium text-forest"
                  >
                    Visit the dispensary — consultations are free
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.6} />
                  </Link>
                </div>
              </div>
            </Section>

            <Section id="myths" index={9} title="Myth vs Fact">
              <Lead>Choose “myth” or “fact” for each statement to reveal the answer.</Lead>
              <div className="mt-8">
                <MythFact items={c.myths} className="md:grid-cols-2 xl:grid-cols-3" />
              </div>
            </Section>

            <Section id="references" index={10} title="References">
              <p className="mb-6 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
                <span className="eyebrow mr-2 text-[0.64rem] text-gold">Sources</span>
                {publishers.join(" · ")}
              </p>
              <ol className="space-y-px overflow-hidden rounded-[6px] border border-line bg-line">
                {c.references.map((r, i) => (
                  <li key={r.url} className="bg-paper">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-5 px-6 py-5 transition-colors hover:bg-ivory"
                    >
                      <span className="font-serif text-sm italic text-sage">{i + 1}.</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.98rem] text-forest-deep group-hover:underline group-hover:decoration-gold/60 group-hover:underline-offset-4">
                          {r.title}
                        </span>
                        <span className="mt-0.5 block text-[0.82rem] text-muted">
                          {r.publisher} · {new URL(r.url).hostname.replace(/^www\./, "")}
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ol>
            </Section>

            <AtlasDisclaimer />
          </article>
        </div>
        </div>

        {/* Related */}
        <section aria-labelledby="related-title" className="border-t border-line bg-paper py-20 sm:py-24">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 id="related-title" className="display text-[2.1rem] text-forest-deep sm:text-[2.6rem]">
                Continue <em className="text-forest-soft">exploring</em>
              </h2>
              <Link href="/health-atlas" className="group inline-flex items-center gap-2 text-sm font-medium text-forest">
                <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.6} />
                All conditions
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ConditionCard condition={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AtlasCta />
      </main>
      <Footer />
    </>
  );
}
