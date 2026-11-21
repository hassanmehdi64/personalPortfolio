import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BrowserFrame } from "@/components/browser-frame"
import { Gallery } from "@/components/gallery"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { SiteFooter } from "@/components/site-footer"
import { TechIcon } from "@/components/tech-icon"
import { Toc } from "@/components/toc"
import { caseStudies, getCaseStudy, tocItems } from "@/content/case-studies"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return {}
  return { title: cs.title, description: cs.summary }
}

const ring =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
const secKicker = "font-mono text-[13px] text-accent-text"
const secTitle = "font-display text-[26px] leading-[1.2] font-semibold tracking-[-0.025em] md:text-[32px]"
const body = "text-[17px] leading-[1.75] text-muted-foreground"
const box = "rounded-[14px] border border-border bg-card shadow-card"

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()
  const s = cs.sections
  const appName = cs.title.split(" — ")[0]

  return (
    <>
      <main id="main" className="flex-1">
        <header className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-[360px] left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.14),transparent)]"
          />
          <Reveal className="container-page relative flex flex-col gap-6 pt-8 pb-12 md:pt-14">
            <Link
              href="/projects"
              className={cn("inline-flex h-8 items-center gap-2 self-start rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground", ring)}
            >
              <Icon name="arrowLeft" size={16} />
              All projects
            </Link>
            <div className="flex max-w-[820px] flex-col gap-4">
              <span className="font-mono text-sm text-accent-text">{cs.kicker}</span>
              <h1 className="font-display text-[40px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[52px] lg:text-[64px]">
                {cs.title}
              </h1>
              <p className="text-[17px] leading-[1.6] text-muted-foreground md:text-xl">{cs.summary}</p>
            </div>
            <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
              {cs.tech.map((t) => (
                <li
                  key={t}
                  className="inline-flex h-7 items-center rounded-[8px] border border-border bg-surface-2 px-2.5 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
              <dl className="grid grid-cols-[repeat(2,minmax(0,auto))] gap-x-10 gap-y-4 md:grid-cols-[repeat(3,minmax(0,auto))]">
                {cs.meta.map((m) => (
                  <div key={m.k} className="flex flex-col gap-1">
                    <dt className="font-mono text-xs text-faint">{m.k}</dt>
                    <dd className="flex items-center gap-2 text-[15px] font-medium">
                      <span aria-hidden="true" className={cn("size-[7px] rounded-full", m.done ? "bg-primary" : "bg-border-hover")} />
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={cs.liveUrl}
                  className={cn(
                    "inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-primary-hover active:bg-primary-active",
                    ring
                  )}
                >
                  <Icon name="external" size={16} strokeWidth={1.75} />
                  Live Demo
                </a>
                <a
                  href={cs.repoUrl}
                  className={cn(
                    "inline-flex h-12 items-center gap-2 rounded-lg border border-border-strong bg-card px-5 text-[15px] font-semibold text-foreground transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-border-hover hover:bg-surface-2",
                    ring
                  )}
                >
                  <Icon name="github" size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </header>

        <div className="container-page">
          <Reveal className="rounded-[24px] border border-[rgba(16,185,129,0.25)] bg-shot p-2 shadow-[0_40px_120px_-48px_rgba(16,185,129,0.35)] md:p-4">
            <BrowserFrame
              src={cs.hero.image}
              url={cs.hero.url}
              alt={`${appName} search results screenshot`}
              priority
              sizes="(min-width: 1200px) 1088px, 100vw"
            />
          </Reveal>
        </div>

        <div className="container-page grid grid-cols-1 items-start gap-16 py-18 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-28">
          <div className="sticky top-[104px] hidden lg:block">
            <Toc items={tocItems} />
          </div>

          <article className="flex max-w-[760px] min-w-0 flex-col gap-18">
            <Reveal as="section" id="overview" className="flex flex-col gap-4">
              <span className={secKicker}>01 — Overview</span>
              <h2 className={secTitle}>{s.overview.title}</h2>
              <p className={body}>{s.overview.body}</p>
            </Reveal>

            <Reveal as="section" id="problem" className="flex flex-col gap-4">
              <span className={secKicker}>02 — Problem</span>
              <h2 className={secTitle}>{s.problem.title}</h2>
              <p className={body}>{s.problem.body}</p>
              <blockquote className={cn(box, "mt-2 px-6 py-5 font-display text-xl leading-[1.5] text-foreground")}>
                {s.problem.quote}
                <span className="mt-2 block font-sans text-sm text-faint">{s.problem.quoteCaption}</span>
              </blockquote>
            </Reveal>

            <Reveal as="section" id="solution" className="flex flex-col gap-4">
              <span className={secKicker}>03 — Solution</span>
              <h2 className={secTitle}>{s.solution.title}</h2>
              <p className={body}>{s.solution.body}</p>
              <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
                {s.solution.roles.map((r) => (
                  <div key={r.k} className={cn(box, "flex flex-col gap-1.5 p-5")}>
                    <span className="font-mono text-xs text-faint">{r.k}</span>
                    <span className="text-base font-semibold">{r.t}</span>
                    <span className="text-sm leading-[1.5] text-muted-foreground">{r.d}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal as="section" id="features" className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className={secKicker}>04 — Key features</span>
                <h2 className={secTitle}>{s.features.title}</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {s.features.items.map((f) => (
                  <div key={f.t} className="flex flex-col gap-3.5 rounded-xl border border-border bg-card p-6 shadow-card">
                    <span className="flex size-10 items-center justify-center rounded-md border border-tint-border bg-tint text-accent-text">
                      <Icon name={f.icon} size={20} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-base font-semibold">{f.t}</h3>
                      <p className="text-sm leading-[1.55] text-muted-foreground">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal as="section" id="stack" className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className={secKicker}>05 — Tech stack</span>
                <h2 className={secTitle}>{s.stack.title}</h2>
              </div>
              <ul className="overflow-hidden rounded-xl border border-border shadow-card">
                {s.stack.items.map((t) => (
                  <li
                    key={t.n}
                    className="group/chip grid grid-cols-1 items-center gap-x-6 gap-y-2 border-t border-border bg-card px-5 py-[18px] first:border-t-0 md:grid-cols-[220px_minmax(0,1fr)]"
                  >
                    <span className="flex items-center gap-3 text-[15px] font-semibold">
                      <TechIcon name={t.n} size={28} className="rounded-[7px]" />
                      {t.n}
                    </span>
                    <span className="text-sm text-muted-foreground">{t.d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section" id="learnings" className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className={secKicker}>06 — Challenges &amp; learnings</span>
                <h2 className={secTitle}>{s.learnings.title}</h2>
              </div>
              <div className="flex flex-col gap-3">
                {s.learnings.items.map((l) => (
                  <div
                    key={l.c}
                    className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl border border-border bg-card p-6 shadow-card md:grid-cols-2"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs text-business">CHALLENGE</span>
                      <span className="text-[15px] leading-[1.55]">{l.c}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs text-tint-text">LEARNING</span>
                      <span className="text-[15px] leading-[1.55] text-muted-foreground">{l.l}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </article>
        </div>

        <section aria-labelledby="gallery-title" className="container-page pb-18 lg:pb-28">
          <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className={secKicker}>{"// gallery"}</span>
              <h2 id="gallery-title" className={secTitle}>
                Screens
              </h2>
            </div>
            <span className="font-mono text-[13px] text-faint">{cs.gallery.length} screens · click to enlarge</span>
          </Reveal>
          <Gallery app={appName} shots={cs.gallery} />
        </section>

        <div className="container-page pb-18 lg:pb-28">
          <Reveal>
            <Link
              href={cs.next.href}
              className={cn(
                "group/next flex flex-col items-start justify-between gap-6 rounded-[24px] border border-border bg-card p-6 text-foreground shadow-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover md:flex-row md:items-center md:p-10",
                ring
              )}
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[13px] text-faint">Next project</span>
                <span className={secTitle}>{cs.next.title}</span>
                <span className="text-[15px] text-muted-foreground">{cs.next.desc}</span>
              </div>
              <span className="flex size-14 flex-none items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover/next:translate-x-1">
                <Icon name="arrowRight" size={22} strokeWidth={1.75} />
              </span>
            </Link>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
