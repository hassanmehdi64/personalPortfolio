import { ContactForm } from "@/components/contact-form"
import { CopyEmail } from "@/components/copy-email"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"
import { card, focusRing, h2Big, kicker, lead } from "./styles"

const linkCard = cn(
  "flex min-w-0 items-center gap-3 rounded-[14px] border border-border bg-card px-4 py-3.5 text-foreground transition-colors hover:border-border-hover",
  focusRing
)

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-border bg-band">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 bg-size-[48px_48px] mask-[radial-gradient(ellipse_60%_60%_at_20%_30%,#000,transparent)]"
      />
      <div className="container-page section-py relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <span className={kicker}>{"// contact"}</span>
          <h2 id="contact-title" className={h2Big}>
            Let&apos;s build something together
          </h2>
          <p className={lead}>
            Have a role, a project or a research program in mind? I&apos;m open to full-time positions, freelance work and
            collaborations.
          </p>
          <div className={cn(card, "mt-2 flex items-center gap-3.5 p-4")}>
            <span className="flex size-11 flex-none items-center justify-center rounded-lg bg-tint text-accent-text">
              <Icon name="mail" size={20} />
            </span>
            <div className="flex min-w-0 flex-col leading-[1.35]">
              <span className="font-mono text-xs text-faint">EMAIL</span>
              <a
                href={`mailto:${site.email}`}
                className={cn("truncate rounded-sm text-base font-semibold text-foreground hover:text-accent-text", focusRing)}
              >
                {site.email}
              </a>
            </div>
            <CopyEmail email={site.email} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a href={site.linkedin.href} target="_blank" rel="noreferrer" className={linkCard}>
              <Icon name="linkedin" className="flex-none" />
              <span className="flex min-w-0 flex-col leading-[1.3]">
                <span className="text-sm font-semibold">LinkedIn</span>
                <span className="truncate text-[13px] text-muted-foreground">{site.linkedin.handle}</span>
              </span>
            </a>
            <a href={site.github.href} target="_blank" rel="noreferrer" className={linkCard}>
              <Icon name="github" className="flex-none" />
              <span className="flex min-w-0 flex-col leading-[1.3]">
                <span className="text-sm font-semibold">GitHub</span>
                <span className="truncate text-[13px] text-muted-foreground">{site.github.handle}</span>
              </span>
            </a>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="pin" size={16} className="text-accent-text" />
            {site.location} · Open to remote work
          </span>
        </Reveal>

        <Reveal index={1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
