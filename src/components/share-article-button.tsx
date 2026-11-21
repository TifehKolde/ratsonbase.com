"use client";

import { useState } from "react";
import { Briefcase, Check, Copy, Globe, MessageCircle, Send } from "lucide-react";

type ShareArticleButtonProps = {
  title: string;
  slug: string;
};

export function ShareArticleButton({ title, slug }: ShareArticleButtonProps) {
  const [message, setMessage] = useState("");
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ratsonbase.com").replace(/\/$/, "");
  const url = `${siteUrl}/blogs/${encodeURIComponent(slug)}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const socialLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Globe size={16} />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Briefcase size={16} />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: <MessageCircle size={16} />,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      icon: <Send size={16} />,
    },
  ];

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied");
    } catch {
      setMessage("Unable to copy link in this browser.");
    }
  }

  return (
    <div className="mt-7 flex flex-col items-center justify-center gap-3">
      <span className="text-[.65rem] font-extrabold uppercase tracking-[.16em] text-slate-500">
        Share this article
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share article on ${item.label}`}
            title={`Share on ${item.label}`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-brand/15 bg-white/85 px-3.5 text-xs font-bold text-brand shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:bg-[#fceafa] hover:text-accent dark:border-white/15 dark:bg-slate-900 dark:text-white"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={copyArticleLink}
          aria-label="Copy article link"
          title="Copy article link"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-brand/15 bg-brand px-3.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent"
        >
          {message === "Link copied" ? <Check size={16} /> : <Copy size={16} />}
          <span>{message === "Link copied" ? "Copied" : "Copy link"}</span>
        </button>
      </div>
      {message && (
        <span role="status" aria-live="polite" className="text-xs text-slate-500 dark:text-slate-400">
          {message}
        </span>
      )}
    </div>
  );
}
