"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Quote, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

type ManagingPartnerMessageProps = {
  storyAction?: "link" | "modal";
};

export function ManagingPartnerMessage({ storyAction = "link" }: ManagingPartnerMessageProps) {
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    if (!storyOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStoryOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [storyOpen]);

  return (
    <>
      <section className="section-pad overflow-hidden bg-[#08082f] text-white">
        <div className="container-shell">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
              <div>
                <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#17175e] to-[#08082f]">
                    <Image
                      src="/images/managing-partner.jpg"
                      alt="Engr. Olaoluwa Ogunbode, Managing Partner of Ratsonbase Construction Limited"
                      fill
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-bold">Engr. Olaoluwa Ogunbode</p>
                    <p className="mt-1 text-xs uppercase tracking-[.14em] text-white/55">Managing Partner, Ratsonbase Construction Limited</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-3xl border border-white/10 bg-white/[.06] p-7 sm:p-10 lg:p-12">
                <Quote size={38} className="text-[#e9a0df]" aria-hidden="true" />
                <p className="mt-7 max-w-3xl text-xl font-medium leading-[1.65] tracking-[-.02em] text-white sm:text-2xl">At Ratsonbase, our commitment is to deliver projects that meet our clients’ expectations through professionalism, integrity and a consistent focus on quality. We believe that successful construction is built on careful planning, teamwork, safety and timely delivery. Every project is an opportunity to earn our clients’ trust and create lasting value.</p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-sm font-bold text-white">Engr. Olaoluwa Ogunbode</p>
                    <p className="mt-1 text-xs text-white/55">Managing Partner</p>
                  </div>
                  {storyAction === "modal" ? (
                    <button type="button" onClick={() => setStoryOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-[#f2a5e8] transition hover:border-white/50 hover:bg-white/10 hover:text-white">
                      View full story <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <Link href="/about" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-[#f2a5e8] transition hover:border-white/50 hover:bg-white/10 hover:text-white">
                      View story <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {storyAction === "modal" && storyOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#05051f]/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setStoryOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="managing-partner-story-title"
            className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] border border-white/10 bg-white text-slate-700 shadow-2xl sm:rounded-[1.75rem]"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur sm:px-9">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.16em] text-accent">Leadership · Ratsonbase</p>
                <h2 id="managing-partner-story-title" className="mt-2 font-heading text-2xl font-bold leading-tight text-brand sm:text-3xl">The story of Engr. Olaoluwa Ogunbode</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">Managing Partner, Ratsonbase Construction Limited</p>
              </div>
              <button type="button" onClick={() => setStoryOpen(false)} aria-label="Close Managing Partner story" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-brand transition hover:border-accent hover:bg-accent hover:text-white">
                <X size={19} />
              </button>
            </div>
            <div className="space-y-5 px-6 py-7 text-sm leading-8 sm:px-9 sm:py-9 sm:text-base">
              <p className="text-lg font-semibold leading-8 text-brand">A practical approach to building, guided by purpose, discipline and lasting value.</p>
              <p>Engr. Olaoluwa Ogunbode serves as the Managing Partner of Ratsonbase Construction Limited. His professional experience spans key stages of construction project delivery, including project conceptualisation, planning, scheduling, budgeting and coordination.</p>
              <p>His approach begins with understanding what each client wants to achieve. A successful project requires more than a design or a construction programme. It calls for careful consideration of the brief, the site, available resources, priorities and the people who will use the finished space. He places importance on bringing these elements together before and throughout delivery.</p>
              <p>At Ratsonbase, this approach informs the company's work across residential, commercial and industrial sectors. From early planning and procurement to construction, finishing and property solutions, the focus is on clear communication, responsible execution and attention to the details that shape the final result.</p>
              <p>He believes that trust is earned through consistent conduct: being clear about expectations, taking responsibility for decisions, maintaining safety and working collaboratively. These principles reflect the values that guide Ratsonbase: integrity, safety, teamwork, excellence and promptness.</p>
              <p>For Engr. Ogunbode, every project is an opportunity to turn an ambition into a well-considered, dependable outcome. The goal is not simply to complete a structure, but to deliver work that serves its purpose, respects the client's investment and creates lasting value.</p>
              <blockquote className="rounded-2xl border-l-4 border-accent bg-[#f7f6fc] px-5 py-5 font-medium leading-7 text-brand sm:px-7">
                “Every project is an opportunity to earn our clients’ trust and create lasting value.”
              </blockquote>
              <div className="border-t border-slate-100 pt-5">
                <p className="font-bold text-brand">Engr. Olaoluwa Ogunbode</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[.13em] text-slate-500">Managing Partner · Ratsonbase Construction Limited</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
