// Personal details and links used across the site.
// Placeholders in [brackets] still need real values.

export const site = {
  name: "Hassan Mehdi",
  initials: { first: "H", second: "M" },
  role: "Software Developer",
  location: "Lahore, Pakistan",
  locationShort: "Lahore, PK",
  timezone: "UTC+5",
  email: "hello@[yourdomain].dev",
  linkedin: { href: "https://www.linkedin.com/", handle: "in/[handle]", display: "linkedin.com/in/[handle]" },
  github: { href: "https://github.com/", handle: "@[handle]", display: "github.com/[handle]" },
  cvPath: "/cv.pdf",
  tagline: "Full-stack developer building scalable, user-friendly web applications from Lahore.",
} as const

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
] as const

export type NavId = (typeof navLinks)[number]["id"]

export const socials = [
  { label: "GitHub", href: site.github.href, icon: "github" },
  { label: "LinkedIn", href: site.linkedin.href, icon: "linkedin" },
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
] as const
