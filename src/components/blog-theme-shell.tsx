"use client";

import type { ReactNode } from "react";

/** Insights pages intentionally use the site's light editorial theme. */
export function BlogThemeShell({ children }: { children: ReactNode }) {
  return <div data-blog-theme="light">{children}</div>;
}
