import { ArrowUpRight, Building2, HardHat, Users2 } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const disciplines = [
  { number: "01", title: "Leadership", text: "Clear direction, responsible decisions and a shared commitment to quality.", icon: Building2 },
  { number: "02", title: "Project delivery", text: "People focused on planning, coordination and keeping every detail moving.", icon: HardHat },
  { number: "03", title: "Technical expertise", text: "Practical knowledge and considered solutions at every stage of the work.", icon: Users2 },
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
          {disciplines.map((item, index) => {
            const Icon = item.icon;
            return <Reveal key={item.number} delay={index * .09}>
              <article className="group h-full overflow-hidden rounded-2xl border border-[#e5e5f0] bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(1,0,110,.1)]">
                <div className="relative flex aspect-[5/4] items-end overflow-hidden bg-[radial-gradient(circle_at_75%_20%,rgba(180,4,154,.22),transparent_30%),linear-gradient(135deg,#eeeeff,#dadaf4_55%,#fceafa)] p-7">
                  <span className="absolute right-6 top-5 font-heading text-7xl font-bold tracking-[-.08em] text-brand/10">{item.number}</span>
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/70 bg-white/70 text-brand shadow-sm backdrop-blur transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"><Icon size={27}/></div>
                  <span className="absolute bottom-7 right-7 text-[.65rem] font-bold uppercase tracking-[.16em] text-brand/45">Ratsonbase team</span>
                </div>
                <div className="p-7"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-accent">Our people</p><h3 className="mt-3 text-2xl font-bold text-brand">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{item.text}</p></div>
              </article>
            </Reveal>;
          })}
        </div>
        <div className="mt-9 flex flex-col gap-4 rounded-2xl border border-brand/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-2xl text-sm leading-7 text-slate-600">Meet the people responsible for the work, the decisions and the standards that define Ratsonbase.</p>
          <Link href="/about" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-brand transition hover:text-accent">More about our company <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>
  );
}
