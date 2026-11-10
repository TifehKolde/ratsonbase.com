"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

export function BlogThemeShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(window.localStorage.getItem("ratsonbase-blog-theme") === "dark");
  }, []);

  function toggleTheme() {
    setDark((current) => {
      const next = !current;
      window.localStorage.setItem("ratsonbase-blog-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <div className={dark ? "dark" : ""}>
      {children}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? "Switch blog to light mode" : "Switch blog to dark mode"}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed right-5 top-[90px] z-[60] grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-brand shadow-lg transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:border-white/15 dark:bg-slate-900 dark:text-white sm:right-7"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
