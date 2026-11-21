"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { Icon } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { navLinks, site, socials, type NavId } from "@/content/site"
import { cn } from "@/lib/utils"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"

/** Which home section is in view (IntersectionObserver). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<NavId | null>(null)
  useEffect(() => {
    if (!enabled) return
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el)
    const visible = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        const first = navLinks.find((l) => visible.get(l.id))
        setActive(first ? first.id : null)
      },
      // a section is "active" when it crosses the band 35–40% from the top
      { rootMargin: "-35% 0px -60% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return enabled ? active : null
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const sectionActive = useActiveSection(isHome)
  const active: NavId | null = pathname.startsWith("/projects") ? "projects" : sectionActive
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-200 print:hidden",
        scrolled || open
          ? "border-border bg-nav backdrop-blur-[14px] backdrop-saturate-[1.4]"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href={isHome ? "#top" : "/"} aria-label={`${site.name}, home`} className={cn("flex items-center gap-3 rounded-md", focusRing)}>
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 rounded-lg border border-border bg-[color-mix(in_srgb,var(--surface-2)_65%,transparent)] p-1 lg:flex dark:bg-[rgba(17,17,19,0.6)]"
        >
          {navLinks.map((l) => {
            const on = active === l.id
            return (
              <Link
                key={l.id}
                href={href(l.id)}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex h-[34px] items-center gap-2 rounded-[8px] px-3.5 text-sm font-medium transition-colors duration-200",
                  focusRing,
                  on ? "bg-nav-active text-foreground shadow-card" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("size-[5px] rounded-full transition-colors", on ? "bg-primary" : "bg-transparent")}
                />
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={href("contact")}
            className={cn(
              "hidden h-10 items-center rounded-md bg-primary px-[18px] text-sm font-semibold text-primary-foreground transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] active:bg-primary-active md:inline-flex",
              focusRing
            )}
          >
            Let&apos;s Talk
          </Link>
          <MobileMenu open={open} onOpenChange={setOpen} active={active} href={href} />
        </div>
      </div>
    </header>
  )
}

function MobileMenu({
  open,
  onOpenChange,
  active,
  href,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  active: NavId | null
  href: (id: string) => string
}) {
  const close = () => onOpenChange(false)
  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <SheetPrimitive.Trigger
        aria-label="Open menu"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:bg-surface-2 md:size-10 lg:hidden",
          focusRing
        )}
      >
        <Icon name="menu" size={20} />
      </SheetPrimitive.Trigger>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Backdrop className="fixed inset-0 z-50 bg-[rgba(5,5,6,0.66)] backdrop-blur-[3px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <SheetPrimitive.Popup
          aria-label="Site menu"
          className="fixed inset-y-0 right-0 z-50 flex w-[342px] max-w-[88vw] flex-col border-l border-code-border bg-card text-foreground shadow-[-24px_0_64px_rgba(0,0,0,0.5)] transition-transform duration-250 ease-out outline-none data-ending-style:translate-x-full data-starting-style:translate-x-full motion-reduce:transition-none dark:bg-shot"
        >
          <SheetPrimitive.Title className="sr-only">Site menu</SheetPrimitive.Title>
          <div className="flex h-[72px] flex-none items-center justify-between border-b border-border pr-4 pl-5">
            <span className="flex items-center gap-3">
              <Logo />
            </span>
            <SheetPrimitive.Close
              aria-label="Close menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:bg-surface-2",
                focusRing
              )}
            >
              <Icon name="close" size={20} />
            </SheetPrimitive.Close>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
            {navLinks.map((l, k) => {
              const on = active === l.id
              return (
                <Link
                  key={l.id}
                  href={href(l.id)}
                  onClick={close}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex h-[60px] flex-none items-center gap-4 rounded-lg border px-3 transition-colors",
                    focusRing,
                    on
                      ? "border-tint-border bg-[rgba(16,185,129,0.10)] text-foreground"
                      : "border-transparent text-ghost hover:bg-surface-2 hover:text-foreground"
                  )}
                >
                  <span className={cn("font-mono text-xs", on ? "text-accent-text" : "text-faint")}>
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.02em]">{l.label}</span>
                  <Icon name="arrowRight" className="ml-auto opacity-60" />
                </Link>
              )
            })}
          </nav>

          <div className="flex flex-none flex-col gap-4 border-t border-border p-5">
            <ThemeSegmented />
            <Link
              href={href("contact")}
              onClick={close}
              className={cn(
                "flex h-[52px] items-center justify-center rounded-lg bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active",
                focusRing
              )}
            >
              Let&apos;s Talk
            </Link>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-faint">{site.locationShort}</span>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={cn(
                      "flex size-11 items-center justify-center rounded-md border border-code-border text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground",
                      focusRing
                    )}
                  >
                    <Icon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SheetPrimitive.Popup>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  )
}

const noopSubscribe = () => () => {}

function ThemeSegmented() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const dark = !mounted || resolvedTheme !== "light"
  const pick = (t: "light" | "dark") => {
    const root = document.documentElement
    root.classList.add("theme-transition")
    setTheme(t)
    window.setTimeout(() => root.classList.remove("theme-transition"), 250)
  }
  const btn = (on: boolean) =>
    cn(
      "flex h-8 w-11 items-center justify-center rounded-[7px] transition-colors",
      focusRing,
      on ? "bg-mono-bg text-foreground" : "text-muted-foreground hover:text-foreground"
    )
  return (
    <div className="flex h-12 items-center justify-between rounded-lg border border-code-border bg-background pr-1.5 pl-3.5 dark:bg-card">
      <span className="text-sm text-muted-foreground">Theme</span>
      <div role="group" aria-label="Theme" className="flex gap-1 rounded-[9px] bg-surface-2 p-[3px] dark:bg-background">
        <button type="button" aria-pressed={!dark} aria-label="Light mode" className={btn(!dark)} onClick={() => pick("light")}>
          <Icon name="sun" size={16} />
        </button>
        <button type="button" aria-pressed={dark} aria-label="Dark mode" className={btn(dark)} onClick={() => pick("dark")}>
          <Icon name="moon" size={16} />
        </button>
      </div>
    </div>
  )
}
