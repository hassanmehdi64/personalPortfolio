import type { IconName } from "@/components/icons"

export const heroRoles = ["Laravel Developer", "React Developer", "Full-Stack Engineer", "Tech Trainer"]

export const stats = [
  { value: "2", suffix: "+", label: "Years dev experience" },
  { value: "3", suffix: "", label: "Professional roles" },
  { value: "3.4", suffix: "/4.0", label: "CGPA" },
  { value: "3", suffix: "", label: "Workshops" },
]

export type SkillGroup = {
  title: string
  desc: string
  icon: IconName
  /** Tech names; matched to logos in components/tech-icon.tsx. `plain` chips have no logo. */
  items: string[]
  plain?: boolean
  /** Bento spans: desktop (3 cols) and tablet (2 cols) */
  span: { lg: 1 | 2 | 3; md: 1 | 2 }
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    desc: "Interfaces that are fast, accessible and responsive.",
    icon: "code",
    items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    span: { lg: 2, md: 2 },
  },
  {
    title: "Backend",
    desc: "APIs and business logic.",
    icon: "server",
    items: ["PHP (Laravel)", "Node.js", "RESTful APIs"],
    span: { lg: 1, md: 1 },
  },
  {
    title: "Database",
    desc: "Design, implementation, optimization.",
    icon: "db",
    items: ["MySQL", "phpMyAdmin"],
    span: { lg: 1, md: 1 },
  },
  {
    title: "Tools",
    desc: "Daily drivers.",
    icon: "wrench",
    items: ["Git", "GitHub", "VS Code", "Sublime Text"],
    span: { lg: 1, md: 1 },
  },
  {
    title: "Deployment",
    desc: "From static sites to PHP hosting.",
    icon: "rocket",
    items: ["Vercel", "Netlify", "cPanel"],
    span: { lg: 1, md: 1 },
  },
  {
    title: "Professional",
    desc: "How I work with teams and clients.",
    icon: "users",
    items: ["Agile", "Team Collaboration", "Client Communication", "Requirement Gathering", "Technical Training"],
    plain: true,
    span: { lg: 3, md: 2 },
  },
]

export type Job = {
  role: string
  company: string
  dates: string
  kind: "dev" | "business"
  bullets: string[]
  /** Shorter bullets for the one-page resume */
  resumeBullets: string[]
  tags: string[]
}

// Draft copy based on the role titles. Replace with real responsibilities.
export const jobs: Job[] = [
  {
    role: "Textile Marketing Merchandiser",
    company: "Umer Group of Companies",
    dates: "Aug 2024 — Sep 2025",
    kind: "business",
    bullets: [
      "Managed communication with international buyers from first inquiry to final delivery.",
      "Coordinated orders, timelines and quality expectations across teams.",
      "Built the client-facing and delivery discipline I now bring to software projects.",
    ],
    resumeBullets: [
      "Managed communication with international buyers from first inquiry to final delivery.",
      "Coordinated orders, timelines and quality expectations across teams.",
    ],
    tags: ["Client Relations", "Negotiation", "Delivery"],
  },
  {
    role: "Web Developer / Trainer",
    company: "Edifice Technologies",
    dates: "Nov 2023 — Apr 2024",
    kind: "dev",
    bullets: [
      "Trained aspiring developers in HTML, CSS, JavaScript and React.",
      "Built and delivered web projects alongside training duties.",
      "Designed hands-on exercises and reviewed trainee code.",
    ],
    resumeBullets: [
      "Trained aspiring developers in HTML, CSS, JavaScript and React.",
      "Built and delivered web projects; designed exercises and reviewed trainee code.",
    ],
    tags: ["React", "JavaScript", "Training"],
  },
  {
    role: "Laravel Developer",
    company: "3Beez Technologies",
    dates: "Feb 2022 — Nov 2022",
    kind: "dev",
    bullets: [
      "Built Laravel features, RESTful APIs and MySQL schemas for client projects.",
      "Turned client requirements into scoped technical tasks.",
      "Worked in an Agile team with Git and GitHub-based reviews.",
    ],
    resumeBullets: [
      "Built Laravel features, RESTful APIs and MySQL schemas for client projects.",
      "Turned client requirements into scoped tasks in an Agile, Git-based team.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "REST"],
  },
]

export const education = {
  degree: "BS (Hons) Information Technology",
  school: "Karakorum International University",
  years: "2019 — 2023",
  cgpa: "3.4",
  cgpaOf: "4.00",
  fyp: { title: "Hosteler", href: "/projects/hosteler" },
}

export const workshops = [
  { year: "2024", title: "Community Building Workshop", org: "Virtual University", resume: "Community Building Workshop, Virtual University" },
  { year: "2023", title: "Workshop on Management Skills", org: "Professional development", resume: "Workshop on Management Skills" },
  { year: "2022", title: "Workshop on Frontend Frameworks", org: "React.js & Tailwind CSS", resume: "Workshop on Frontend Frameworks (React.js & Tailwind CSS)" },
]
