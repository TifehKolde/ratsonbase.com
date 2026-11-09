"use client";

import { useEffect, useState } from "react";
import { getPublicProjects, getPublicServices, type PublicProject, type PublicService } from "@/lib/public-api";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const values = [
  "Quality workmanship at every stage",
  "Clear communication and accountability",
  "Safety-led project execution",
  "Solutions shaped around your needs",
];

function Brand() {
  return (
    <a href="#home" aria-label="Ratsonbase home" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/15">
        <span className="font-heading text-2xl font-extrabold tracking-tighter">R</span>
      </span>
      <span className="leading-none">
        <span className="block font-heading text-[1.08rem] font-extrabold tracking-[-.055em] text-brand">
          RATSONBASE
        </span>
        <span className="mt-1 block text-[.57rem] font-bold tracking-[.2em] text-slate-500">
          CONSTRUCTION LIMITED
        </span>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState<PublicService[]>([]);
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [servicesUnavailable, setServicesUnavailable] = useState(false);
  const [projectsUnavailable, setProjectsUnavailable] = useState(false);

  useEffect(() => {
    getPublicServices()
      .then(setServices)
      .catch(() => setServicesUnavailable(true))
      .finally(() => setServicesLoading(false));

    getPublicProjects()
      .then(setProjects)
      .catch(() => setProjectsUnavailable(true))
      .finally(() => setProjectsLoading(false));
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="home" className="min-h-screen bg-white">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/15 text-white">
        <div className="container-shell flex h-[82px] items-center justify-between">
          <div className="[&_span]:text-white">
            <Brand />
          </div>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            <a className="text-sm font-semibold text-white/90 transition hover:text-white" href="#home">Home</a>
            <a className="text-sm font-semibold text-white/75 transition hover:text-white" href="#about">About us</a>
            <a className="text-sm font-semibold text-white/75 transition hover:text-white" href="#services">Services</a>
            <a className="text-sm font-semibold text-white/75 transition hover:text-white" href="#projects">Projects</a>
            <a className="text-sm font-semibold text-white/75 transition hover:text-white" href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="hidden items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#980281] lg:inline-flex"
          >
            Start a project <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#08082f] px-6 py-5 lg:hidden" aria-label="Mobile navigation">
            {[
              ["Home", "#home"],
              ["About us", "#about"],
              ["Services", "#services"],
              ["Projects", "#projects"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="block border-b border-white/10 py-3 text-sm font-semibold text-white/90 last:border-0"
              >
                {label}
              </a>
            ))}
            <a href="#contact" onClick={closeMenu} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white">
              Start a project <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>

      <section className="hero-photo relative flex min-h-[720px] items-center overflow-hidden pb-20 pt-36 text-white sm:min-h-[780px] lg:min-h-[850px]">
        <div className="container-shell relative z-10 grid items-end gap-14 lg:grid-cols-[1.2fr_.8fr]">
          <div className="max-w-[800px]">
            <span className="eyebrow text-[#f2a5e8]">Built on trust. Defined by quality.</span>
            <h1 className="mt-7 max-w-[790px] text-[clamp(3.5rem,8vw,7.7rem)] font-bold leading-[.91] tracking-[-.075em]">
              We build spaces <span className="text-[#e9a0df]">that move</span> life forward.
            </h1>
            <p className="mt-8 max-w-[540px] text-base leading-8 text-white/75 sm:text-lg">
              Thoughtful construction. Dependable delivery. Lasting value. We turn ambitious ideas into places made to stand the test of time.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">
                Discuss your project <ArrowUpRight size={17} />
              </a>
              <a href="#projects" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/35 px-7 text-sm font-bold text-white transition hover:bg-white/10">
                Explore our work <ArrowDownRight size={17} />
              </a>
            </div>
          </div>

          <div className="hidden justify-self-end pb-2 lg:block">
            <div className="w-[250px] border-l border-white/40 pl-6">
              <p className="font-heading text-4xl font-bold tracking-tight">Built with purpose.</p>
              <p className="mt-3 text-sm leading-6 text-white/65">
                A considered approach to every brief, every detail and every handover.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/20">
          <div className="container-shell flex min-h-[76px] items-center justify-between gap-5 text-xs font-semibold uppercase tracking-[.16em] text-white/60">
            <span>Construction</span>
            <span className="hidden sm:inline">Engineering</span>
            <span>Renovation</span>
            <span className="hidden sm:inline">Project delivery</span>
            <a href="#about" className="flex items-center gap-2 text-white">Discover <ArrowDownRight size={15} /></a>
          </div>
        </div>
      </section>

      <section id="about" className="section-pad">
        <div className="container-shell grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-6 max-w-[520px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">
              A better standard, from the ground up.
            </h2>
          </div>
          <div className="pt-1">
            <p className="max-w-[700px] text-xl leading-9 text-slate-600">
              Ratsonbase Construction Limited is focused on delivering dependable construction and property solutions through careful planning, skilled execution and a commitment to doing things properly.
            </p>
            <p className="mt-5 max-w-[680px] text-base leading-8 text-slate-500">
              We believe great projects are built on more than materials. They take collaboration, clear decisions and attention to the details that make a space work beautifully for the people who use it.
            </p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-brand transition hover:gap-5">
              Get to know us <ArrowUpRight size={17} className="text-accent" />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="section-pad bg-[#f6f6fc]">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="mt-6 max-w-[650px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">
                From first plan to final finish.
              </h2>
            </div>
            <p className="max-w-[390px] text-base leading-7 text-slate-500">
              Practical expertise and a hands-on approach, shaped around the needs of each project.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#e5e5f0] bg-[#e5e5f0] sm:grid-cols-2">
            {servicesLoading && (
              <p className="col-span-full bg-white p-10 text-sm text-slate-500">Loading our services…</p>
            )}
            {!servicesLoading && servicesUnavailable && (
              <p className="col-span-full bg-white p-10 text-sm text-slate-500">Our services are temporarily unavailable. Please check back shortly.</p>
            )}
            {!servicesLoading && !servicesUnavailable && services.length === 0 && (
              <p className="col-span-full bg-white p-10 text-sm text-slate-500">Our service information is being updated. Please contact us to discuss your project.</p>
            )}
            {services.map((service, index) => (
              <article key={service.id} className="group flex min-h-[260px] flex-col bg-white p-7 transition hover:bg-brand sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-[.18em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-brand transition group-hover:border-white/30 group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <h3 className="mt-12 text-2xl font-bold text-brand transition group-hover:text-white">{service.title}</h3>
                <p className="mt-3 max-w-[470px] text-sm leading-7 text-slate-500 transition group-hover:text-white/65">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-pad">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="mt-6 text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">Made to make a difference.</h2>
            </div>
            <span className="max-w-[280px] text-sm leading-6 text-slate-500">A closer look at the spaces, details and possibilities behind every project.</span>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <article className="group relative min-h-[440px] overflow-hidden rounded-2xl bg-[#d9d9e8]">
              {projects[0]?.featured_image ? (
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${projects[0].featured_image}")` }} />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#24245e] via-brand to-[#b4049a]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090927]/90 via-[#090927]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-10">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-[#f2a5e8]">
                  {projectsLoading ? "Loading projects" : projectsUnavailable ? "Project portfolio" : projects.length ? "Featured project" : "Our project portfolio"}
                </span>
                <h3 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
                  {projectsLoading ? "Discover our work" : projects[0]?.title || "Projects coming soon"}
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  {projectsLoading ? "Loading our latest work…" : projects[0] ? [projects[0].project_type, projects[0].location].filter(Boolean).join(" · ") : "Contact us to learn more about our work"}
                </p>
              </div>
            </article>
            <div className="flex min-h-[440px] flex-col justify-between rounded-2xl bg-brand p-8 text-white sm:p-10">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-[#f2a5e8]">Our approach</span>
                <ArrowUpRight size={22} />
              </div>
              <div>
                <h3 className="max-w-[380px] font-heading text-4xl font-bold leading-[1.05] sm:text-5xl">Good work is built on good decisions.</h3>
                <p className="mt-5 max-w-[360px] text-sm leading-7 text-white/65">We bring people, process and practical expertise together to create work that lasts.</p>
                <a href="#contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand transition hover:bg-brand-light">
                  Work with us <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f6fc]">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="eyebrow">The Ratsonbase difference</span>
            <h2 className="mt-6 max-w-[550px] text-5xl font-bold leading-[1.02] text-brand sm:text-6xl">The details matter. So does the experience.</h2>
          </div>
          <div className="grid gap-0">
            {values.map((value, index) => (
              <div key={value} className="flex items-center gap-5 border-b border-[#dedeea] py-6 first:pt-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand"><Check size={17} /></span>
                <p className="text-base font-semibold text-slate-700">{value}</p>
                <span className="ml-auto text-xs font-bold text-slate-400">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-brand py-24 text-white sm:py-32">
        <div className="absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-16 h-[270px] w-[270px] rounded-full border border-white/10" />
        <div className="container-shell relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow text-[#f2a5e8]">Let's build something meaningful</span>
            <h2 className="mt-7 max-w-[800px] text-5xl font-bold leading-[.98] tracking-[-.06em] sm:text-7xl">
              Have a project in mind? <span className="text-[#e9a0df]">Let's talk.</span>
            </h2>
            <p className="mt-7 max-w-[500px] text-base leading-8 text-white/65">Tell us what you're planning. We'll help you take the next step with clarity and confidence.</p>
          </div>
          <a href="mailto:info@ratsonbase.com" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">
            Contact Ratsonbase <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <footer className="bg-[#08082f] py-10 text-white">
        <div className="container-shell flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <div className="font-heading text-xl font-extrabold tracking-[-.05em]">RATSONBASE</div>
            <p className="mt-2 text-xs font-semibold tracking-[.16em] text-white/45">CONSTRUCTION LIMITED</p>
          </div>
          <p className="text-xs text-white/45">© {new Date().getFullYear()} Ratsonbase Construction Limited. All rights reserved.</p>
          <a href="#home" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">Back to top <ChevronDown className="rotate-180" size={15} /></a>
        </div>
      </footer>
    </main>
  );
}
