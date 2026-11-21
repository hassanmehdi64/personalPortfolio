import Link from "next/link"
import { Icon } from "@/components/icons"
import { Logo } from "@/components/logo"
import { navLinks, site, socials } from "@/content/site"
import { cn } from "@/lib/utils"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function SiteFooter({ onHome = false }: { onHome?: boolean }) {
  const base = onHome ? "" : "/"
  return (
    <footer className="w-full border-t border-border bg-background print:hidden">
      <div className="container-page flex flex-col gap-10 pt-12 pb-8 md:pt-16">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <Link href={onHome ? "#top" : "/"} className={cn("flex items-center gap-3 self-start rounded-md", focusRing)}>
              <Logo />
            </Link>
            <p className="text-[15px] leading-[1.6] text-muted-foreground">{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.id}
                href={`${base}#${l.id}`}
                className={cn("inline-flex h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground", focusRing)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className={cn(
                  "flex size-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground",
                  focusRing
                )}
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <span className="font-mono text-xs text-faint">© 2026 {site.name} · Built with Next.js &amp; Tailwind CSS</span>
          <a
            href="#top"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-3.5 text-[13px] font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface-2",
              focusRing
            )}
          >
            Back to top
            <Icon name="arrowUp" size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
