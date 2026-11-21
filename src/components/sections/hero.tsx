import Link from "next/link"
import { Icon } from "@/components/icons"
import { Typewriter } from "@/components/typewriter"
import { Reveal } from "@/components/reveal"
import { heroRoles } from "@/content/home"
import { site, socials } from "@/content/site"
import { cn } from "@/lib/utils"
import { focusRing } from "./styles"

const ln = "inline-block w-7 text-[#80808A]"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 bg-size-[24px_24px] mask-[radial-gradient(ellipse_75%_70%_at_50%_35%,#000_25%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-[120px] -right-[360px] size-[760px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] lg:-right-[160px]"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 pt-14 pb-18 md:pt-20 md:pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-28 lg:pb-38">
        <Reveal className="flex flex-col items-start gap-6">
          <span className="inline-flex h-8 items-center gap-2.5 rounded-full border border-tint-border bg-tint pr-3.5 pl-3 text-[13px] font-medium text-tint-text">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(16,185,129,0.22)]" />
            Available for opportunities
          </span>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-sm text-accent-text">{"// " + site.role}</span>
            <h1
              id="hero-title"
              className="font-display text-[40px] leading-[46px] font-bold tracking-[-0.035em] md:text-[54px] md:leading-[62px] lg:text-[64px] lg:leading-[72px]"
            >
              Hi, I&apos;m {site.name}.{" "}
              <span className="text-muted-foreground">I build scalable, user-friendly web applications.</span>
            </h1>
          </div>
          <Typewriter roles={heroRoles} />
          <p className="max-w-[560px] text-base leading-[1.65] text-muted-foreground md:text-lg">
            Full-stack developer experienced in Laravel, React and Node.js, with a background in training developers and
            leading client-facing projects.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#projects"
              className={cn(
                "inline-flex h-12 items-center gap-2.5 rounded-lg bg-primary px-[22px] text-[15px] font-semibold text-primary-foreground shadow-cta transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-primary-hover active:scale-[0.98] active:bg-primary-active",
                focusRing
              )}
            >
              View Projects
              <Icon name="arrowRight" size={16} strokeWidth={1.75} />
            </Link>
            <a
              href={site.cvPath}
              download
              className={cn(
                "inline-flex h-12 items-center gap-2.5 rounded-lg border border-border-strong bg-card px-[22px] text-[15px] font-semibold text-foreground transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-border-hover hover:bg-surface-2 active:scale-[0.98]",
                focusRing
              )}
            >
              Download CV
              <Icon name="download" size={16} />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground md:size-10",
                    focusRing
                  )}
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
            <span aria-hidden="true" className="h-5 w-px bg-border-strong" />
            <span className="font-mono text-[13px] text-faint">
              {site.locationShort} · {site.timezone}
            </span>
          </div>
        </Reveal>

        {/* code card */}
        <Reveal index={2} className="relative min-w-0">
          <div className="overflow-hidden rounded-xl border border-code-border bg-code shadow-code">
            <div className="flex h-11 items-center gap-3 border-b border-[#232327] px-4">
              <div aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#3F3F46]" />
                <span className="size-2.5 rounded-full bg-[#3F3F46]" />
                <span className="size-2.5 rounded-full bg-[#3F3F46]" />
              </div>
              <span className="inline-flex h-[26px] items-center rounded-sm bg-[#1C1C20] px-2.5 font-mono text-xs text-[#E4E4E7]">
                hassan.ts
              </span>
              <span className="ml-auto font-mono text-xs text-[#8B8B94]">TypeScript</span>
            </div>
            <pre className="overflow-x-auto px-3.5 py-4 font-mono text-[11.5px] leading-5 text-[#E4E4E7] md:px-5 md:py-6 md:text-sm md:leading-[26px]">
              <code>
                <span className={ln}>1</span>
                <span className="text-[#93C5FD]">const</span> hassan <span className="text-[#A1A1AA]">=</span> {"{"}
                {"\n"}
                <span className={ln}>2</span>
                {"  "}role<span className="text-[#A1A1AA]">:</span>{" "}
                <span className="text-[#6EE7B7]">&quot;Full-Stack Developer&quot;</span>,{"\n"}
                <span className={ln}>3</span>
                {"  "}stack<span className="text-[#A1A1AA]">:</span> [<span className="text-[#6EE7B7]">&quot;Laravel&quot;</span>,{" "}
                <span className="text-[#6EE7B7]">&quot;React&quot;</span>, <span className="text-[#6EE7B7]">&quot;Node.js&quot;</span>],
                {"\n"}
                <span className={ln}>4</span>
                {"  "}location<span className="text-[#A1A1AA]">:</span>{" "}
                <span className="text-[#6EE7B7]">&quot;Lahore, PK&quot;</span>,{"\n"}
                <span className={ln}>5</span>
                {"  "}openToWork<span className="text-[#A1A1AA]">:</span> <span className="text-[#FCD34D]">true</span>,{"\n"}
                <span className={ln}>6</span>
                {"};"}
                {"\n"}
                <span className={ln}>7</span>
                {"\n"}
                <span className={ln}>8</span>
                <span className="text-[#8B8B94]">{"// let's build something →"}</span>
              </code>
            </pre>
            <div className="flex h-9 items-center gap-4 border-t border-[#232327] px-4 font-mono text-[11px] text-[#8B8B94]">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                main
              </span>
              <span>UTF-8</span>
              <span className="ml-auto">Ln 5, Col 19</span>
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className={cn(
          "absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 rounded-md text-faint transition-colors hover:text-foreground lg:flex",
          focusRing
        )}
      >
        <span aria-hidden="true" className="flex h-[34px] w-[22px] justify-center rounded-[12px] border-[1.5px] border-border-strong pt-[7px]">
          <span className="h-[7px] w-[3px] animate-bounce rounded-[2px] bg-primary motion-reduce:animate-none" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em]">SCROLL</span>
      </a>
    </section>
  )
}
