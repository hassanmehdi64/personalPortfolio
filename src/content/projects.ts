// Only Hosteler is a real project. The others are samples to swap for real work.

export const projectFilters = ["All", "Laravel", "React", "Node.js", "MySQL", "Full-Stack"] as const
export type ProjectFilter = (typeof projectFilters)[number]

export type Project = {
  slug: string
  title: string
  /** Kicker on the home page / projects page */
  kicker: string
  kickerShort: string
  year: string
  status: "Completed" | "In progress"
  summary: string
  tech: string[]
  cats: Exclude<ProjectFilter, "All">[]
  /** Screenshot shown inside the browser frame */
  image: string
  url: string
  /** Browser chrome style: "dark" for terminal-like screenshots */
  chrome: "light" | "dark"
  hasCaseStudy: boolean
  // TODO: replace "#" with real links
  liveUrl: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    slug: "hosteler",
    title: "Hosteler — Hostel Finder",
    kicker: "FINAL YEAR PROJECT · 2023",
    kickerShort: "FYP · 2023",
    year: "2023",
    status: "Completed",
    summary: "A platform centralizing hostel listings so students and travelers can search, book and manage stays.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    cats: ["Laravel", "MySQL", "Full-Stack"],
    image: "/projects/hosteler-search.png",
    url: "hosteler.app/search",
    chrome: "light",
    hasCaseStudy: true,
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "task-management-api",
    title: "Task Management API",
    kicker: "BACKEND · 2024",
    kickerShort: "BACKEND · 2024",
    year: "2024",
    status: "Completed",
    summary: "A RESTful API for teams to create projects, assign tasks and track progress, with token auth and roles.",
    tech: ["Node.js", "Express", "MySQL", "JWT"],
    cats: ["Node.js", "MySQL"],
    image: "/projects/taskflow-api.png",
    url: "api.taskflow.dev/docs",
    chrome: "dark",
    hasCaseStudy: false,
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "ecommerce-dashboard",
    title: "E-commerce Dashboard",
    kicker: "FULL-STACK · 2024",
    kickerShort: "FULL-STACK · 2024",
    year: "2024",
    status: "Completed",
    summary: "An admin dashboard to manage products, orders and customers, with sales charts and stock alerts.",
    tech: ["React", "Tailwind CSS", "Laravel API"],
    cats: ["React", "Laravel", "Full-Stack"],
    image: "/projects/storedesk.png",
    url: "admin.storedesk.app",
    chrome: "light",
    hasCaseStudy: false,
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "realtime-team-chat",
    title: "Realtime Team Chat",
    kicker: "FULL-STACK · 2024",
    kickerShort: "FULL-STACK · 2024",
    year: "2024",
    status: "Completed",
    summary: "Channels, direct messages, typing indicators and read receipts over WebSockets.",
    tech: ["Node.js", "Socket.io", "React"],
    cats: ["Node.js", "React", "Full-Stack"],
    image: "/projects/huddle.png",
    url: "huddle.chat/dev-team",
    chrome: "light",
    hasCaseStudy: false,
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "inkwell-blog-cms",
    title: "Inkwell Blog CMS",
    kicker: "LARAVEL · 2023",
    kickerShort: "LARAVEL · 2023",
    year: "2023",
    status: "Completed",
    summary: "A content manager with a rich editor, categories, tags and an SEO checklist for every post.",
    tech: ["Laravel", "MySQL", "Tailwind CSS"],
    cats: ["Laravel", "MySQL"],
    image: "/projects/inkwell.png",
    url: "inkwell.test/admin/posts/new",
    chrome: "light",
    hasCaseStudy: false,
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "workshop-hub",
    title: "Workshop Hub",
    kicker: "FULL-STACK · 2025",
    kickerShort: "FULL-STACK · 2025",
    year: "2025",
    status: "In progress",
    summary: "Registration and seat management for developer training workshops, with waitlists and reminders.",
    tech: ["React", "Node.js", "MySQL"],
    cats: ["React", "Node.js", "MySQL", "Full-Stack"],
    image: "/projects/workshop-hub.png",
    url: "workshophub.pk/events",
    chrome: "light",
    hasCaseStudy: false,
    liveUrl: "#",
    repoUrl: "#",
  },
]

/** Projects shown in "Selected Work" on the home page (first one is featured). */
export const featuredProjects = projects.slice(0, 3)

export function projectHref(p: Project) {
  return p.hasCaseStudy ? `/projects/${p.slug}` : "/projects"
}
