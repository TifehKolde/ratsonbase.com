"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { PublicProject } from "@/lib/public-api";
import { Reveal } from "@/components/reveal";

export function ProjectCarousel({ projects, heading = "A closer look at our work", eyebrow = "Selected projects" }: {
  projects: PublicProject[];
  heading?: string;
  eyebrow?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (!projects.length) return null;

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.getBoundingClientRect().width + 24;
    setActive(Math.max(0, Math.min(projects.length - 1, Math.round(track.scrollLeft / step))));
  };

  return (
    <section className="section-pad overflow-hidden bg-[#f7f7fb]">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-8 border-b border-[#e2e2ed] pb-9 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.65rem,6vw,5.25rem)] font-bold leading-[.98] tracking-[-.065em] text-brand">{heading}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">A selection of spaces and projects shaped by considered planning, skilled delivery and attention to detail.</p>
            </div>
            <div className="flex items-center gap-3 md:pb-1">
              <Link href="/projects" className="mr-3 text-sm font-extrabold text-brand transition hover:text-accent">Explore all work <ArrowUpRight className="ml-1 inline" size={15}/></Link>
              <button type="button" aria-label="Previous projects" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} className="grid h-12 w-12 place-items-center rounded-full border border-brand/15 bg-white text-brand transition hover:border-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft size={18}/></button>
              <button type="button" aria-label="Next projects" onClick={() => goTo(Math.min(projects.length - 1, active + 1))} disabled={active >= projects.length - 1} className="grid h-12 w-12 place-items-center rounded-full border border-brand/15 bg-white text-brand transition hover:border-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight size={18}/></button>
            </div>
          </div>
        </Reveal>

        <div ref={trackRef} onScroll={handleScroll} className="project-slider-track mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5" aria-label="Selected Ratsonbase projects">
          {projects.map((project, index) => (
            <Reveal key={project.id} className="w-[88%] max-w-[760px] shrink-0 snap-start sm:w-[76%] lg:w-[calc(58%-12px)]" delay={index * 0.06}>
              <article className="group relative aspect-[4/3] min-h-[390px] overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#08082f] via-[#29296e] to-accent shadow-[0_18px_55px_rgba(1,0,110,.12)] sm:aspect-[16/10] sm:min-h-0">
                {project.featured_image ? (
                  <div role="img" aria-label={project.title} className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.045]" style={{ backgroundImage: "url(" + JSON.stringify(project.featured_image) + ")" }}/>
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,.22),transparent_28%),linear-gradient(135deg,rgba(1,0,110,.2),rgba(180,4,154,.5))]"/>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05051f]/95 via-[#05051f]/20 to-transparent"/>
                <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-7 sm:top-7">
                  <span className="rounded-full border border-white/30 bg-[#08082f]/45 px-4 py-2 text-[.62rem] font-bold uppercase tracking-[.15em] text-white backdrop-blur-md">{project.project_type}</span>
                  {project.status && <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[.62rem] font-bold uppercase tracking-[.15em] text-white/90 backdrop-blur-md">{project.status}</span>}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-9">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-white/75">{project.location && <><MapPin size={13}/>{project.location}</>}</div>
                  <div className="mt-3 flex items-end justify-between gap-5">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f2a5e8]">0{index + 1} / 0{projects.length}</p>
                      <h3 className="mt-2 max-w-xl font-heading text-2xl font-bold leading-tight tracking-[-.04em] sm:text-3xl lg:text-4xl">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-white/70">{project.description}</p>
                    </div>
                    <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand transition duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-white sm:h-14 sm:w-14"><ArrowUpRight size={21}/></span>
                  </div>
                </div>
                <Link href={"/projects/" + project.slug} aria-label={"Explore project: " + project.title} className="absolute inset-0 z-0"><span className="sr-only">View project</span></Link>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">Swipe or use arrows to explore</p>
          <div className="flex items-center gap-2" aria-label="Choose project slide">
            {projects.map((project, index) => <button key={project.id} type="button" aria-label={"Go to project " + (index + 1)} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)} className={"h-1.5 rounded-full transition-all " + (active === index ? "w-8 bg-accent" : "w-1.5 bg-slate-300 hover:bg-brand")}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}
