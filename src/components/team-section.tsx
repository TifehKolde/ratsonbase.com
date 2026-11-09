import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const team = [
  { number: "01", role: "Leadership", focus: "Direction, standards and responsible decisions.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85", position: "center 34%" },
  { number: "02", role: "Project delivery", focus: "Planning, coordination and on-site execution.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85", position: "center 30%" },
  { number: "03", role: "Technical expertise", focus: "Practical knowledge and considered solutions.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85", position: "center 30%" },
];

export function TeamSection() {
  return (
    <section className="section-pad bg-[#f6f6fc]">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div><p className="eyebrow">People behind the work</p><h2 className="mt-6 max-w-xl text-4xl font-bold leading-[1.02] text-brand sm:text-5xl lg:text-6xl">Good projects start with good people.</h2></div>
            <p className="max-w-xl text-base leading-8 text-slate-500 lg:justify-self-end">Our work is shaped by collaboration across leadership, project delivery and technical disciplines. The right people make the difference between a plan and a result.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {team.map((person, index) => (
            <Reveal key={person.number} delay={index * .12}>
              <article className="team-card group overflow-hidden rounded-2xl border border-[#e5e5f0] bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(1,0,110,.13)]">
                <div className="relative aspect-[4/4.4] overflow-hidden bg-[#e8e8f3]">
                  <div role="img" aria-label={`Temporary portrait for Ratsonbase ${person.role}`} className="absolute inset-0 bg-cover transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${person.image}")`, backgroundPosition: person.position }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08082f]/75 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/20 px-3 py-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-white backdrop-blur">Temporary image</span>
                  <span className="absolute bottom-5 left-5 font-heading text-5xl font-bold tracking-[-.07em] text-white/80">{person.number}</span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[.16em] text-accent">Ratsonbase team</p>
                  <h3 className="mt-3 text-2xl font-bold text-brand">{person.role}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{person.focus}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-xs leading-6 text-slate-400">Portraits are temporary stock images for layout preview and must be replaced with approved Ratsonbase team photographs before launch.</p>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-2xl text-sm leading-7 text-slate-600">Meet the people responsible for the work, the decisions and the standards that define Ratsonbase.</p>
          <Link href="/about" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-brand transition hover:text-accent">More about our company <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>
  );
}
