import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntroVideo } from "@/components/intro-video";
import { getPublicProjects, getPublicServices, type PublicProject, type PublicService } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Ratsonbase Construction Limited | Building with Purpose",
  description: "Thoughtful construction, engineering and renovation solutions. Discover Ratsonbase Construction Limited and discuss your next project.",
};

const values = [
  "Quality workmanship at every stage",
  "Clear communication and accountability",
  "Safety-led project execution",
  "Solutions shaped around your needs",
];

export default async function HomePage() {
  let services: PublicService[] = [];
  let projects: PublicProject[] = [];
  try { services = await getPublicServices(); } catch { /* API fallback is shown below. */ }
  try { projects = await getPublicProjects(); } catch { /* API fallback is shown below. */ }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-photo relative flex min-h-[690px] items-center overflow-hidden py-28 text-white sm:min-h-[790px]">
          <div className="container-shell relative z-10">
            <p className="eyebrow text-[#f2a5e8]">Built on trust. Defined by quality.</p>
            <h1 className="mt-7 max-w-[900px] font-heading text-[clamp(3.5rem,8vw,7.6rem)] font-bold leading-[.92] tracking-[-.075em]">
              We build spaces <span className="text-[#e9a0df]">that move</span> life forward.
            </h1>
            <p className="mt-8 max-w-[560px] text-base leading-8 text-white/75 sm:text-lg">
              Thoughtful construction. Dependable delivery. Lasting value. We turn ambitious ideas into places made to stand the test of time.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">Discuss your project <ArrowUpRight size={17}/></Link>
              <Link href="/projects" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/35 px-7 text-sm font-bold text-white transition hover:bg-white/10">Explore our work <ArrowRight size={17}/></Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/20">
            <div className="container-shell flex min-h-[72px] items-center justify-between gap-4 text-[.65rem] font-bold uppercase tracking-[.16em] text-white/65 sm:text-xs">
              <span>Construction</span><span className="hidden sm:inline">Engineering</span><span>Renovation</span><span className="hidden md:inline">Project delivery</span><Link href="/about" className="text-white">Discover <ArrowUpRight className="ml-1 inline" size={14}/></Link>
            </div>
          </div>
        </section>

        <IntroVideo />

        <section className="section-pad">
          <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
            <div><p className="eyebrow">Who we are</p><h2 className="mt-6 max-w-[520px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">A better standard, from the ground up.</h2></div>
            <div><p className="max-w-[700px] text-xl leading-9 text-slate-600">Ratsonbase Construction Limited is focused on delivering dependable construction and property solutions through careful planning, skilled execution and a commitment to doing things properly.</p><p className="mt-5 max-w-[680px] text-base leading-8 text-slate-500">We believe great projects are built on more than materials. They take collaboration, clear decisions and attention to the details that make a space work beautifully for the people who use it.</p><Link href="/about" className="mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-brand">More about Ratsonbase <ArrowUpRight size={17} className="text-accent"/></Link></div>
          </div>
        </section>

        <section className="section-pad bg-[#f6f6fc]">
          <div className="container-shell">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="eyebrow">What we do</p><h2 className="mt-6 max-w-[650px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">From first plan to final finish.</h2></div><p className="max-w-[390px] text-base leading-7 text-slate-500">Practical expertise and a hands-on approach, shaped around the needs of each project.</p></div>
            {services.length ? <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.slice(0,6).map((service,index)=><article key={service.id} className="rounded-2xl border border-[#e5e5f0] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl sm:p-8"><span className="text-xs font-extrabold tracking-[.18em] text-accent">{String(index+1).padStart(2,"0")}</span><h3 className="mt-8 text-2xl font-bold text-brand">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{service.description}</p><Link href={"/services/"+service.slug} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">Explore service <ArrowUpRight size={15}/></Link></article>)}</div> : <p className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">Our service information is being updated. <Link href="/contact" className="font-semibold text-accent">Contact us</Link> to discuss your project.</p>}
            <Link href="/services" className="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-brand">View all services <ArrowRight size={16}/></Link>
          </div>
        </section>

        <section className="section-pad">
          <div className="container-shell">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Selected work</p><h2 className="mt-6 text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">Made to make a difference.</h2></div><Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-brand">Explore all projects <ArrowUpRight size={16}/></Link></div>
            {projects.length ? <div className="mt-14 grid gap-6 md:grid-cols-2">{projects.slice(0,2).map((project)=><Link href={"/projects/"+project.slug} key={project.id} className="group overflow-hidden rounded-2xl border border-slate-200"><div className="aspect-[16/10] bg-gradient-to-br from-brand to-accent bg-cover bg-center transition duration-500 group-hover:scale-[1.01]" style={project.featured_image?{backgroundImage:"url("+JSON.stringify(project.featured_image)+")"}:undefined}/><div className="p-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-accent">{project.project_type}{project.location?" · "+project.location:""}</p><h3 className="mt-3 text-2xl font-bold text-brand">{project.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">{project.description}</p></div></Link>)}</div> : <div className="mt-14 rounded-2xl bg-brand p-9 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f2a5e8]">Our project portfolio</p><h3 className="mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">Good work is built on good decisions.</h3><p className="mt-4 max-w-xl leading-7 text-white/65">Our project portfolio is being updated. Contact our team to learn more about our work.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand">Talk to our team <ArrowUpRight size={16}/></Link></div>}
          </div>
        </section>

        <section className="section-pad bg-[#f6f6fc]">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="eyebrow">The Ratsonbase difference</p><h2 className="mt-6 max-w-[550px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">The details matter. So does the experience.</h2></div><div className="grid gap-0">{values.map((value,index)=><div key={value} className="flex items-center gap-5 border-b border-[#dedeea] py-6 first:pt-0"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand"><CheckCircle2 size={17}/></span><p className="text-base font-semibold text-slate-700">{value}</p><span className="ml-auto text-xs font-bold text-slate-400">0{index+1}</span></div>)}</div></div>
        </section>

        <section className="relative overflow-hidden bg-brand py-24 text-white sm:py-32"><div className="absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full border border-white/10"/><div className="container-shell relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-[#f2a5e8]">Let's build something meaningful</p><h2 className="mt-7 max-w-[800px] text-5xl font-bold leading-[.98] tracking-[-.06em] sm:text-7xl">Have a project in mind? <span className="text-[#e9a0df]">Let's talk.</span></h2><p className="mt-7 max-w-[500px] text-base leading-8 text-white/65">Tell us what you're planning. We'll help you take the next step with clarity and confidence.</p></div><Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">Contact Ratsonbase <ArrowUpRight size={17}/></Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
