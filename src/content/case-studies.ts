import type { IconName } from "@/components/icons"

export type CaseStudy = {
  slug: string
  title: string
  kicker: string
  summary: string
  tech: string[]
  meta: { k: string; v: string; done?: boolean }[]
  liveUrl: string
  repoUrl: string
  hero: { image: string; url: string }
  sections: {
    overview: { title: string; body: string }
    problem: { title: string; body: string; quote: string; quoteCaption: string }
    solution: { title: string; body: string; roles: { k: string; t: string; d: string }[] }
    features: { title: string; items: { t: string; d: string; icon: IconName }[] }
    stack: { title: string; items: { n: string; d: string }[] }
    learnings: { title: string; items: { c: string; l: string }[] }
  }
  gallery: { src: string; url: string; title: string; caption: string }[]
  next: { title: string; desc: string; href: string }
}

export const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Key features" },
  { id: "stack", label: "Tech stack" },
  { id: "learnings", label: "Challenges & learnings" },
] as const

export const caseStudies: CaseStudy[] = [
  {
    slug: "hosteler",
    title: "Hosteler — Hostel Finder",
    kicker: "// case study · final year project",
    summary: "A platform centralizing hostel listings so students and travelers can search, book and manage stays.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    meta: [
      { k: "ROLE", v: "Full-stack developer" },
      { k: "YEAR", v: "2023" },
      { k: "STATUS", v: "Completed", done: true },
    ],
    // TODO: replace "#" with real links
    liveUrl: "#",
    repoUrl: "#",
    hero: { image: "/projects/hosteler-search.png", url: "hosteler.app/search?city=gilgit" },
    sections: {
      overview: {
        title: "One place to find, compare and book a hostel",
        body: "Hosteler is my final year project at Karakorum International University. It brings scattered hostel listings into a single searchable platform where students and travelers can filter by location, price and facilities, send booking requests and manage their stays, while hostel owners manage rooms and requests from a dashboard.",
      },
      problem: {
        title: "Hostel hunting was word of mouth",
        body: "Students moving to a new city relied on phone calls, notice boards and social media posts to find accommodation. Information about prices, availability and facilities was incomplete and hard to compare, and owners had no simple way to reach students.",
        quote: "“Where can I stay near campus, what does it cost, and is there space?”",
        quoteCaption: "The question Hosteler answers in one search",
      },
      solution: {
        title: "A Laravel platform with three roles",
        body: "I built Hosteler as a Laravel MVC application backed by MySQL, with a responsive Bootstrap interface. Students search and book, owners publish and manage listings, and admins moderate content, each with their own permissions.",
        roles: [
          { k: "STUDENTS & TRAVELERS", t: "Search and book", d: "Filter hostels, compare options and send booking requests." },
          { k: "HOSTEL OWNERS", t: "List and manage", d: "Publish rooms, update availability and respond to requests." },
          { k: "ADMINS", t: "Moderate", d: "Verify listings and keep the platform trustworthy." },
        ],
      },
      features: {
        title: "What it does",
        items: [
          { t: "Search & filters", d: "Find hostels by city, distance, price range and facilities.", icon: "search" },
          { t: "Detailed listings", d: "Photos, room types, facilities and pricing on one page.", icon: "bed" },
          { t: "Booking requests", d: "Request a stay for chosen dates and track its status.", icon: "calendarCheck" },
          { t: "Owner dashboard", d: "Manage rooms, availability and incoming requests.", icon: "layout" },
          { t: "Accounts & roles", d: "Separate, permission-based experiences for each user type.", icon: "users" },
          { t: "Responsive UI", d: "Works on the phones most students search from.", icon: "phone" },
        ],
      },
      stack: {
        title: "Built with",
        items: [
          { n: "Laravel", d: "MVC structure, routing, authentication and Eloquent ORM" },
          { n: "PHP", d: "Server-side business logic and validation" },
          { n: "MySQL", d: "Relational schema for hostels, rooms, users and bookings" },
          { n: "Bootstrap", d: "Responsive layout and UI components" },
        ],
      },
      learnings: {
        title: "What I'd keep, and what I'd change",
        items: [
          { c: "Modelling hostels, rooms and bookings so availability stays consistent.", l: "Designing the schema first, with clear relationships, saved rewrites later." },
          { c: "Giving three user roles the right access without duplicating code.", l: "Middleware and policies keep permissions in one place and easy to test." },
          { c: "Keeping search fast as the number of listings grows.", l: "Indexing the filtered columns and paginating results makes a visible difference." },
        ],
      },
    },
    // Placeholder screenshots generated from the design mockups. Replace with real ones.
    gallery: [
      { src: "/projects/hosteler-search.png", url: "hosteler.app/search", title: "Search results", caption: "Search results with location, date and facility filters" },
      { src: "/projects/hosteler-detail.png", url: "hosteler.app/hostels/karakoram-residency", title: "Hostel detail page", caption: "Hostel detail page with rooms, facilities and pricing" },
      { src: "/projects/hosteler-booking.png", url: "hosteler.app/book/karakoram-residency", title: "Booking request flow", caption: "Booking request flow with dates and room choice" },
      { src: "/projects/hosteler-owner.png", url: "hosteler.app/owner/dashboard", title: "Owner dashboard", caption: "Owner dashboard for rooms, availability and requests" },
    ],
    next: { title: "Task Management API", desc: "RESTful API for teams · Node.js · Express · MySQL", href: "/projects" },
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
