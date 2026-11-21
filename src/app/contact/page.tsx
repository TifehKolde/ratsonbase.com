"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Mail, MessageSquare, ClipboardList, Send } from "lucide-react";
import { TurnstileField } from "@/components/turnstile-field";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://construction-api-qv4x.onrender.com").replace(/\/$/, "");

export default function ContactPage() {
  const [quoteStatus, setQuoteStatus] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [quoteToken, setQuoteToken] = useState("");
  const [contactToken, setContactToken] = useState("");
  const [quoteResetKey, setQuoteResetKey] = useState(0);
  const [contactResetKey, setContactResetKey] = useState(0);
  const quoteStartedAt = useRef(0);
  const contactStartedAt = useRef(0);

  useEffect(() => {
    quoteStartedAt.current = Date.now();
    contactStartedAt.current = Date.now();
  }, []);

  async function submitForm(
    event: FormEvent<HTMLFormElement>,
    endpoint: "quotes" | "contact",
    token: string,
    startedAt: number,
    setStatus: (value: string) => void,
    setSubmitting: (value: boolean) => void,
    resetTurnstile: () => void
  ) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitting(true);
    setStatus("");

    const form = new FormData(formElement);
    const payload = {
      ...Object.fromEntries(form.entries()),
      form_elapsed_ms: Date.now() - startedAt,
      turnstile_token: token,
    };

    try {
      const response = await fetch(`${API_BASE}/api/v1/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "We could not submit your request. Please try again.");
      }
      setStatus(
        endpoint === "quotes"
          ? "Thank you. Your project enquiry has been submitted successfully."
          : "Thank you for contacting Ratsonbase. Your message has been sent successfully."
      );
      formElement.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      resetTurnstile();
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Let's talk about what you're building."
          description="Tell us a little about your project or send us a general message. Our team will review your enquiry and get back to you."
          backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=88"
        />
        <section className="section-pad">
          <div className="container-shell">
            <Reveal>
              <div className="mb-12 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
                <div>
                  <h2 className="mt-5 text-4xl font-bold text-brand sm:text-5xl">Let’s understand what you need.</h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-slate-500">
                  Whether you are planning a new build, considering a renovation or simply have a question,
                  the first step is a clear conversation. Choose the form that best describes your enquiry.
                </p>
              </div>
            </Reveal>

            <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="mt-5 leading-8 text-slate-600">
                  For project estimates and service requests, use the Request a Quote form. For partnerships,
                  general questions and other enquiries, send us a message using the General Enquiry form.
                  You can also email us directly.
                </p>
                <div className="mt-8 grid gap-4">
                  <a href="mailto:hello@ratsonbase.com" className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-accent">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><Mail size={20} /></span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span>
                      <span className="mt-1 block text-sm font-bold text-brand">hello@ratsonbase.com</span>
                    </span>
                  </a>
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><MessageSquare size={20} /></span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Enquiries</span>
                      <span className="mt-1 block text-sm font-bold text-brand">Project and general enquiries</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-8">
                <form
                  id="request-quote"
                  onSubmit={(event) => submitForm(event, "quotes", quoteToken, quoteStartedAt.current, setQuoteStatus, setQuoteSubmitting, () => setQuoteResetKey(value => value + 1))}
                  className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(1,0,110,.06)] sm:p-9"
                >
                  <div className="mb-1">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-accent"><ClipboardList size={15} /> Request a Quote</span>
                    <h3 className="mt-3 text-2xl font-bold text-brand">Tell us about your project.</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Share your project requirements so our team can understand the scope and prepare to discuss the next steps.</p>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="quote-website">Leave this field empty</label>
                    <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Full name<input name="name" required maxLength={120} autoComplete="name" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Email address<input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Phone number<input name="phone" required maxLength={40} autoComplete="tel" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Project type<select name="project_type" required className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-accent"><option value="">Select a project type</option><option>Construction</option><option>Renovation</option><option>Engineering</option><option>Consultation</option><option>Other</option></select></label>
                  </div>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Company (optional)<input name="company" maxLength={160} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Project location<input name="location" maxLength={180} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Tell us about your project<textarea name="project_description" required maxLength={5000} rows={5} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Estimated budget (optional)<input name="budget" maxLength={100} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Preferred start date (optional)<input name="preferred_start_date" type="date" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  </div>
                  <TurnstileField onTokenChange={setQuoteToken} resetKey={quoteResetKey} theme="light" />
                  <button disabled={quoteSubmitting || !quoteToken} className="rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:bg-[#980281] disabled:opacity-60">{quoteSubmitting ? "Submitting…" : "Submit quote request"}</button>
                  {quoteStatus && <p role="status" aria-live="polite" className="text-sm text-slate-600">{quoteStatus}</p>}
                </form>

                <form
                  onSubmit={(event) => submitForm(event, "contact", contactToken, contactStartedAt.current, setContactStatus, setContactSubmitting, () => setContactResetKey(value => value + 1))}
                  className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(1,0,110,.06)] sm:p-9"
                >
                  <div className="mb-1">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-accent"><Send size={15} /> General Enquiry</span>
                    <h3 className="mt-3 text-2xl font-bold text-brand">Have a question for us?</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Use this form for general questions, partnerships, feedback or any other non-project enquiry.</p>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="contact-website">Leave this field empty</label>
                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Full name<input name="name" required maxLength={120} autoComplete="name" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">Email address<input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  </div>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Phone number (optional)<input name="phone" maxLength={40} autoComplete="tel" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Subject<input name="subject" required maxLength={180} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Your message<textarea name="message" required maxLength={5000} rows={5} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                  <TurnstileField onTokenChange={setContactToken} resetKey={contactResetKey} theme="light" />
                  <button disabled={contactSubmitting || !contactToken} className="rounded-full bg-brand px-7 py-4 text-sm font-bold text-white transition hover:bg-brand/90 disabled:opacity-60">{contactSubmitting ? "Sending…" : "Send general enquiry"}</button>
                  {contactStatus && <p role="status" aria-live="polite" className="text-sm text-slate-600">{contactStatus}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
