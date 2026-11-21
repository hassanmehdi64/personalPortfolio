import Image from "next/image"
import { Icon } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * Browser chrome around a project screenshot (design/Shot.dc.html).
 * The screenshot is a real image rendered with next/image.
 */
export function BrowserFrame({
  src,
  url,
  alt,
  chrome = "light",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  imageClassName,
}: {
  src: string
  url: string
  alt: string
  chrome?: "light" | "dark"
  priority?: boolean
  sizes?: string
  className?: string
  imageClassName?: string
}) {
  const dark = chrome === "dark"
  return (
    <div
      className={cn(
        "flex aspect-[16/10] w-full flex-col overflow-hidden rounded-[10px] border border-white/6",
        dark ? "bg-[#111317]" : "bg-white",
        className
      )}
    >
      <div
        className={cn(
          "flex h-[30px] flex-none items-center gap-3 border-b px-3",
          dark ? "border-[#1E2228]" : "border-[#E2E8F0]"
        )}
      >
        <div className="flex gap-[5px]" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#F87171]" />
          <span className="size-2 rounded-full bg-[#FBBF24]" />
          <span className="size-2 rounded-full bg-[#34D399]" />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <span
            className={cn(
              "inline-flex h-[18px] max-w-[70%] items-center gap-1.5 overflow-hidden rounded-sm px-3 font-mono text-[9.5px] whitespace-nowrap",
              dark ? "bg-[#1A1D23] text-[#94A3B8]" : "bg-[#F1F5F9] text-[#64748B]"
            )}
          >
            <Icon name="lock" size={8} strokeWidth={2.5} className="flex-none" />
            <span className="truncate">{url}</span>
          </span>
        </div>
        <span className="w-[37px]" aria-hidden="true" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", imageClassName)}
        />
      </div>
    </div>
  )
}
