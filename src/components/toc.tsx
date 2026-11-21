"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/** Sticky "On this page" nav; the current section follows the scroll. */
export function Toc({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState<string>(items[0]?.id)

  useEffect(() => {
    const visible = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        const first = items.find((i) => visible.get(i.id))
        if (first) setActive(first.id)
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    items.forEach((i) => {
      const el = document.getElementById(i.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className="flex flex-col gap-1">
      <span className="mb-2 font-mono text-xs tracking-[0.08em] text-faint">ON THIS PAGE</span>
      {items.map((i) => {
        const on = i.id === active
        return (
          <a
            key={i.id}
            href={`#${i.id}`}
            aria-current={on ? "true" : undefined}
            className={cn(
              "flex h-9 items-center border-l-2 pl-3.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary",
              on ? "border-primary font-semibold text-foreground" : "border-mono-bg text-muted-foreground hover:text-foreground"
            )}
          >
            {i.label}
          </a>
        )
      })}
    </nav>
  )
}
