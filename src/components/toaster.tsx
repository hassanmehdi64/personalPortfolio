"use client"

import { useSyncExternalStore } from "react"
import { Toaster as Sonner, toast } from "sonner"
import { Icon, type IconName } from "@/components/icons"
import { cn } from "@/lib/utils"

const mq = "(max-width: 767px)"
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(mq)
  m.addEventListener("change", cb)
  return () => m.removeEventListener("change", cb)
}

/** Bottom-right on desktop, top on mobile. Auto-dismiss after 5s. */
export function Toaster() {
  const mobile = useSyncExternalStore(subscribe, () => window.matchMedia(mq).matches, () => false)
  return <Sonner position={mobile ? "top-center" : "bottom-right"} duration={5000} gap={10} />
}

type Kind = "success" | "error" | "neutral"

const styles: Record<Kind, { icon: IconName; tile: string; border: string }> = {
  success: { icon: "check", tile: "bg-[rgba(16,185,129,0.14)] text-accent-text", border: "border-[rgba(16,185,129,0.35)]" },
  error: { icon: "alert", tile: "bg-[rgba(248,113,113,0.14)] text-destructive", border: "border-[rgba(248,113,113,0.35)]" },
  neutral: { icon: "copy", tile: "bg-mono-bg text-foreground", border: "border-border-strong" },
}

/** Toast matching DesignSystem "10 — Toasts". */
export function notify(kind: Kind, title: string, body: string) {
  const s = styles[kind]
  toast.custom((id) => (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={cn(
        "flex w-[356px] max-w-[calc(100vw-32px)] items-start gap-3 rounded-[14px] border bg-card py-3.5 pr-3.5 pl-4 font-sans text-foreground shadow-toast",
        s.border
      )}
    >
      <span className={cn("flex size-7 flex-none items-center justify-center rounded-[8px]", s.tile)}>
        <Icon name={s.icon} size={16} strokeWidth={1.75} />
      </span>
      <div className="flex flex-1 flex-col leading-[1.4]">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-[13px] text-muted-foreground">{body}</span>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => toast.dismiss(id)}
        className="flex size-7 flex-none items-center justify-center rounded-sm text-faint transition-colors outline-none hover:bg-surface-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Icon name="close" size={14} strokeWidth={1.75} />
      </button>
    </div>
  ))
}
