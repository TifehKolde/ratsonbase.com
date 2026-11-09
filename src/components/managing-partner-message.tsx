import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";

const portrait = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1100&q=88";

export function ManagingPartnerMessage() {
  return (
    <section className="section-pad overflow-hidden bg-[#08082f] text-white">
      <div className="container-shell">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
            <div>
              <p className="eyebrow text-[#f2a5e8]">Leadership perspective</p>
              <h2 className="mt-6 max-w-sm text-4xl font-bold leading-[1.04] tracking-[-.05em] sm:text-5xl">A word from our Managing Partner.</h2>
              <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-white/5">
                <div role="img" aria-label="Temporary portrait placeholder for the Managing Partner" className="aspect-[4/4.3] bg-cover bg-center" style={{ backgroundImage: `url("${portrait}")` }} />
                <div className="p-5">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[.62rem] font-bold uppercase tracking-[.14em] text-[#f2a5e8]">Temporary portrait</span>
                  <p className="mt-3 text-lg font-bold">Managing Partner</p>
                  <p className="mt-1 text-xs uppercase tracking-[.14em] text-white/45">Ratsonbase Construction Limited</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-white/[.06] p-7 sm:p-10 lg:p-12">
              <Quote size={38} className="text-[#e9a0df]"/>
              <p className="mt-7 max-w-3xl text-2xl font-medium leading-[1.55] tracking-[-.025em] text-white sm:text-3xl">Our leadership commitment is to approach every project with care, communicate clearly and uphold the standards our clients trust us to deliver.</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <p className="text-xs leading-6 text-white/45">Draft company message — to be replaced with the Managing Partner's approved statement.</p>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#f2a5e8] transition hover:text-white">Our story <ArrowUpRight size={16}/></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
