"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://construction-api-qv4x.onrender.com").replace(/\/$/, "");

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch(API_BASE_URL + "/api/v1/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, first_name: firstName || undefined }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.error?.message || "We could not complete your subscription. Please try again.");
      setStatus(payload.data?.message || "You are subscribed. Thank you for joining us.");
      setEmail("");
      setFirstName("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="newsletter-form">
      <div className="grid gap-3 sm:grid-cols-[.7fr_1.3fr_auto]">
        <input value={firstName} onChange={e=>setFirstName(e.target.value)} aria-label="First name (optional)" placeholder="First name" className="min-h-12 min-w-0 rounded-full border border-white/15 bg-white/[.07] px-5 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#e9a0df]"/>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} aria-label="Email address" placeholder="Your email address" className="min-h-12 min-w-0 rounded-full border border-white/15 bg-white/[.07] px-5 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#e9a0df]"/>
        <button type="submit" disabled={loading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white transition hover:bg-[#980281] disabled:opacity-60">{loading?<LoaderCircle className="animate-spin" size={17}/>:<>Subscribe <ArrowRight size={16}/></>}</button>
      </div>
      {status && <p role="status" className="mt-3 flex items-start gap-2 text-xs leading-6 text-white/75"><CheckCircle2 size={15} className="mt-1 shrink-0 text-[#e9a0df]"/>{status}</p>}
      <p className="mt-3 text-[.68rem] leading-5 text-white/35">By subscribing, you agree to receive occasional updates from Ratsonbase. You can unsubscribe at any time.</p>
    </form>
  );
}
