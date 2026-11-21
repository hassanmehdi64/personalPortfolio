"use client"

import { motion } from "motion/react"

type Tag = "div" | "section" | "li" | "article" | "header"

/**
 * Fade-and-rise on scroll (opacity 0→1, y 16→0, 500ms ease-out), once.
 * `index` staggers siblings by 60ms.
 * prefers-reduced-motion: globals.css forces [data-reveal] to its final state.
 */
export function Reveal({
  as = "div",
  index = 0,
  className,
  children,
  id,
  "aria-labelledby": labelledBy,
}: {
  as?: Tag
  index?: number
  className?: string
  children: React.ReactNode
  id?: string
  "aria-labelledby"?: string
}) {
  const Comp = motion[as]
  return (
    <Comp
      data-reveal=""
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
    >
      {children}
    </Comp>
  )
}
