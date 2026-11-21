import type { Metadata } from "next"
import { Icon } from "@/components/icons"
import { PrintButton } from "@/components/print-button"
import { SiteFooter } from "@/components/site-footer"
import { education, jobs, workshops } from "@/content/home"
import { projects } from "@/content/projects"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Resume",
  description: "Hassan Mehdi — Full-Stack Software Developer · Laravel · React · Node.js",
}

const ring =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const resumeSkills: { k: string; v: string }[] = [
  { k: "Frontend", v: "React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap" },
  { k: "Backend", v: "PHP (Laravel), Node.js, RESTful APIs" },
  { k: "Database", v: "MySQL, phpMyAdmin: design, implementation, query optimization" },
  { k: "Tools", v: "Git, GitHub, VS Code, Sublime Text" },
  { k: "Deployment", v: "Vercel, Netlify, cPanel" },
  { k: "Professional", v: "Agile, team collaboration, client communication, requirement gathering, technical training" },
]

const h2 = "font-mono text-xs font-medium tracking-[0.12em] text-[#63636B]"
const row = "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
const date = "font-mono text-xs text-[#63636B]"

export default function ResumePage() {
  const fyp = projects.find((p) => p.slug === "hosteler")!
  return (
    <>
      {/* Sub-bar under the site header */}
      <div className="sticky top-[72px] z-20 border-b border-border bg-[color-mix(in_srgb,var(--background)_85%,transparent)] backdrop-blur-[12px] print:hidden">
        <div className="mx-auto flex h-[68px] max-w-[880px] items-center justify-between gap-3 px-5 md:px-10">
          <div className="flex min-w-0 flex-col leading-[1.3]">
            <span className="text-[15px] font-semibold">Resume</span>
            <span className="font-mono text-xs text-faint">Updated Nov 2026 · 1 page</span>
          </div>
          <div className="flex gap-2">
            <PrintButton
              className={cn(
                "hidden h-11 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface-2 md:inline-flex",
                ring
              )}
            />
            <a
              href={site.cvPath}
              download
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-md bg-primary px-[18px] text-sm font-semibold text-primary-foreground transition-[background-color,transform] hover:-translate-y-px hover:bg-primary-hover active:bg-primary-active",
                ring
              )}
            >
              <Icon name="download" size={16} strokeWidth={1.75} />
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <main id="main" className="mx-auto w-full max-w-[880px] flex-1 px-3 pt-5 pb-16 md:px-10 md:pt-14 md:pb-30 print:max-w-none print:p-0">
        <article className="resume-paper flex flex-col gap-8 rounded-[14px] bg-white px-[22px] py-7 text-[#18181B] shadow-[0_0_0_1px_rgba(24,24,27,0.08),0_24px_64px_-32px_rgba(24,24,27,0.25)] md:rounded-[18px] md:px-[72px] md:py-16 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_100px_-40px_rgba(0,0,0,0.9)] print:rounded-none print:p-0 print:shadow-none!">
          <header className="flex flex-col gap-2.5 border-b-2 border-[#18181B] pb-6">
            <h1 className="font-display text-[36px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[48px]">{site.name}</h1>
            <span className="text-[17px] font-medium text-[#047857]">Full-Stack Software Developer · Laravel · React · Node.js</span>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1.5 text-sm text-[#52525B]">
              <span>{site.location} · Open to remote</span>
              <span>{site.email}</span>
              <span>{site.linkedin.display}</span>
              <span>{site.github.display}</span>
            </div>
          </header>

          <section className="flex flex-col gap-2.5" aria-labelledby="r-summary">
            <h2 id="r-summary" className={h2}>
              SUMMARY
            </h2>
            <p className="text-[15px] leading-[1.7] text-[#27272A]">
              Full-stack developer experienced in Laravel, React and Node.js, with a background in training developers and
              leading client-facing projects. BS (Hons) IT graduate with international client-management experience,
              passionate about continuous learning, research and building impactful software.
            </p>
          </section>

          <section className="flex flex-col gap-[18px]" aria-labelledby="r-exp">
            <h2 id="r-exp" className={h2}>
              EXPERIENCE
            </h2>
            {jobs.map((j) => (
              <div key={j.role} className="flex flex-col gap-1.5 break-inside-avoid">
                <div className={row}>
                  <span className="text-base font-semibold">
                    {j.role} <span className="font-normal text-[#52525B]">· {j.company}</span>
                  </span>
                  <span className={date}>{j.dates}</span>
                </div>
                <ul className="flex list-disc flex-col gap-[3px] pl-[18px] text-sm leading-[1.6] text-[#3F3F46]">
                  {j.resumeBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="r-proj">
            <h2 id="r-proj" className={h2}>
              PROJECT
            </h2>
            <div className="flex flex-col gap-1.5">
              <div className={row}>
                <span className="text-base font-semibold">
                  {fyp.title} <span className="font-normal text-[#52525B]">· Final Year Project</span>
                </span>
                <span className={date}>{fyp.year}</span>
              </div>
              <p className="text-sm leading-[1.6] text-[#3F3F46]">
                {fyp.summary} {fyp.tech.join(" · ")}.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="r-skills">
            <h2 id="r-skills" className={h2}>
              SKILLS
            </h2>
            <dl className="grid grid-cols-1 gap-x-5 text-sm leading-[1.6] md:grid-cols-[130px_minmax(0,1fr)] print:grid-cols-[130px_minmax(0,1fr)]">
              {resumeSkills.map((s) => (
                <div key={s.k} className="contents">
                  <dt className="font-semibold">{s.k}</dt>
                  <dd className="mb-1.5 text-[#3F3F46]">{s.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="r-edu">
            <h2 id="r-edu" className={h2}>
              EDUCATION
            </h2>
            <div className={row}>
              <span className="text-base font-semibold">
                {education.degree} <span className="font-normal text-[#52525B]">· {education.school}</span>
              </span>
              <span className={date}>{education.years}</span>
            </div>
            <span className="text-sm text-[#3F3F46]">
              CGPA {education.cgpa} / {education.cgpaOf} · Final Year Project: {education.fyp.title}
            </span>
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="r-ws">
            <h2 id="r-ws" className={h2}>
              WORKSHOPS
            </h2>
            {workshops.map((w) => (
              <div key={w.title} className="flex gap-4 text-sm leading-[1.6]">
                <span className="w-10 flex-none pt-px font-mono text-xs text-[#63636B]">{w.year}</span>
                <span className="text-[#27272A]">{w.resume}</span>
              </div>
            ))}
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
