"use client";

import { useEffect, useState } from "react";

export function ArticleReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="fixed inset-x-0 top-0 z-[120] h-[3px] bg-white/20" aria-label="Article reading progress"><div className="h-full bg-accent shadow-[0_0_12px_rgba(180,4,154,.55)] transition-[width] duration-100" style={{ width: progress + "%" }}/></div>;
}
