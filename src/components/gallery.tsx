"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { BrowserFrame } from "@/components/browser-frame"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Shot = { src: string; url: string; title: string; caption: string }

const ring =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"

/** Screens grid + lightbox (design/Lightbox.dc.html). */
export function Gallery({ app, shots }: { app: string; shots: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {shots.map((s, k) => (
          <Reveal key={s.src} index={k} className={cn(k === 0 && "md:col-span-3")}>
            <button
              type="button"
              onClick={() => setIndex(k)}
              aria-label={`Open ${s.title} screenshot`}
              className={cn(
                "group/shot flex w-full cursor-zoom-in flex-col rounded-[18px] border border-border bg-shot p-2.5 text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40",
                ring
              )}
            >
              <span className="block overflow-hidden rounded-[10px]">
                <span className="block transition-transform duration-300 group-hover/shot:scale-[1.02] motion-reduce:transition-none">
                  <BrowserFrame
                    src={s.src}
                    url={s.url}
                    alt=""
                    sizes={k === 0 ? "(min-width: 1200px) 1120px, 100vw" : "(min-width: 768px) 360px, 100vw"}
                  />
                </span>
              </span>
              {k > 0 && <span className="px-1 pt-2.5 pb-0.5 text-[13px] text-muted-foreground">{s.title}</span>}
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        {open && <Lightbox app={app} shots={shots} index={index} setIndex={setIndex} />}
      </Dialog>
    </>
  )
}

function Lightbox({
  app,
  shots,
  index,
  setIndex,
}: {
  app: string
  shots: Shot[]
  index: number
  setIndex: (i: number) => void
}) {
  const [zoomed, setZoomed] = useState(false)
  const shot = shots[index]
  const first = index === 0
  const last = index === shots.length - 1

  const go = useCallback(
    (d: number) => {
      const next = index + d
      if (next < 0 || next >= shots.length) return
      setZoomed(false)
      setIndex(next)
    },
    [index, shots.length, setIndex]
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1)
    if (e.key === "ArrowLeft") go(-1)
  }

  const ctrl =
    "flex size-11 flex-none items-center justify-center rounded-md border border-[#2C2C31] bg-[#111113] text-[#FAFAF9] transition-colors hover:border-[#3F3F46] hover:bg-[#17171A] " +
    "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
  const arrow = (disabled: boolean) =>
    cn(
      "flex size-11 flex-none items-center justify-center rounded-full border transition-colors md:size-[52px]",
      "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      disabled
        ? "cursor-not-allowed border-[#232327] bg-[#0E0E10] text-[#52525B]"
        : "border-[#2C2C31] bg-[#111113] text-[#FAFAF9] hover:border-[#3F3F46] hover:bg-[#17171A]"
    )

  return (
    <DialogContent
      overlayClassName="bg-[rgba(5,5,6,0.94)]"
      className="inset-0 flex flex-col bg-[rgba(5,5,6,0.94)] text-[#FAFAF9] backdrop-blur-[2px]"
      onKeyDown={onKeyDown}
      aria-label={`Screenshot ${index + 1} of ${shots.length}: ${shot.title}`}
    >
      <DialogTitle className="sr-only">
        {app} screenshot {index + 1} of {shots.length}: {shot.title}
      </DialogTitle>
      <div className="flex h-[72px] flex-none items-center justify-between px-4 md:px-8">
        <span className="font-mono text-[13px] text-[#A1A1AA]">
          {app} · <span className="text-[#FAFAF9]">{index + 1}</span> / {shots.length}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            aria-pressed={zoomed}
            onClick={() => setZoomed((z) => !z)}
            className={ctrl}
          >
            <Icon name={zoomed ? "zoomOut" : "zoomIn"} />
          </button>
          <DialogClose aria-label="Close" className={ctrl}>
            <Icon name="close" />
          </DialogClose>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-8 px-4 md:px-8">
        <button type="button" aria-label="Previous screenshot" disabled={first} onClick={() => go(-1)} className={cn(arrow(first), "max-md:hidden")}>
          <Icon name="chevronLeft" size={20} />
        </button>
        <div className={cn("max-h-full w-full max-w-[1040px]", zoomed ? "overflow-auto" : "overflow-hidden")}>
          <div
            className={cn(
              "rounded-[20px] border border-[rgba(16,185,129,0.25)] bg-[#0E0E10] p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] transition-[width] duration-200 md:p-3",
              zoomed ? "w-[170%] cursor-zoom-out" : "w-full cursor-zoom-in"
            )}
            onClick={() => setZoomed((z) => !z)}
          >
            <BrowserFrame
              key={shot.src}
              src={shot.src}
              url={shot.url}
              alt={`${app}: ${shot.title}`}
              sizes="(min-width: 1100px) 1040px, 100vw"
              priority
              className="animate-in duration-200 fade-in-0 motion-reduce:animate-none"
            />
          </div>
        </div>
        <button type="button" aria-label="Next screenshot" disabled={last} onClick={() => go(1)} className={cn(arrow(last), "max-md:hidden")}>
          <Icon name="chevronRight" size={20} />
        </button>
      </div>

      <div className="flex flex-none flex-col items-center justify-center gap-3.5 px-4 py-5 md:h-[120px] md:py-0">
        <DialogDescription className="text-center text-[15px] text-[#D4D4D8]">{shot.caption}</DialogDescription>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous screenshot" disabled={first} onClick={() => go(-1)} className={cn(arrow(first), "mr-2 md:hidden")}>
            <Icon name="chevronLeft" size={20} />
          </button>
          {shots.map((s, k) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.title}`}
              aria-current={k === index ? "true" : undefined}
              onClick={() => {
                setZoomed(false)
                setIndex(k)
              }}
              className={cn(
                "relative h-[34px] w-[54px] overflow-hidden rounded-sm bg-[#17171A] transition-[border-color,opacity] md:h-[45px] md:w-[72px]",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                k === index ? "border-2 border-primary" : "border border-[#2C2C31] opacity-70 hover:opacity-100"
              )}
            >
              <Image src={s.src} alt="" fill sizes="72px" className="object-cover object-top" />
            </button>
          ))}
          <button type="button" aria-label="Next screenshot" disabled={last} onClick={() => go(1)} className={cn(arrow(last), "ml-2 md:hidden")}>
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
    </DialogContent>
  )
}
