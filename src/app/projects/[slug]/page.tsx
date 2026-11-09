import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { getPublicProjectBySlug } from "@/lib/public-api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try { const project = await getPublicProjectBySlug(slug); return { title: project.title+" | Ratsonbase Projects", description: project.description }; } catch { return { title: "Project | Ratsonbase Construction Limited" }; }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project;
  try { project = await getPublicProjectBySlug(slug); } catch { notFound(); }
  return <><SiteHeader/><main><PageHero eyebrow={project.project_type} title={project.title} description={project.location || "A Ratsonbase project"}/><section className="section-pad"><div className="container-shell max-w-4xl"><div className="mb-9 aspect-[16/9] rounded-2xl bg-gradient-to-br from-brand to-accent bg-cover bg-center" style={project.featured_image ? {backgroundImage:"url("+JSON.stringify(project.featured_image)+")"} : undefined}/><p className="text-lg leading-8 text-slate-600">{project.description}</p><p className="mt-5 text-sm text-slate-500">Status: {project.status}</p></div></section></main><SiteFooter/></>;
}
