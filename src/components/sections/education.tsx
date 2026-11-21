import Link from "next/link"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { education, workshops } from "@/content/home"
import { cn } from "@/lib/utils"
import { card, focusRing, h2, kicker } from "./styles"

export function Education() {
  return (
    <section aria-labelledby="edu-title" className="container-page section-py">
      <Reveal className="mb-12 flex flex-col gap-4">
        <span className={kicker}>{"// education"}</span>
        <h2 id="edu-title" className={h2}>
          Education &amp; achievements
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className={cn(card, "flex flex-col gap-5 rounded-2xl p-6 md:p-8")}>
          <div className="flex items-center justify-between gap-3">
            <span className="flex size-12 items-center justify-center rounded-lg border border-tint-border bg-tint text-accent-text">
              <Icon name="cap" size={24} />
            </span>
            <span className="font-mono text-[13px] text-faint">{education.years}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-2xl leading-8 font-semibold">{education.degree}</h3>
            <span className="text-base text-muted-foreground">{education.school}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <span className="block font-mono text-xs text-faint">CGPA</span>
              <span className="font-display text-2xl font-semibold">
                {education.cgpa}
                <span className="text-[15px] text-muted-foreground"> / {education.cgpaOf}</span>
              </span>
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <span className="block font-mono text-xs text-faint">Final Year Project</span>
              <Link
                href={education.fyp.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-sm font-display text-xl leading-9 font-semibold text-accent-text transition-[gap] hover:gap-2.5",
                  focusRing
                )}
              >
                {education.fyp.title}
                <Icon name="arrowUpRight" size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.08em] text-faint">WORKSHOPS</span>
          <ul className="flex flex-col gap-3">
            {workshops.map((w, k) => (
              <Reveal as="li" key={w.title} index={k} className={cn(card, "flex items-center gap-4 p-5")}>
                <span className="inline-flex h-[30px] flex-none items-center rounded-[8px] border border-tint-border bg-tint px-2.5 font-mono text-[13px] font-medium text-tint-text">
                  {w.year}
                </span>
                <div className="flex min-w-0 flex-col leading-[1.4]">
                  <span className="text-base font-semibold">{w.title}</span>
                  <span className="text-sm text-muted-foreground">{w.org}</span>
                </div>
                <Icon name="award" size={20} className="ml-auto flex-none text-faint" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
