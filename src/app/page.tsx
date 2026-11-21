import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <FeaturedProjects />
        <Education />
        <Contact />
      </main>
      <SiteFooter onHome />
    </>
  )
}
