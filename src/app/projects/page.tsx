import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getPublicProjects, type PublicProject } from "@/lib/public-api";

export const metadata: Metadata = { title: "Our Projects | Ratsonbase Construction Limited", description: "Explore selected construction and renovation projects by Ratsonbase Construction Limited." };

export default async function ProjectsPage() {
  let projects: PublicProject[] = [];
  let unavailable = false;
  try { projects = await getPublicProjects(); } catch { unavailable = true; }
  return <><SiteHeader/><main><PageHero eyebrow="Selected work" title="Made to make a difference." description="A closer look at the spaces, details and possibilities behind every project." breadcrumbs={[{ label: "Projects" }]} backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2200&q=88"/><section className="section-pad"><div className="container-shell">
    {unavailable ? <p className="rounded-2xl bg-[#f6f6fc] p-8 text-slate-600">Our project portfolio is temporarily unavailable. Please check back soon.</p> : projects.length ? <div className="grid gap-7 md:grid-cols-2">{projects.map((project, index) => <Reveal key={project.id} delay={index % 4 * 0.07}><article className="group overflow-hidden rounded-2xl border border-slate-200 transition duration-500 hover:-translate-y-1 hover:shadow-2xl"><div className="aspect-[16/10] bg-gradient-to-br from-brand to-accent" style={project.featured_image ? {backgroundImage:"linear-gradient(0deg,rgba(8,8,47,.12),rgba(8,8,47,.02)),url("+JSON.stringify(project.featured_image)+")",backgroundSize:"cover",backgroundPosition:"center"} : undefined}/><div className="p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-accent">{project.project_type}{project.location ? " · "+project.location : ""}</p><h2 className="mt-3 text-2xl font-bold text-brand">{project.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{project.description}</p><Link href={"/projects/"+project.slug} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">View project <ArrowUpRight size={16}/></Link></div></article></Reveal>)}</div> : <p className="rounded-2xl bg-[#f6f6fc] p-8 text-slate-600">Our project portfolio is being updated. Contact us to learn more about our work.</p>}
  </div></section></main><SiteFooter/></>;
}
