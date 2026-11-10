"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareArticleButton() {
  const [message, setMessage] = useState("");

  async function shareArticle() {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ratsonbase.com").replace(/\/$/, "");
    const url = new URL(window.location.pathname, siteUrl).toString();

    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Article link copied.");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setMessage("Could not share this article from this browser.");
      }
    }
  }

  return (
    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={shareArticle}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-4 text-xs font-bold text-brand shadow-sm dark:border-white/15 dark:bg-slate-900 dark:text-white transition hover:-translate-y-0.5 hover:border-accent hover:bg-[#fceafa] hover:text-accent"
      >
        <Share2 size={15} />
        Share article
      </button>
      {message && <span role="status" className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><Check size={13} />{message}</span>}
    </div>
  );
}
