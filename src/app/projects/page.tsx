import type { Metadata } from "next"
import { ProjectFilter } from "@/components/project-filter"
import { SiteFooter } from "@/components/site-footer"
import { projects } from "@/content/projects"

export const metadata: Metadata = {
  title: "All Projects",
  description: "University work, client-style builds and experiments across Laravel, React and Node.js.",
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectFilter
        projects={projects}
        intro={
          <div className="flex max-w-[640px] flex-col gap-3">
            <span className="font-mono text-sm text-accent-text">~/projects</span>
            <h1 className="font-display text-[40px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[52px] lg:text-[64px]">
              All Projects
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              University work, client-style builds and experiments across Laravel, React and Node.js.
            </p>
          </div>
        }
      />
      <SiteFooter />
    </>
  )
}
