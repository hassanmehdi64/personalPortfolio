import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { jobs } from "@/content/home"
import { cn } from "@/lib/utils"
import { card, h2, kicker, lead } from "./styles"

const kinds = {
  dev: {
    label: "Development",
    dot: "border-ring",
    bullet: "bg-ring",
    badge: "border-tint-border bg-tint text-tint-text",
  },
  business: {
    label: "Business & Client Management",
    dot: "border-warning",
    bullet: "bg-warning",
    badge: "border-business-border bg-business-bg text-business",
  },
} as const

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="container-page section-py">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-4">
          <span className={kicker}>{"// experience"}</span>
          <h2 id="exp-title" className={h2}>
            Where I&apos;ve worked
          </h2>
          <p className={lead}>
            Three roles across software and business, each one adding to how I build and how I work with people.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-2.5 rounded-full border-2 border-ring" />
              Development
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-2.5 rounded-full border-2 border-warning" />
              Business
            </span>
          </div>
        </Reveal>

        <div className="relative">
          <div aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-border-strong" />
          <ol className="flex flex-col gap-5">
            {jobs.map((j, k) => {
              const kind = kinds[j.kind]
              return (
                <Reveal as="li" key={j.role} index={k} className="relative pl-8 md:pl-11">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-[30px] left-0 size-[15px] rounded-full border-2 bg-background shadow-[0_0_0_4px_var(--background)]",
                      kind.dot
                    )}
                  />
                  <div className={cn(card, "p-5 md:p-7")}>
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-xl leading-7 font-semibold">{j.role}</h3>
                        <span className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                          <Icon name="briefcase" size={15} />
                          {j.company}
                        </span>
                      </div>
                      <span className="pt-1 font-mono text-[13px] text-faint">{j.dates}</span>
                    </div>
                    <ul className="mt-[18px] flex flex-col gap-2.5">
                      {j.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[15px] leading-6 text-muted-foreground">
                          <span aria-hidden="true" className={cn("mt-2.5 size-[5px] flex-none rounded-[2px]", kind.bullet)} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-medium",
                          kind.badge
                        )}
                      >
                        {kind.label}
                      </span>
                      {j.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex h-7 items-center rounded-[8px] border border-border bg-surface-2 px-2.5 font-mono text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
