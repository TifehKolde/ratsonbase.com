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
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = 24;
    const step = card.getBoundingClientRect().width + gap;
    setActive(Math.max(0, Math.min(projects.length - 1, Math.round(track.scrollLeft / step))));
  };

  return (
    <section className="section-pad overflow-hidden">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.02] text-brand sm:text-5xl lg:text-6xl">{heading}</h2></div>
          <div className="flex items-center gap-3">
            <Link href="/projects" className="mr-2 text-sm font-bold text-brand transition hover:text-accent">All projects <ArrowUpRight className="ml-1 inline" size={15}/></Link>
            <button type="button" aria-label="Previous projects" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand transition hover:border-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft size={18}/></button>
            <button type="button" aria-label="Next projects" onClick={() => goTo(Math.min(projects.length - 1, active + 1))} disabled={active >= projects.length - 1} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand transition hover:border-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight size={18}/></button>
          </div>
        </div>
        <div ref={trackRef} onScroll={handleScroll} className="project-slider-track mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5" aria-label="Project carousel">
          {projects.map((project, index) => (
            <Reveal key={project.id} className="shrink-0 snap-start" delay={index * 0.05}>
            <article className="group w-[88%] max-w-[620px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_45px_rgba(1,0,110,.05)] sm:w-[72%] lg:w-[calc(50%-12px)]">
              <Link href={"/projects/" + project.slug} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand via-[#29296e] to-accent">
                  {project.featured_image ? <div role="img" aria-label={project.title} className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: "url(" + JSON.stringify(project.featured_image) + ")" }}/> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,.2),transparent_30%)]"/>}
                  <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[.65rem] font-bold uppercase tracking-[.15em] text-white backdrop-blur">{project.project_type}</span>
                  <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-brand opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={19}/></span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-accent">{project.location ? <><MapPin size={13}/>{project.location}</> : project.project_type}</div>
                  <h3 className="mt-3 text-2xl font-bold text-brand sm:text-3xl">{project.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">{project.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-brand">View project <ArrowUpRight size={16}/></span>
                </div>
              </Link>
            </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2" aria-label="Choose project slide">
          {projects.map((project, index) => <button key={project.id} type="button" aria-label={"Go to project " + (index + 1)} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)} className={"h-2 rounded-full transition-all " + (active === index ? "w-8 bg-accent" : "w-2 bg-slate-300 hover:bg-brand")}/>)}
        </div>
      </div>
    </section>
  );
}
