"use client"

import { useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const SUN =
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
const MOON = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"

const noop = () => () => {}

/** Sun in dark mode, moon in light mode. Icon rotates 90° on switch. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // false during SSR / first paint, so the server markup never guesses the theme
  const mounted = useSyncExternalStore(noop, () => true, () => false)
  const dark = !mounted || resolvedTheme !== "light"
  // only animate after a click, not on first load
  const [spin, setSpin] = useState(false)

  function toggle() {
    const root = document.documentElement
    root.classList.add("theme-transition")
    setSpin(true)
    setTheme(dark ? "light" : "dark")
    window.setTimeout(() => root.classList.remove("theme-transition"), 250)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors md:size-10",
        "hover:border-border-hover hover:bg-surface-2 active:bg-pressed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <svg
        key={dark ? "sun" : "moon"}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn(spin && "animate-in spin-in-90 duration-200 ease-out motion-reduce:animate-none")}
      >
        <path d={dark ? SUN : MOON} />
      </svg>
    </button>
  )
}
