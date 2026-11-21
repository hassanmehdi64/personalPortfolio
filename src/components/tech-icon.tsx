import {
  siBootstrap,
  siCpanel,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siLaravel,
  siMysql,
  siNetlify,
  siNodedotjs,
  siPhp,
  siPhpmyadmin,
  siReact,
  siSocketdotio,
  siSublimetext,
  siTailwindcss,
  siVercel,
  type SimpleIcon,
} from "simple-icons"
import { cn } from "@/lib/utils"

const byName: Record<string, SimpleIcon> = {
  "React.js": siReact,
  React: siReact,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  "Tailwind CSS": siTailwindcss,
  Bootstrap: siBootstrap,
  "PHP (Laravel)": siLaravel,
  Laravel: siLaravel,
  "Laravel API": siLaravel,
  PHP: siPhp,
  "Node.js": siNodedotjs,
  Express: siExpress,
  JWT: siJsonwebtokens,
  "Socket.io": siSocketdotio,
  MySQL: siMysql,
  phpMyAdmin: siPhpmyadmin,
  Git: siGit,
  GitHub: siGithub,
  "Sublime Text": siSublimetext,
  Vercel: siVercel,
  Netlify: siNetlify,
  cPanel: siCpanel,
}

/** Two-letter fallbacks for tech that Simple Icons doesn't ship. */
const monograms: Record<string, string> = {
  "RESTful APIs": "{}",
  "VS Code": "VS",
}

/** Very dark brand colours (GitHub, Vercel…) would vanish on the dark theme. */
function isDark(hex: string) {
  const n = parseInt(hex, 16)
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60
}

export function techBrand(name: string) {
  const icon = byName[name]
  if (!icon) return undefined
  return isDark(icon.hex) ? "var(--foreground)" : `#${icon.hex}`
}

/**
 * 24px logo tile. Greyscale by default; shows brand colour when an ancestor
 * with the `group/chip` class is hovered or focused.
 */
export function TechIcon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const icon = byName[name]
  const brand = techBrand(name)
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, ["--brand" as string]: brand ?? "var(--foreground)" }}
      className={cn(
        "flex flex-none items-center justify-center rounded-sm bg-mono-bg font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-200",
        "group-hover/chip:bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] group-hover/chip:text-(--brand)",
        "group-focus-visible/chip:bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] group-focus-visible/chip:text-(--brand)",
        className
      )}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" width={Math.round(size * 0.56)} height={Math.round(size * 0.56)} fill="currentColor">
          <path d={icon.path} />
        </svg>
      ) : (
        (monograms[name] ?? name.slice(0, 2))
      )}
    </span>
  )
}
