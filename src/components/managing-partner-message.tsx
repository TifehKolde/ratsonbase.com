import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function ManagingPartnerMessage() {
  return (
    <section className="section-pad overflow-hidden bg-[#08082f] text-white">
      <div className="container-shell">
        <Reveal>
          <div className="relative grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
            <div className="relative">
              <p className="eyebrow text-[#f2a5e8]">Leadership perspective</p>
              <h2 className="mt-6 max-w-sm text-4xl font-bold leading-[1.04] tracking-[-.05em] sm:text-5xl">A word from our Managing Partner.</h2>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/10 text-lg font-bold text-[#f2a5e8]">MP</div>
                <div><p className="font-bold">Managing Partner</p><p className="mt-1 text-xs uppercase tracking-[.14em] text-white/45">Ratsonbase Construction Limited</p></div>
              </div>
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-white/[.06] p-7 sm:p-10 lg:p-12">
              <Quote size={38} className="text-[#e9a0df]"/>
              <p className="mt-7 max-w-3xl text-2xl font-medium leading-[1.55] tracking-[-.025em] text-white sm:text-3xl">Our leadership commitment is to approach every project with care, communicate clearly and uphold the standards our clients trust us to deliver.</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <p className="text-xs leading-6 text-white/45">A company message pending the Managing Partner's approved personal statement and portrait.</p>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#f2a5e8] transition hover:text-white">Our story <ArrowUpRight size={16}/></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
