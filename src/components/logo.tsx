import { site } from "@/content/site"

/** "HM" monogram tile + name. */
export function Logo() {
  return (
    <>
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-md border border-border-strong bg-card font-display text-[15px] font-bold tracking-[-0.04em]"
      >
        {site.initials.first}
        <span className="text-accent-text">{site.initials.second}</span>
      </span>
      <span className="font-display text-base font-semibold tracking-[-0.01em] text-foreground">{site.name}</span>
    </>
  )
}
