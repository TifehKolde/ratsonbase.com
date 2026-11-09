import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function ManagingPartnerMessage() {
  return (
    <section className="section-pad overflow-hidden bg-[#08082f] text-white">
      <div className="container-shell">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
            <div>
              <p className="eyebrow text-[#f2a5e8]">Company leadership</p>
              <h2 className="mt-6 max-w-sm text-4xl font-bold leading-[1.04] tracking-[-.05em] sm:text-5xl">A word from our Managing Partner.</h2>
              <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-white/5">
                <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-[#17175e] to-[#08082f]">
                  <span className="grid h-28 w-28 place-items-center rounded-full border border-white/25 bg-white/10 font-heading text-4xl font-bold text-white">OO</span>
                </div>
                <div className="p-5">
                  <p className="text-lg font-bold">Engr. Olaoluwa Ogunbode</p>
                  <p className="mt-1 text-xs uppercase tracking-[.14em] text-white/45">Managing Partner, Ratsonbase Construction Limited</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-white/[.06] p-7 sm:p-10 lg:p-12">
              <Quote size={38} className="text-[#e9a0df]"/>
              <p className="mt-7 max-w-3xl text-xl font-medium leading-[1.65] tracking-[-.02em] text-white sm:text-2xl">At Ratsonbase, our commitment is to deliver projects that meet our clients’ expectations through professionalism, integrity and a consistent focus on quality. We believe that successful construction is built on careful planning, teamwork, safety and timely delivery. Every project is an opportunity to earn our clients’ trust and create lasting value.</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div><p className="text-sm font-bold text-white">Engr. Olaoluwa Ogunbode</p><p className="mt-1 text-xs text-white/45">Managing Partner</p></div>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#f2a5e8] transition hover:text-white">Our story <ArrowUpRight size={16}/></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
