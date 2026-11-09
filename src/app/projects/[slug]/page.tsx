import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, MapPin, Tag, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ProjectCarousel } from "@/components/project-carousel";
import { getPublicProjectBySlug, getPublicProjects, type PublicProject } from "@/lib/public-api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getPublicProjectBySlug(slug);
    return { title: project.title + " | Ratsonbase Projects", description: project.description };
  } catch {
    return { title: "Project | Ratsonbase Construction Limited" };
  }
}

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value + (value.length === 10 ? "T00:00:00" : ""));
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project: PublicProject;
  try { project = await getPublicProjectBySlug(slug); } catch { notFound(); }
  let relatedProjects: PublicProject[] = [];
  try { relatedProjects = (await getPublicProjects()).filter((item) => item.slug !== slug).slice(0, 6); } catch { /* Related projects are optional. */ }

  const details = [
    { label: "Project type", value: project.project_type, icon: Tag },
    { label: "Location", value: project.location, icon: MapPin },
    { label: "Client", value: project.client, icon: UserRound },
    { label: "Status", value: project.status?.replace(/[_-]/g, " "), icon: CheckCircle2 },
    { label: "Start date", value: formatDate(project.start_date), icon: CalendarDays },
    { label: "Completion", value: formatDate(project.completion_date), icon: CalendarDays },
  ].filter((item) => item.value);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={project.project_type}
          title={project.title}
          description={project.location || "A closer look at a Ratsonbase project."}
          breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        />
        <section className="section-pad">
          <div className="container-shell">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
              <div className="min-w-0">
                <Reveal>
                  <div className="project-cover relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-[#29296e] to-accent shadow-xl sm:aspect-[16/9]">
                    {project.featured_image ? (
                      <div role="img" aria-label={project.title} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(" + JSON.stringify(project.featured_image) + ")" }} />
                    ) : (
                      <div className="absolute inset-0 flex items-end bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,.22),transparent_30%)] p-6 sm:p-10">
                        <p className="max-w-lg text-2xl font-bold leading-tight text-white sm:text-4xl">{project.title}</p>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-white backdrop-blur sm:left-6 sm:top-6">{project.project_type}</span>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-10">
                    <p className="eyebrow">Project overview</p>
                    <h2 className="mt-5 text-3xl font-bold leading-tight text-brand sm:text-4xl">The story behind the work.</h2>
                    <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg">{project.description}</p>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-10 rounded-2xl border border-[#e8e8f1] bg-[#f8f8fc] p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-brand">Our approach</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Every project starts with understanding the brief, aligning on priorities and planning the work carefully. For more information about this project or a similar brief, our team will be happy to speak with you.</p>
                    <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#17178d]">Discuss a similar project <ArrowUpRight size={16}/></Link>
                  </div>
                </Reveal>
              </div>

              <aside className="min-w-0 lg:sticky lg:top-28">
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-[#e7e7f0] bg-white p-6 shadow-[0_18px_60px_rgba(1,0,110,.07)] sm:p-7">
                    <p className="eyebrow">At a glance</p>
                    <h2 className="mt-4 text-2xl font-bold text-brand">Project details</h2>
                    <dl className="mt-6 divide-y divide-slate-100">
                      {details.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><Icon size={17}/></span>
                          <div className="min-w-0"><dt className="text-xs font-semibold uppercase tracking-[.12em] text-slate-400">{label}</dt><dd className="mt-1 break-words text-sm font-bold capitalize text-slate-700">{value}</dd></div>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-7 rounded-xl bg-[#f8f5fb] p-5">
                      <p className="text-sm font-bold text-brand">Have a project like this?</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">Let's discuss your goals and how we can help.</p>
                      <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-accent">Request a consultation <ArrowUpRight size={15}/></Link>
                    </div>
                  </div>
                </Reveal>
              </aside>
            </div>
            <div className="mt-12 border-t border-slate-200 pt-7">
              <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-brand transition hover:border-brand hover:bg-brand-light"><ArrowLeft size={16}/> Back to all projects</Link>
            </div>
          </div>
        </section>
        <ProjectCarousel projects={relatedProjects} heading="Continue exploring our work." eyebrow="Related projects" />
      </main>
      <SiteFooter />
    </>
  );
}
