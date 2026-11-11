import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntroVideo } from "@/components/intro-video";
import { Reveal } from "@/components/reveal";
import { ProjectCarousel } from "@/components/project-carousel";
import { ManagingPartnerMessage } from "@/components/managing-partner-message";
import { getPublicProjects, getPublicServices, type PublicProject, type PublicService } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Construction & Civil Engineering Company in Nigeria",
  description:
    "Ratsonbase Construction Limited delivers residential, commercial and industrial construction, civil engineering and renovation solutions in Nigeria. Discuss your project with our team.",
  alternates: { canonical: "/" },
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
        <section className="hero-photo relative flex min-h-[640px] items-center overflow-hidden px-0 pt-24 pb-20 text-white sm:min-h-[790px] sm:py-32">
          <div className="hero-video-layer absolute inset-0">
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_35%] md:hidden"
              src="/videos/wumego.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <iframe
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 md:block"
              src="https://www.youtube-nocookie.com/embed/YppH2GNQ-Z8?autoplay=1&mute=1&controls=0&loop=1&playlist=YppH2GNQ-Z8&playsinline=1&rel=0&modestbranding=1"
              title="Ratsonbase Construction Limited company film"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,39,.88)_0%,rgba(5,8,39,.62)_52%,rgba(5,8,39,.28)_100%)]"/>
          <Reveal className="container-shell relative z-10 pt-0 sm:pt-10">
            <p className="mb-3 text-base font-bold leading-tight text-white sm:mb-4 sm:text-xl">
              Building with purpose,
            </p>
            <h1 className="mt-0 max-w-[900px] font-heading text-[clamp(2.55rem,10.5vw,3.5rem)] font-bold leading-[.96] tracking-[-.075em] sm:mt-1 sm:text-[clamp(3.1rem,7vw,6.4rem)] sm:leading-[.92]">
              We build spaces <span className="text-[#e9a0df]">that move</span> life forward.
            </h1>
            <p className="mt-5 max-w-[560px] text-sm leading-7 text-white/85 sm:mt-8 sm:text-lg sm:leading-8">
              Thoughtful construction. Dependable delivery. Lasting value. We turn ambitious ideas into places made to stand the test of time.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-10 sm:flex sm:flex-row sm:gap-3">
              <Link href="/contact" className="inline-flex min-w-0 min-h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-1.5 text-[.62rem] font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281] sm:min-h-14 sm:gap-3 sm:px-7 sm:text-sm">Discuss your project <ArrowUpRight size={14} className="shrink-0 sm:h-[17px] sm:w-[17px]"/></Link>
              <Link href="/projects" className="inline-flex min-w-0 min-h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/45 bg-white/5 px-1.5 text-[.62rem] font-bold text-white backdrop-blur-md transition hover:bg-white/15 sm:min-h-14 sm:gap-3 sm:px-7 sm:text-sm">Explore our work <ArrowRight size={14} className="shrink-0 sm:h-[17px] sm:w-[17px]"/></Link>
            </div>
          </Reveal>
          <div className="hero-footer absolute bottom-0 left-0 right-0 z-10 flex min-h-[60px] items-center gap-4 overflow-hidden border-t border-white/20 bg-[#08082f]/20 backdrop-blur-sm sm:min-h-[72px]">
            <div className="hero-marquee min-w-0 flex-1 overflow-hidden" aria-label="Construction, engineering, renovation and project delivery">
              <div className="hero-marquee-track">
                {[0, 1].map((copy) => (
                  <div key={copy} className="hero-marquee-group" aria-hidden={copy === 1}>
                    <span>Construction</span><span>Engineering</span><span>Renovation</span><span>Project delivery</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/about" className="mr-4 inline-flex shrink-0 items-center whitespace-nowrap text-[.62rem] font-bold uppercase tracking-[.12em] text-white sm:mr-8 sm:text-xs">Discover <ArrowUpRight className="ml-1 inline" size={14}/></Link>
          </div>
          <div className="hero-orbit absolute -right-28 top-28 hidden h-72 w-72 rounded-full border border-white/20 lg:block"/>
        </section>

        <section className="section-pad relative overflow-hidden">
          <div className="construction-linework pointer-events-none absolute -right-16 top-10 hidden h-[430px] w-[430px] opacity-60 lg:block"/>
          <Reveal className="container-shell relative grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div><h2 className="mt-6 max-w-[520px] text-4xl font-bold leading-[1.04] text-brand sm:text-5xl lg:text-[3.6rem]">Building with purpose. Delivering with care.</h2><p className="mt-7 max-w-md text-sm font-semibold uppercase tracking-[.13em] text-accent">Ratsonbase Construction Limited, Nigeria</p></div>
            <div className="lg:pt-2"><p className="max-w-[760px] text-xl leading-[1.75] text-slate-700 sm:text-[1.4rem]">Ratsonbase Construction Limited is a proudly Nigerian construction and civil engineering company delivering building and infrastructure solutions across residential, commercial and industrial sectors.</p><p className="mt-6 max-w-[700px] text-base leading-8 text-slate-500">From early planning and procurement to construction, finishing and property solutions, we bring together practical expertise, careful coordination and a commitment to quality. Our work is guided by integrity, safety, teamwork, excellence and promptness.</p><Link href="/about" className="mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-brand transition hover:text-accent">Discover our story <ArrowUpRight size={17} className="text-accent"/></Link></div>
          </Reveal>
        </section>

        <Reveal><IntroVideo /></Reveal>
        <ProjectCarousel projects={projects} heading="A closer look at what we build." />

        <section className="section-pad relative overflow-hidden bg-[#f7f7fb]">
          <div className="construction-blueprint pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-60 lg:block"/>
          <Reveal className="container-shell relative">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><h2 className="mt-6 max-w-[650px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">From first plan to final finish.</h2></div><p className="max-w-[390px] text-base leading-7 text-slate-500">Practical expertise and a hands-on approach, shaped around the needs of each project.</p></div>
            {services.length ? <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.slice(0,6).map((service,index)=><article key={service.id} className="glass-service-card group rounded-[1.35rem] border border-white/80 bg-white/75 p-7 shadow-[0_12px_40px_rgba(1,0,110,.045)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-accent/20 hover:shadow-[0_24px_60px_rgba(1,0,110,.11)] sm:p-8"><span className="flex items-center justify-between text-xs font-extrabold tracking-[.18em] text-accent"><span>{String(index+1).padStart(2,"0")}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-brand/10 text-brand transition group-hover:rotate-45 group-hover:bg-accent group-hover:text-white"><ArrowUpRight size={16}/></span></span><h3 className="mt-8 text-2xl font-bold text-brand">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{service.description}</p><Link href={"/services/"+service.slug} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition group-hover:text-accent">Explore service <ArrowUpRight size={15}/></Link></article>)}</div> : <p className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">Our service information is being updated. <Link href="/contact" className="font-semibold text-accent">Contact us</Link> to discuss your project.</p>}
            <Link href="/services" className="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-brand">View all services <ArrowRight size={16}/></Link>
          </Reveal>
        </section>

        <section className="section-pad relative overflow-hidden bg-white">
          <div className="construction-linework pointer-events-none absolute -left-24 top-1/2 h-[500px] w-[500px] -translate-y-1/2 opacity-35"/>
          <Reveal className="container-shell relative">
            <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
              <div className="relative"><h2 className="mt-6 text-[clamp(2.8rem,5.5vw,5.1rem)] font-bold leading-[.98] tracking-[-.07em] text-brand">The details matter. <span className="text-accent">So does the experience.</span></h2><p className="mt-7 max-w-lg text-base leading-8 text-slate-500">A well-delivered project is felt in every decision: how clearly we communicate, how carefully we plan and how thoughtfully the work comes together.</p><div className="experience-seal mt-10"><span>RATSONBASE, BUILT ON TRUST, DEFINED BY QUALITY </span></div></div>
              <div className="relative grid gap-0 border-y border-slate-200">{values.map((value,index)=><div key={value} className="experience-row group flex items-center gap-5 border-b border-slate-200 py-7 last:border-0"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-light text-brand transition duration-300 group-hover:rotate-12 group-hover:bg-brand group-hover:text-white"><CheckCircle2 size={18}/></span><div><p className="text-[.62rem] font-extrabold uppercase tracking-[.18em] text-accent">Standard {String(index+1).padStart(2,"0")}</p><p className="mt-2 text-base font-semibold text-slate-800 sm:text-lg">{value}</p></div><span className="ml-auto text-xs font-bold text-slate-300">0{index+1}</span></div>)}</div>
            </div>
          </Reveal>
        </section>

        <ManagingPartnerMessage storyAction="link" />

        <section className="relative overflow-hidden bg-brand py-24 text-white sm:py-32"><div className="absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full border border-white/10"/><div className="absolute -bottom-40 left-[28%] h-[500px] w-[500px] rounded-full border border-white/10"/><Reveal className="container-shell relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="mt-7 max-w-[800px] text-4xl font-bold leading-[1.02] tracking-[-.05em] sm:text-6xl">Have a project in mind? <span className="text-[#e9a0df]">Let's talk.</span></h2><p className="mt-7 max-w-[500px] text-base leading-8 text-white/65">Tell us what you're planning. We'll help you take the next step with clarity and confidence.</p></div><Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">Contact Ratsonbase <ArrowUpRight size={17}/></Link></Reveal></section>
      </main>
      <SiteFooter />
    </>
  );
}
