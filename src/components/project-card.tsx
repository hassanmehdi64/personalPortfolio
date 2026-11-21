import Link from "next/link"
import { BrowserFrame } from "@/components/browser-frame"
import { Icon } from "@/components/icons"
import { projectHref, type Project } from "@/content/projects"
import { cn } from "@/lib/utils"
import { focusRing, monoTag } from "@/components/sections/styles"

/** Hover: lift −4px, border emerald/40, soft glow, screenshot scales 1.03. */
const hoverCard =
  "group/card relative w-full overflow-hidden rounded-2xl border bg-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover focus-within:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"

const zoom =
  "transition-transform duration-300 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"

/** Title link covers the whole card; buttons sit above it. */
const stretched = "after:absolute after:inset-0 after:z-0 after:content-['']"

function iconBtn(extra?: string) {
  return cn(
    "relative z-10 flex size-11 flex-none items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:border-border-hover hover:bg-surface-2",
    focusRing,
    extra
  )
}

/** Card used on the home page "Selected Work" section. */
export function FeatureProjectCard({ project: p, featured }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={cn(
        hoverCard,
        "grid grid-cols-1",
        featured
          ? "border-tint-border shadow-card-hover md:col-span-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] dark:border-[rgba(16,185,129,0.35)]"
          : "border-border shadow-card"
      )}
    >
      <div className="bg-shot p-3">
        <div className={cn("overflow-hidden rounded-lg", zoom)}>
          <BrowserFrame
            src={p.image}
            url={p.url}
            alt={`${p.title} interface screenshot`}
            chrome={p.chrome}
            sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col justify-center gap-4",
          featured ? "px-5 pt-5 pb-6 md:px-7 md:pt-6 md:pb-7 lg:px-9 lg:py-8" : "px-5 pt-5 pb-6 md:px-7 md:pt-6 md:pb-7"
        )}
      >
        <span className="font-mono text-xs text-faint">{p.kicker}</span>
        <h3
          className={cn(
            "font-display leading-[1.2] font-semibold tracking-[-0.02em]",
            featured ? "text-[22px] md:text-[28px] lg:text-[32px]" : "text-[22px]"
          )}
        >
          <Link href={projectHref(p)} className={cn("rounded-sm text-foreground", stretched, focusRing)}>
            {p.title}
          </Link>
        </h3>
        <p className="text-[15px] leading-[1.6] text-muted-foreground">{p.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t} className={monoTag}>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-1 flex items-center gap-2 border-t border-border pt-4">
          <StatusPill status={p.status} />
          <a
            href={p.liveUrl}
            className={cn(
              "relative z-10 ml-auto inline-flex h-11 items-center gap-1.5 rounded-md border border-border-strong px-3 text-[13px] font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface-2 md:h-10",
              focusRing
            )}
          >
            <Icon name="external" size={14} />
            Live Demo
          </a>
          <a href={p.repoUrl} aria-label={`${p.title} on GitHub`} className={iconBtn("md:size-10")}>
            <Icon name="github" size={16} />
          </a>
        </div>
      </div>
    </article>
  )
}

/** Card used on /projects. */
export function ProjectCard({ project: p }: { project: Project }) {
  const href = p.hasCaseStudy ? projectHref(p) : undefined
  return (
    <article className={cn(hoverCard, "flex h-full flex-col border-border shadow-card")}>
      <div className="bg-shot p-3">
        <div className={cn("overflow-hidden rounded-lg", zoom)}>
          <BrowserFrame
            src={p.image}
            url={p.url}
            alt={`${p.title} interface screenshot`}
            chrome={p.chrome}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 px-6 pt-5 pb-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-faint">{p.kickerShort}</span>
          <StatusPill status={p.status} small />
        </div>
        <h2 className="font-display text-[22px] leading-[1.25] font-semibold tracking-[-0.02em]">
          {href ? (
            <Link href={href} className={cn("rounded-sm text-foreground", stretched, focusRing)}>
              {p.title}
            </Link>
          ) : (
            p.title
          )}
        </h2>
        <p className="text-[15px] leading-[1.6] text-muted-foreground">{p.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t} className={monoTag}>
              {t}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-border pt-4">
          {href ? (
            <Link
              href={href}
              className={cn(
                "relative z-10 inline-flex h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-accent-text transition-[gap] hover:gap-2.5",
                focusRing
              )}
            >
              Case study
              <Icon name="arrowRight" size={15} strokeWidth={1.75} />
            </Link>
          ) : (
            <span className="inline-flex h-11 items-center text-sm font-medium text-faint">Case study soon</span>
          )}
          <a href={p.liveUrl} aria-label={`${p.title} live demo`} className={iconBtn("ml-auto")}>
            <Icon name="external" size={16} />
          </a>
          <a href={p.repoUrl} aria-label={`${p.title} on GitHub`} className={iconBtn()}>
            <Icon name="github" size={16} />
          </a>
        </div>
      </div>
    </article>
  )
}

export function StatusPill({ status, small }: { status: Project["status"]; small?: boolean }) {
  const done = status === "Completed"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 text-xs font-medium",
        small ? "h-6 px-[9px]" : "h-7",
        done ? "bg-tint text-tint-text" : "bg-business-bg text-business"
      )}
    >
      {small ? (
        <span aria-hidden="true" className={cn("size-1.5 rounded-full", done ? "bg-primary" : "bg-warning")} />
      ) : (
        <Icon name={done ? "check" : "spinner"} size={12} strokeWidth={2} />
      )}
      {status}
    </span>
  )
}
