"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Icon } from "@/components/icons"
import { ProjectCard } from "@/components/project-card"
import { Reveal } from "@/components/reveal"
import { projectFilters, type Project, type ProjectFilter as Filter } from "@/content/projects"
import { cn } from "@/lib/utils"

function matches(p: Project, filter: Filter, q: string) {
  const inCat = filter === "All" || p.cats.includes(filter)
  const inText = !q || `${p.title} ${p.tech.join(" ")}`.toLowerCase().includes(q)
  return inCat && inText
}

export function ProjectFilter({ projects, intro }: { projects: Project[]; intro: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>("All")
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const q = query.trim().toLowerCase()

  const shown = useMemo(() => projects.filter((p) => matches(p, filter, q)), [projects, filter, q])

  // ⌘K / Ctrl+K focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const reset = () => {
    setFilter("All")
    setQuery("")
  }

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="bg-dots absolute inset-0 bg-size-[24px_24px] mask-[radial-gradient(ellipse_70%_90%_at_30%_0%,#000_20%,transparent_100%)]"
        />
        <div className="container-page relative flex flex-col gap-5 pt-8 pb-12 md:pt-14">
          <Link
            href="/"
            className="inline-flex h-8 items-center gap-2 self-start rounded-sm text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon name="arrowLeft" size={16} />
            Back home
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-5">
            {intro}
            <span className="inline-flex h-8 items-center gap-2 rounded-full border border-border-strong px-3 font-mono text-[13px] text-muted-foreground">
              <span className="text-foreground">{String(shown.length).padStart(2, "0")}</span> projects
            </span>
          </div>
        </div>
      </header>

      <main id="main" className="container-page flex-1 pt-8 pb-18 lg:pb-30">
      <div className="mb-8 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
        <div className="relative w-full flex-none lg:w-[360px]">
          <label htmlFor="proj-search" className="sr-only">
            Search projects
          </label>
          <Icon name="search" className="pointer-events-none absolute top-[15px] left-3.5 text-faint" />
          <input
            ref={searchRef}
            id="proj-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tech…"
            className="h-12 w-full rounded-lg border border-border-strong bg-card pr-16 pl-11 text-[15px] text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-faint hover:border-border-hover focus:border-primary focus:shadow-[0_0_0_3px_rgba(16,185,129,0.25)] [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd
            aria-hidden="true"
            className="pointer-events-none absolute top-3 right-2.5 inline-flex h-6 items-center rounded-sm border border-border-strong px-[7px] font-mono text-[11px] text-faint"
          >
            ⌘K
          </kbd>
        </div>
        <div
          role="group"
          aria-label="Filter by technology"
          className="-mx-5 flex min-w-0 flex-nowrap gap-2 overflow-x-auto px-5 pb-0.5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {projectFilters.map((label) => {
            const on = label === filter
            const count = label === "All" ? projects.length : projects.filter((p) => p.cats.includes(label)).length
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(label)}
                className={cn(
                  "inline-flex h-11 flex-none items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border-strong bg-card text-ghost hover:border-border-hover hover:bg-surface-2 hover:text-foreground"
                )}
              >
                {label}
                <span className={cn("font-mono text-[11px]", on ? "text-[#064E3B]" : "text-faint")}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown
      </p>

      {shown.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, k) => (
            <Reveal as="li" key={p.slug} index={k} className="flex">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border-strong bg-shot bg-[radial-gradient(var(--dot)_1px,transparent_1px)] bg-size-[20px_20px] px-5 py-12 text-center md:px-10 md:py-24">
          <div className="flex size-16 items-center justify-center rounded-xl border border-border-strong bg-card text-faint">
            <Icon name="searchMinus" size={28} />
          </div>
          <div className="flex max-w-[420px] flex-col gap-2">
            <span className="font-mono text-[13px] text-faint">0 results for &quot;{query.trim() || filter}&quot;</span>
            <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em]">No projects match this filter</h2>
            <p className="text-base text-muted-foreground">
              Try a different technology or clear your search to see all {projects.length} projects.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong bg-card px-[18px] text-sm font-semibold text-foreground transition-colors outline-none hover:border-border-hover hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon name="reset" size={15} />
            Clear filters
          </button>
        </div>
      )}
      </main>
    </>
  )
}
