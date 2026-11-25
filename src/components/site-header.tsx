"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ClipboardList, Menu, X } from "lucide-react";
import { TurnstileField } from "@/components/turnstile-field";

const links = [
  { label: "About us", href: "/about" },
  { label: "What we do", href: "/services" },
  { label: "Our portfolio", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader(_props: { forceSolid?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState("");
  const [quoteToken, setQuoteToken] = useState("");
  const [quoteResetKey, setQuoteResetKey] = useState(0);
  const quoteStartedAt = useRef(0);
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
    if (!open && !quoteModalOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); setQuoteModalOpen(false); } };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", closeOnEscape); };
  }, [open, quoteModalOpen]);

  function openQuoteModal() {
    setOpen(false);
    setQuoteStatus("");
    setQuoteToken("");
    quoteStartedAt.current = Date.now();
    setQuoteModalOpen(true);
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setQuoteSubmitting(true);
    setQuoteStatus("");
    const form = new FormData(formElement);
    const payload = {
      ...Object.fromEntries(form.entries()),
      form_elapsed_ms: Date.now() - quoteStartedAt.current,
      turnstile_token: quoteToken,
    };
    const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://construction-api-qv4x.onrender.com").replace(/\/$/, "");
    try {
      const response = await fetch(`${apiBase}/api/v1/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error?.message || "We could not submit your request. Please try again.");
      setQuoteStatus("Thank you. Your project enquiry has been submitted successfully.");
      formElement.reset();
      setQuoteResetKey(value => value + 1);
    } catch (error) {
      setQuoteStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setQuoteSubmitting(false);
    }
  }

  const transparent = !scrolled;
  const headerClass =
    "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
    (transparent
      ? "border-0 bg-transparent text-white shadow-none"
      : "border-0 bg-white/75 text-slate-950 shadow-[0_8px_30px_rgba(10,10,40,.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70");

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
        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(link.href + "/") ? "page" : undefined} className={"text-[12px] font-semibold uppercase tracking-[.07em] transition hover:text-accent " + (pathname === link.href ? "text-accent" : transparent ? "text-white/90" : "text-slate-950")}>{link.label}</Link>)}
        </nav>
        <button type="button" onClick={openQuoteModal} className="hidden items-center gap-1.5 rounded-[8px] bg-accent px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#980281] lg:inline-flex">Request a quote <ArrowUpRight size={16}/></button>
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
                    <Link href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className={"flex min-h-12 items-center justify-between gap-4 border-b border-slate-100 py-3 text-sm font-semibold normal-case tracking-normal transition hover:text-accent sm:text-base " + (pathname === link.href ? "text-accent" : "text-slate-950")}><span>{link.label}</span><ArrowUpRight size={18} className="shrink-0 text-slate-300"/></Link>
                  </motion.div>)}
                </nav>
              </div>
              <div className="shrink-0 border-t border-slate-100 bg-[#f8f8fc] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6">
                <p className="text-sm leading-6 text-slate-500">Have a project in mind? Tell us what you are planning.</p>
                <button type="button" onClick={openQuoteModal} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#980281]">Request a quote <ArrowUpRight size={17}/></button>
                <a href="mailto:hello@ratsonbase.com" className="mt-4 block text-center text-xs font-semibold text-brand">hello@ratsonbase.com</a>
              </div>
            </motion.aside>
          </>}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {quoteModalOpen && (
            <motion.div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-[#05051f]/70 px-4 py-6 backdrop-blur-sm sm:items-center sm:py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setQuoteModalOpen(false); }}>
              <motion.div role="dialog" aria-modal="true" aria-labelledby="quote-modal-title" className="relative my-auto w-full max-w-3xl rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-9" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ duration: .22 }}>
                <button type="button" onClick={() => setQuoteModalOpen(false)} aria-label="Close quote request" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-accent hover:text-accent"><X size={19}/></button>
                <div className="pr-12">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-accent"><ClipboardList size={15}/> Request a Quote</span>
                  <h2 id="quote-modal-title" className="mt-3 text-2xl font-bold text-brand sm:text-3xl">Tell us about your project.</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Share a few details and our team will get back to you to discuss your project.</p>
                </div>
                <form onSubmit={submitQuote} className="mt-7 grid gap-5">
                  <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="modal-quote-website">Leave this field empty</label>
                    <input id="modal-quote-website" name="website" type="text" tabIndex={-1} autoComplete="off"/>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Full name<input name="name" required maxLength={120} autoComplete="name" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Email address<input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Phone number<input name="phone" required maxLength={40} autoComplete="tel" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Project type<select name="project_type" required className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-accent"><option value="">Select a project type</option><option>Construction</option><option>Renovation</option><option>Engineering</option><option>Consultation</option><option>Other</option></select></label>
                  </div>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Company (optional)<input name="company" maxLength={160} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Project location<input name="location" maxLength={180} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Tell us about your project<textarea name="project_description" required maxLength={5000} rows={4} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Estimated budget (optional)<input name="budget" maxLength={100} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Preferred start date (optional)<input name="preferred_start_date" type="date" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent"/></label>
                  </div>
                  <TurnstileField onTokenChange={setQuoteToken} resetKey={quoteResetKey} theme="light"/>
                  <button disabled={quoteSubmitting || !quoteToken} className="flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:bg-[#980281] disabled:cursor-not-allowed disabled:opacity-60">{quoteSubmitting ? "Submitting…" : "Submit quote request"} <ArrowUpRight size={16}/></button>
                  {quoteStatus && <p role="status" aria-live="polite" className="text-sm text-slate-600">{quoteStatus}</p>}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
