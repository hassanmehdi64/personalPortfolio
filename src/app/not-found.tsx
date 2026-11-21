import type { Metadata } from "next"
import Link from "next/link"
import { Icon } from "@/components/icons"
import { NotFoundPath } from "@/components/not-found-path"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Page not found" }

const ring =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
const prompt = (
  <>
    <span className="text-[#34D399]">➜</span> <span className="text-[#93C5FD]">~</span>
  </>
)

export default function NotFound() {
  return (
    <main id="main" className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-10 md:px-10">
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[700px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)]"
      />
      <div className="relative flex w-full max-w-[640px] flex-col items-center gap-8 text-center">
        <span
          aria-hidden="true"
          className="font-display text-[128px] leading-[0.9] font-bold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--border-strong)] md:text-[220px]"
        >
          404
        </span>
        <div className="-mt-14 w-full overflow-hidden rounded-xl border border-code-border bg-code text-left shadow-code md:-mt-[110px]">
          <div className="flex h-10 items-center gap-3 border-b border-[#232327] px-3.5">
            <div aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#3F3F46]" />
              <span className="size-2.5 rounded-full bg-[#3F3F46]" />
              <span className="size-2.5 rounded-full bg-[#3F3F46]" />
            </div>
            <span className="font-mono text-xs text-[#8B8B94]">hassan@portfolio: ~</span>
          </div>
          <div className="p-4 font-mono text-[12.5px] leading-[1.8] break-all text-[#E4E4E7] md:px-7 md:py-6 md:text-sm">
            <div>
              {prompt} cd{" "}
              <NotFoundPath />
            </div>
            <h1 className="font-[inherit] text-[#F87171]">Error 404: page not found</h1>
            <div className="text-[#A1A1AA]">The route you requested doesn&apos;t exist or has moved.</div>
            <div>{prompt} ls ./suggestions</div>
            <div className="text-[#A1A1AA]">
              <Link href="/" className="rounded-sm hover:text-[#FAFAF9] hover:underline">home/</Link>{"  "}
              <Link href="/projects" className="rounded-sm hover:text-[#FAFAF9] hover:underline">projects/</Link>{"  "}
              <Link href="/resume" className="rounded-sm hover:text-[#FAFAF9] hover:underline">resume/</Link>{"  "}
              <Link href="/#contact" className="rounded-sm hover:text-[#FAFAF9] hover:underline">contact/</Link>
            </div>
            <div className="flex items-center">
              {prompt}&nbsp;
              <span aria-hidden="true" className="animate-caret h-[18px] w-[9px] rounded-[2px] bg-primary" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className={cn(
              "inline-flex h-12 items-center gap-2.5 rounded-lg bg-primary px-[22px] text-[15px] font-semibold text-primary-foreground transition-[background-color,transform] hover:-translate-y-px hover:bg-primary-hover active:bg-primary-active",
              ring
            )}
          >
            <Icon name="arrowLeft" size={16} strokeWidth={1.75} />
            Back home
          </Link>
          <Link
            href="/projects"
            className={cn(
              "inline-flex h-12 items-center rounded-lg border border-border-strong bg-card px-[22px] text-[15px] font-semibold text-foreground transition-[background-color,border-color,transform] hover:-translate-y-px hover:border-border-hover hover:bg-surface-2",
              ring
            )}
          >
            Browse projects
          </Link>
        </div>
      </div>
    </main>
  )
}
