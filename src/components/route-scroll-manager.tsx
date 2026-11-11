"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Start each new route at the top of the page.
 * useLayoutEffect runs before the browser paints the newly navigated page,
 * preventing the previous route's scroll position from clipping its hero.
 */
export function RouteScrollManager() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
