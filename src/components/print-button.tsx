"use client"

import { Icon } from "@/components/icons"

export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Icon name="printer" size={16} />
      Print
    </button>
  )
}
