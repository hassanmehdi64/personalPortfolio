"use client"

import { useEffect, useReducer } from "react"
import { useReducedMotion } from "motion/react"

type State = { i: number; n: number; del: boolean; hold: number }

/**
 * Same timing as design/Main.dc.html tick(): 85ms per step,
 * holds after typing (24 ticks) and before the next word (3 ticks).
 */
function step(roles: string[]) {
  return (s: State): State => {
    const r = roles[s.i]
    if (s.hold > 0) return { ...s, hold: s.hold - 1 }
    if (!s.del) return s.n < r.length ? { ...s, n: s.n + 1 } : { ...s, del: true, hold: 24 }
    return s.n > 0 ? { ...s, n: s.n - 1 } : { i: (s.i + 1) % roles.length, n: 0, del: false, hold: 3 }
  }
}

export function Typewriter({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion()
  const [s, tick] = useReducer(step(roles), { i: 0, n: roles[0].length, del: false, hold: 26 })

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(tick, 85)
    return () => window.clearInterval(t)
  }, [reduce])

  const text = reduce ? roles[0] : roles[s.i].slice(0, s.n)

  return (
    <div className="flex h-8 items-center gap-0.5 font-mono text-base text-foreground md:text-lg">
      <span className="mr-2.5 text-faint" aria-hidden="true">
        &gt;
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="animate-caret ml-[3px] h-[22px] w-2.5 rounded-[2px] bg-primary" />
    </div>
  )
}
