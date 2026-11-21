import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntroVideo } from "@/components/intro-video";
import { HeroImageSlider } from "@/components/hero-image-slider";
import { Reveal } from "@/components/reveal";
import { ProjectCarousel } from "@/components/project-carousel";
import { ClientLogoCarousel } from "@/components/client-logo-carousel";
import { ManagingPartnerMessage } from "@/components/managing-partner-message";
import { getPublicProjects, getPublicServices, type PublicProject, type PublicService } from "@/lib/public-api";

export async function generateMetadata(): Promise<Metadata> {
  let shareImage: string | undefined;
  try {
    const projects = await getPublicProjects();
    shareImage = projects.find((project) => project.featured_image)?.featured_image || undefined;
  } catch {
    // Keep the page metadata available if the projects API is temporarily unavailable.
  }

  const title = "Construction Company in Lagos & Nigeria | Ratsonbase";
  const description =
    "Ratsonbase Construction Limited provides building construction, civil engineering, project management and renovation services in Lagos and across Nigeria. Discuss your project with our team.";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: "/",
      siteName: "Ratsonbase Construction Limited",
      title,
      description,
      images: [{ url: shareImage || "/opengraph-image", width: 1200, height: 630, alt: "Ratsonbase Construction Limited — Building with purpose" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage || "/opengraph-image"],
    },
  };
}

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

  const heroSlides = projects
    .filter((project) => project.featured_image)
    .map((project) => ({ src: project.featured_image as string, alt: project.title }));
  if (heroSlides[0]?.src) {
    preload(heroSlides[0].src, { as: "image", fetchPriority: "high" });
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-photo relative flex min-h-[640px] items-center overflow-hidden px-0 pt-24 pb-20 text-white sm:min-h-[790px] sm:py-32">
          <HeroImageSlider slides={heroSlides} />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,8,39,.88)_0%,rgba(5,8,39,.62)_52%,rgba(5,8,39,.28)_100%)]"/>
          <div className="container-shell relative z-10 pt-0 sm:pt-10">
            <div className="mb-5 sm:mb-6">
              <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-heading text-[.62rem] font-bold uppercase leading-none tracking-[.16em] text-white/90 shadow-sm backdrop-blur-md sm:px-3.5 sm:py-2 sm:text-xs">
                Building with purpose
              </p>
            </div>
            <h1 className="hero-headline mt-0 max-w-[820px] font-heading text-[clamp(2.1rem,7.2vw,3.35rem)] font-bold leading-[1.02] tracking-[-.065em] sm:mt-1 sm:text-[clamp(3rem,5.2vw,5.1rem)] sm:leading-[.98]">
              We build spaces <span className="text-[#e9a0df]">that move</span> life forward.
            </h1>
            <p className="mt-5 max-w-[560px] text-sm leading-7 text-white/85 sm:mt-8 sm:text-lg sm:leading-8">
              Thoughtful construction. Dependable delivery. Lasting value.<br className="hidden sm:block" /> We turn ambitious ideas into places made to stand the test of time.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-10 sm:flex sm:flex-row sm:gap-3">
              <Link href="/contact" className="inline-flex min-w-0 min-h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-1.5 text-[.62rem] font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281] sm:min-h-14 sm:gap-3 sm:px-7 sm:text-sm">Discuss your project <ArrowUpRight size={14} className="shrink-0 sm:h-[17px] sm:w-[17px]"/></Link>
              <Link href="/projects" className="inline-flex min-w-0 min-h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/45 bg-white/5 px-1.5 text-[.62rem] font-bold text-white backdrop-blur-md transition hover:bg-white/15 sm:min-h-14 sm:gap-3 sm:px-7 sm:text-sm">Explore our work <ArrowRight size={14} className="shrink-0 sm:h-[17px] sm:w-[17px]"/></Link>
            </div>
          </div>
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
          <Reveal className="container-shell relative grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-brand-light shadow-[0_24px_60px_rgba(1,0,110,.12)] sm:aspect-[5/4] lg:mt-0">
              <Image
                src="/images/banners/DSC03322b.jpg"
                alt="Ratsonbase construction project"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
            </div>
            <div className="lg:pt-2">
              <h2 className="mb-6 max-w-[560px] font-heading text-3xl font-bold leading-tight tracking-[-.045em] text-brand sm:text-4xl">Building with purpose. Delivering with care.</h2>
              <p className="max-w-[760px] text-left text-xl leading-[1.75] text-slate-700 sm:text-[1.4rem]">Ratsonbase Construction Limited is a proudly Nigerian construction and civil engineering company delivering building and infrastructure solutions across residential, commercial and industrial sectors.</p>
              <p className="mt-6 max-w-[760px] text-left text-base leading-8 text-slate-500">From early planning and procurement to construction, finishing and property solutions, we bring together practical expertise, careful coordination and a commitment to quality. Our work is guided by integrity, safety, teamwork, excellence and promptness.</p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-brand transition hover:text-accent">Discover our story <ArrowUpRight size={17} className="text-accent"/></Link>
            </div>
          </Reveal>
        </section>

        <Reveal><IntroVideo /></Reveal>
        <ProjectCarousel projects={projects} heading="Our featured projects" />

        <section className="section-pad relative overflow-hidden bg-[#f7f7fb]">
          <div className="construction-blueprint pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-60 lg:block"/>
          <Reveal className="container-shell relative">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><h2 className="mt-6 max-w-[650px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">What we do</h2></div><p className="max-w-[390px] text-base leading-7 text-slate-500">Practical expertise and a hands-on approach, shaped around the needs of each project.</p></div>
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

        <ClientLogoCarousel />

        <section className="relative overflow-hidden bg-brand py-24 text-white sm:py-32"><div className="absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full border border-white/10"/><div className="absolute -bottom-40 left-[28%] h-[500px] w-[500px] rounded-full border border-white/10"/><Reveal className="container-shell relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="mt-7 max-w-[800px] text-4xl font-bold leading-[1.02] tracking-[-.05em] sm:text-6xl">Have a project in mind? <span className="text-[#e9a0df]">Let's talk.</span></h2><p className="mt-7 max-w-[500px] text-base leading-8 text-white/65">Tell us what you're planning. We'll help you take the next step with clarity and confidence.</p></div><Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">Contact Ratsonbase <ArrowUpRight size={17}/></Link></Reveal></section>
      </main>
      <SiteFooter />
    </>
  );
}
