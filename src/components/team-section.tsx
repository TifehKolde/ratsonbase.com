import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const team = [
  { name: "Engr. Olaoluwa Ogunbode", role: "Managing Partner", initials: "OO", focus: "Construction management professional with over ten years of experience in project conceptualisation, planning, scheduling, budgeting and delivery." },
  { name: "Emmanuel Olanubi", role: "Architect", initials: "EO", focus: "Architect focused on sustainable and affordable design solutions, with experience across architectural design, adaptive reuse and facility management." },
  { name: "Olumide Odunsoga", role: "Chief Operating Officer", initials: "OO", focus: "Supports the coordination of company operations and the delivery of organisational priorities." },
  { name: "Tayomi Ogunbode", role: "HR / Admin", initials: "TO", focus: "Supports people operations and administrative coordination across the company." },
  { name: "Engr. Adeshola Habeeb", role: "Site Manager", initials: "AH", focus: "Supports on-site coordination and the practical execution of construction activities." },
  { name: "Kofo George", role: "Corporate Communications Officer", initials: "KG", focus: "Supports corporate communication and the way Ratsonbase engages with its stakeholders." },
  { name: "Mohammed Kane", role: "Project Supervisor", initials: "MK", focus: "Supports project supervision and coordination throughout site activities." },
  { name: "Boluwatife Elujah", role: "Digital Media Specialist", initials: "BE", focus: "Supports the company's digital presence and media communications." },
  { name: "Damilolas Odungbesan", role: "Accountant", initials: "DO", focus: "Supports financial record-keeping and accounting activities." },
];

export function TeamSection() {
  return (
    <section className="section-pad bg-[#f6f6fc]">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div><h2 className="mt-6 max-w-xl text-4xl font-bold leading-[1.02] text-brand sm:text-5xl">The people bringing every project to life.</h2></div>
            <p className="max-w-xl text-base leading-8 text-slate-500 lg:justify-self-end">Our team brings together construction management, architecture, operations, site supervision and professional support. Each role contributes to the standards and coordination behind our work.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person, index) => (
            <Reveal key={person.name} delay={(index % 3) * .07}>
              <article className="group h-full overflow-hidden rounded-2xl border border-[#e5e5f0] bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(1,0,110,.10)]">
                <div className="relative grid aspect-[16/9] place-items-center overflow-hidden bg-gradient-to-br from-brand to-[#292978]">
                  <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10" />
                  <div className="absolute -bottom-20 -left-8 h-52 w-52 rounded-full border border-white/10" />
                  <span className="relative grid h-24 w-24 place-items-center rounded-full border border-white/25 bg-white/10 font-heading text-3xl font-bold text-white backdrop-blur">{person.initials}</span>
                  <span className="absolute left-5 top-5 text-xs font-bold tracking-[.18em] text-white/60">0{index + 1}</span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[.14em] text-accent">{person.role}</p>
                  <h3 className="mt-3 text-xl font-bold text-brand">{person.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{person.focus}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-xs leading-6 text-slate-400">Initial-based portraits are used until approved team photographs are provided.</p>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-2xl text-sm leading-7 text-slate-600">Meet the people responsible for the work, the decisions and the standards that define Ratsonbase.</p>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-brand transition hover:text-accent">Get in touch <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>
  );
}
