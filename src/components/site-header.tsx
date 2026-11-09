"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-brand backdrop-blur">
      <div className="container-shell flex h-[78px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Ratsonbase home">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
            <span className="font-heading text-2xl font-extrabold">R</span>
          </span>
          <span className="leading-none">
            <span className="block font-heading text-[1.08rem] font-extrabold tracking-[-.055em]">RATSONBASE</span>
            <span className="mt-1 block text-[.57rem] font-bold tracking-[.2em] text-slate-500">CONSTRUCTION LIMITED</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-accent">{link.label}</Link>)}
        </nav>
        <Link href="/contact" className="hidden items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-[#980281] lg:inline-flex">
          Request a quote <ArrowUpRight size={16} />
        </Link>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <nav className="border-t border-slate-100 bg-white px-6 py-4 lg:hidden" aria-label="Mobile navigation">
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 last:border-0">{link.label}</Link>)}
        <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white">Request a quote <ArrowUpRight size={16} /></Link>
      </nav>}
    </header>
  );
}
