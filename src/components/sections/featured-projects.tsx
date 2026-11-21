import Link from "next/link"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { FeatureProjectCard } from "@/components/project-card"
import { featuredProjects } from "@/content/projects"
import { cn } from "@/lib/utils"
import { focusRing, h2Big, kicker } from "./styles"

export function FeaturedProjects() {
  return (
    <section id="projects" aria-labelledby="proj-title" className="border-t border-border bg-band">
      <div className="container-page section-py">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <span className={kicker}>{"// selected work"}</span>
            <h2 id="proj-title" className={h2Big}>
              Selected Work
            </h2>
          </div>
          <Link
            href="/projects"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-accent-text transition-[gap] hover:gap-3",
              focusRing
            )}
          >
            View all projects
            <Icon name="arrowRight" size={16} strokeWidth={1.75} />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featuredProjects.map((p, k) => (
            <Reveal key={p.slug} index={k} className={cn("flex", k === 0 && "md:col-span-2")}>
              <FeatureProjectCard project={p} featured={k === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
