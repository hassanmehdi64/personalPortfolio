import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Variants and states follow design/DesignSystem.dc.html → "06 — Buttons".
 * default = Primary · outline = Secondary · ghost = Ghost · icon sizes = Icon-only.
 */
const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-semibold whitespace-nowrap select-none outline-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:not-aria-[haspopup]:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-40 aria-busy:opacity-85",
    "aria-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:-translate-y-px hover:border-primary-hover hover:bg-primary-hover hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] active:border-primary-active active:bg-primary-active active:shadow-none",
        outline:
          "border-border-strong bg-card text-foreground hover:-translate-y-px hover:border-border-hover hover:bg-surface-2 active:bg-pressed aria-expanded:bg-surface-2",
        ghost:
          "text-ghost hover:bg-surface-2 hover:text-foreground active:bg-pressed aria-expanded:bg-surface-2 aria-expanded:text-foreground",
        icon:
          "border-border-strong bg-transparent text-foreground hover:-translate-y-px hover:border-border-hover hover:bg-surface-2 active:bg-pressed",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-pressed aria-expanded:bg-pressed",
        tint:
          "border-tint-border bg-tint text-tint-text hover:border-primary/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive",
        link: "h-auto border-0 px-0 text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        // 44px on touch screens, 40px from tablet up
        default: "h-11 px-[18px] md:h-10",
        sm: "h-9 rounded-md px-3 text-[13px]",
        lg: "h-12 px-[22px] text-[15px]",
        xs: "h-7 gap-1 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        icon: "size-11 rounded-md md:size-10 [&_svg:not([class*='size-'])]:size-[18px]",
        "icon-sm": "size-8 rounded-sm",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-[18px]",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
