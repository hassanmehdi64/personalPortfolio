import Image from "next/image"
import { Icon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { education, stats } from "@/content/home"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"
import { card, h2, kicker } from "./styles"

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page section-py">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Portrait (4:5 desktop · 16:10 tablet · 1:1 mobile) */}
        <Reveal className="relative aspect-square w-full overflow-hidden rounded-[24px] border border-tint-border bg-card shadow-[0_0_0_6px_var(--tint),0_30px_80px_-30px_rgba(16,185,129,0.35)] md:aspect-[16/10] lg:aspect-[4/5]">
          <Image
            src="/profile.png"
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 440px, (min-width: 768px) 700px, 100vw"
            className="object-cover object-[50%_30%]"
          />
          <div className="absolute right-5 bottom-5 left-5 flex items-center gap-3 rounded-[14px] border border-border bg-nav px-4 py-3.5 backdrop-blur-[10px]">
            <span className="flex size-9 flex-none items-center justify-center rounded-md bg-tint text-accent-text">
              <Icon name="cap" />
            </span>
            <div className="flex min-w-0 flex-col leading-[1.35]">
              <span className="text-sm font-semibold">{education.degree}</span>
              <span className="text-[13px] text-muted-foreground">{education.school}</span>
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="flex flex-col gap-6">
          <span className={kicker}>{"// about"}</span>
          <h2 id="about-title" className={h2}>
            Engineer by training, communicator by habit.
          </h2>
          <p className="text-base leading-[1.7] text-muted-foreground md:text-lg">
            I&apos;m a BS (Hons) IT graduate from Karakorum International University with professional experience as a
            Laravel developer and as a web developer and trainer.
          </p>
          <p className="text-base leading-[1.7] text-muted-foreground md:text-lg">
            International textile merchandising taught me to communicate clearly with clients and deliver on time, and I
            bring that to every software project. I&apos;m passionate about continuous learning, research and building
            software that makes an impact.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex h-8 items-center gap-2 rounded-[8px] border border-border px-3 text-[13px] text-muted-foreground">
              <Icon name="pin" size={14} />
              {site.location}
            </span>
            <span className="inline-flex h-8 items-center gap-2 rounded-[8px] border border-border px-3 text-[13px] text-muted-foreground">
              <Icon name="globe" size={14} />
              Open to remote
            </span>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, k) => (
          <Reveal key={s.label} index={k} className={cn(card, "flex flex-col gap-1.5 p-6")}>
            <span className="font-display text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[40px]">
              {s.value}
              <span className="text-accent-text">{s.suffix}</span>
            </span>
            <span className="text-sm text-muted-foreground">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
