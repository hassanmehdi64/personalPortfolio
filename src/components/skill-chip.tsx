"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TechIcon } from "@/components/tech-icon"
import { cn } from "@/lib/utils"

const chipClass =
  "group/chip inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface-2 text-sm text-foreground transition-[transform,border-color,background-color] duration-200 ease-out"

/** Tech chip: logo turns from grey to brand colour on hover, with a tooltip. */
export function SkillChip({ name, plain }: { name: string; plain?: boolean }) {
  if (plain) {
    return <span className={cn(chipClass, "px-3")}>{name}</span>
  }
  return (
    <Tooltip>
      <TooltipTrigger
        delay={150}
        render={<span tabIndex={0} />}
        className={cn(
          chipClass,
          "cursor-default pr-3 pl-1.5 outline-none hover:-translate-y-px hover:border-primary/40 hover:bg-pressed",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <TechIcon name={name} />
        {name}
      </TooltipTrigger>
      <TooltipContent className="h-[26px] rounded-sm px-2 py-0 font-medium">{name}</TooltipContent>
    </Tooltip>
  )
}
