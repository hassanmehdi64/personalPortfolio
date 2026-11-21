"use client"

import { useSyncExternalStore } from "react"

const noop = () => () => {}

/**
 * Shows the path the visitor asked for in the fake terminal.
 * The 404 page is prerendered once for every missing URL, so the real path is
 * only known in the browser; the server snapshot keeps hydration consistent.
 */
export function NotFoundPath() {
  const path = useSyncExternalStore(
    noop,
    () => window.location.pathname,
    () => "~/404"
  )
  return <>{path}</>
}
