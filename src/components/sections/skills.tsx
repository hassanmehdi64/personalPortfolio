import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { SkillChip } from "@/components/skill-chip"
import { skillGroups } from "@/content/home"
import { cn } from "@/lib/utils"
import { card, h2, kicker, lead } from "./styles"

const spanLg = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" } as const
const spanMd = { 1: "md:col-span-1", 2: "md:col-span-2" } as const

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-y border-border bg-band">
      <div className="container-page section-py">
        <Reveal className="mb-12 flex flex-col gap-4">
          <span className={kicker}>{"// skills"}</span>
          <h2 id="skills-title" className={h2}>
            Tech I work with
          </h2>
          <p className={cn(lead, "max-w-[560px]")}>
            The stack I use to take an idea from requirements to a deployed product.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, k) => (
            <Reveal
              key={g.title}
              index={k}
              className={cn(card, "flex flex-col gap-5 p-7", spanMd[g.span.md], spanLg[g.span.lg])}
            >
              <div className="flex items-center gap-3.5">
                <span className="flex size-10 flex-none items-center justify-center rounded-md border border-tint-border bg-tint text-accent-text">
                  <Icon name={g.icon} size={20} />
                </span>
                <div className="flex min-w-0 flex-col leading-[1.3]">
                  <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                  <span className="text-sm text-muted-foreground">{g.desc}</span>
                </div>
                <span className="ml-auto font-mono text-xs text-faint">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
                {g.items.map((it) => (
                  <li key={it} className="flex">
                    <SkillChip name={it} plain={g.plain} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
