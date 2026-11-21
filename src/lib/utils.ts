import { createCn } from "cn/config"

/**
 * Class merger that knows the custom theme keys in app/globals.css, so e.g.
 * `text-h3` (font size) and `text-muted-foreground` (colour) don't cancel out,
 * and `shadow-card` / `shadow-glow` merge as shadows.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "body-lg", "caption"] }],
      shadow: [{ shadow: ["card", "card-hover", "glow", "cta", "code", "toast"] }],
    },
  },
})
