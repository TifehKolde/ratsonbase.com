"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("pageshow", updateScrollState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("pageshow", updateScrollState);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  const transparent = !scrolled;
  const headerClass =
    "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
    (transparent
      ? "border-b border-white/15 bg-transparent text-white"
      : "border-b border-white/50 bg-white/85 text-slate-950 shadow-[0_8px_30px_rgba(10,10,40,.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/75");

  return (
    <header data-header-state={transparent ? "transparent" : "solid"}
      className={headerClass}>
      <div className="container-shell flex h-[72px] items-center justify-between sm:h-[78px]">
        <Link href="/" className="flex min-w-0 items-center" aria-label="Ratsonbase Construction Limited home">
          {transparent ? (
            <span className="flex items-center gap-2.5">
              <Image src="/logos/ratson%20logo%20white.png" alt="" width={46} height={46} priority className="h-10 w-10 object-contain sm:h-11 sm:w-11" />
              <span className="leading-none text-white">
                <span className="block font-heading text-base font-extrabold tracking-[-.055em] sm:text-lg">RATSONBASE</span>
                <span className="mt-1 block text-[.52rem] font-bold tracking-[.16em] text-white/75 sm:text-[.58rem]">CONSTRUCTION LIMITED</span>
              </span>
            </span>
          ) : (
            <Image src="/logos/ratsonbase-logo.png" alt="Ratsonbase Construction Limited" width={220} height={64} priority sizes="(max-width: 640px) 175px, 210px" className="h-11 w-[175px] object-cover object-center sm:h-12 sm:w-[205px]" />
          )}
        </Link>
        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(link.href + "/") ? "page" : undefined} className={"text-sm font-semibold transition hover:text-accent " + (pathname === link.href ? "text-accent" : transparent ? "text-white/90" : "text-slate-950")}>{link.label}</Link>)}
        </nav>
        <Link href="/contact" className="hidden items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-[#980281] lg:inline-flex">Request a quote <ArrowUpRight size={16}/></Link>
        <button type="button" className={"grid h-10 w-10 place-items-center rounded-full transition lg:hidden " + (transparent ? "border border-white/40 text-white hover:bg-white/10" : "border border-slate-200 text-slate-950 hover:border-brand hover:bg-brand-light")} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && <>
            <motion.button type="button" aria-label="Close navigation backdrop" className="fixed inset-0 z-[9998] cursor-default bg-[#05051f]/60 backdrop-blur-[3px] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }} onClick={() => setOpen(false)}/>
            <motion.aside id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="fixed inset-y-0 right-0 z-[9999] flex w-[min(88vw,420px)] max-w-full flex-col bg-white text-slate-950 shadow-2xl lg:hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }}>
              <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-100 px-5 sm:px-6">
                <Link href="/" onClick={() => setOpen(false)} aria-label="Ratsonbase home" className="flex items-center">
                  <Image src="/logos/ratsonbase-logo.png" alt="Ratsonbase Construction Limited" width={220} height={64} sizes="175px" className="h-11 w-[175px] object-cover object-center" />
                </Link>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-brand"><X size={20}/></button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-1 sm:px-6 sm:pb-8 sm:pt-2">
                <nav className="grid" aria-label="Mobile navigation links">
                  {links.map((link,index) => <motion.div key={link.href} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .04 + index * .045 }}>
                    <Link href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className={"flex min-h-14 items-center justify-between gap-4 border-b border-slate-100 py-4 text-lg font-semibold tracking-[-.035em] transition hover:text-accent sm:text-xl " + (pathname === link.href ? "text-accent" : "text-slate-950")}><span>{link.label}</span><ArrowUpRight size={18} className="shrink-0 text-slate-300"/></Link>
                  </motion.div>)}
                </nav>
              </div>
              <div className="shrink-0 border-t border-slate-100 bg-[#f8f8fc] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6">
                <p className="text-sm leading-6 text-slate-500">Have a project in mind? Tell us what you are planning.</p>
                <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#980281]">Request a quote <ArrowUpRight size={17}/></Link>
                <a href="mailto:hello@ratsonbase.com" className="mt-4 block text-center text-xs font-semibold text-brand">hello@ratsonbase.com</a>
              </div>
            </motion.aside>
          </>}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
