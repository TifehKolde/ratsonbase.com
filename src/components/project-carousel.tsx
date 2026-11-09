"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { PublicProject } from "@/lib/public-api";
import { Reveal } from "@/components/reveal";

function formatProjectDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

export function ProjectCarousel({ projects, heading = "A closer look at our work", eyebrow = "Selected projects" }: {
  projects: PublicProject[];
  heading?: string;
  eyebrow?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
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

  useEffect(() => {
    if (paused || projects.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = current >= projects.length - 1 ? 0 : current + 1;
        const track = trackRef.current;
        const card = track?.children[next] as HTMLElement | undefined;
        if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
        return next;
      });
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, projects.length]);

  if (!projects.length) return null;

  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-8 border-b border-[#e8e8ef] pb-9 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.65rem,6vw,5.25rem)] font-bold leading-[.98] tracking-[-.065em] text-brand">{heading}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">Explore selected residential, commercial and infrastructure projects shaped by careful planning and considered execution.</p>
            </div>
            <div className="flex items-center gap-3 md:pb-1">
              <Link href="/projects" className="mr-3 text-sm font-extrabold text-brand transition hover:text-accent">Explore all work <ArrowUpRight className="ml-1 inline" size={15}/></Link>
              <button type="button" aria-label="Previous projects" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} className="grid h-12 w-12 place-items-center rounded-full border border-brand/15 bg-white text-brand transition hover:border-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft size={18}/></button>
              <button type="button" aria-label="Next projects" onClick={() => goTo(Math.min(projects.length - 1, active + 1))} disabled={active >= projects.length - 1} className="grid h-12 w-12 place-items-center rounded-full border border-brand/15 bg-white text-brand transition hover:border-brand hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight size={18}/></button>
            </div>
          </div>
        </Reveal>
        <div ref={trackRef} onScroll={handleScroll} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} className="project-slider-track mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5" aria-label="Recent Ratsonbase projects">
          {projects.map((project, index) => {
            const startDate = formatProjectDate(project.start_date);
            const endDate = formatProjectDate(project.completion_date);
            const timeline = [startDate, endDate].filter(Boolean).join(" — ");
            return (
              <Reveal key={project.id} className="w-[88%] max-w-[760px] shrink-0 snap-start sm:w-[76%] lg:w-[calc(58%-12px)]" delay={index * 0.04}>
                <article className="group relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white transition duration-500 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_24px_65px_rgba(1,0,110,.12)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#f1f1f6]">
                    {project.featured_image ? <img src={project.featured_image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"/> : <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#eeeeff,#fceafa)]"><span className="font-heading text-5xl font-bold tracking-[-.07em] text-brand/15">RB.</span></div>}
                    <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[.62rem] font-bold uppercase tracking-[.15em] text-brand shadow-sm backdrop-blur">{project.project_type}</span>
                    {project.status && <span className="absolute right-5 top-5 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[.62rem] font-bold uppercase tracking-[.15em] text-slate-700 shadow-sm backdrop-blur">{project.status}</span>}
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-slate-400">{project.location && <><MapPin size={13} className="text-accent"/>{project.location}</>}</div>
                    <div className="mt-4 flex items-start justify-between gap-5">
                      <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.18em] text-accent">Project {String(index + 1).padStart(2,"0")}</p><h3 className="mt-2 font-heading text-2xl font-bold leading-tight tracking-[-.04em] text-brand sm:text-3xl">{project.title}</h3><p className="mt-3 line-clamp-3 max-w-xl text-sm leading-7 text-slate-500">{project.description}</p></div>
                      <Link href={"/projects/" + project.slug} aria-label={"Explore project: " + project.title} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white transition duration-300 hover:rotate-45 hover:bg-accent"><ArrowUpRight size={21}/></Link>
                    </div>
                    {(project.client || timeline) && <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">{project.client && <span><strong className="font-bold text-slate-700">Client:</strong> {project.client}</span>}{timeline && <span><strong className="font-bold text-slate-700">Timeline:</strong> {timeline}</span>}</div>}
                    <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5"><span className="text-[.65rem] font-bold uppercase tracking-[.16em] text-slate-400">{String(index+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</span><Link href={"/projects/"+project.slug} className="text-xs font-extrabold text-brand transition hover:text-accent">View project <ArrowUpRight className="ml-1 inline" size={14}/></Link></div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between gap-4"><p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">Auto-sliding · pause by hovering or focusing</p><div className="flex items-center gap-2" aria-label="Choose project slide">{projects.map((project,index)=><button key={project.id} type="button" aria-label={"Go to project "+(index+1)} aria-current={active===index?"true":undefined} onClick={()=>goTo(index)} className={"h-1.5 rounded-full transition-all "+(active===index?"w-8 bg-accent":"w-1.5 bg-slate-300 hover:bg-brand")}/>)}</div></div>
      </div>
    </section>
  );
}
