"use client"

import { useEffect, useRef, useState } from "react"
import { Icon } from "@/components/icons"
import { notify } from "@/components/toaster"
import { cn } from "@/lib/utils"

/** Copy button: shows "Copied" for ~1.8s and fires the "Email copied" toast. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      notify("neutral", "Email copied", "Paste it into your mail app.")
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      notify("error", "Couldn’t copy email", "Select the address and copy it manually.")
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className={cn(
        "ml-auto inline-flex h-10 flex-none items-center gap-1.5 rounded-md border border-border-strong px-3 text-[13px] font-medium transition-colors outline-none hover:border-border-hover hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card max-md:h-11",
        copied ? "text-accent-text" : "text-foreground"
      )}
    >
      <Icon name={copied ? "check" : "copy"} size={15} />
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
