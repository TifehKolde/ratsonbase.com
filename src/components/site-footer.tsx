import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#08082f] pt-16 text-white sm:pt-20">
      <div className="pointer-events-none absolute -right-28 -top-32 h-[440px] w-[440px] rounded-full border border-white/[.07]"/>
      <div className="container-shell relative">
        <div id="newsletter" className="grid scroll-mt-28 gap-8 border-b border-white/10 pb-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-16">
          <div><h2 className="mt-5 max-w-lg font-heading text-3xl font-bold leading-tight sm:text-4xl">Ideas, updates and a closer look at what we are building.</h2><p className="mt-4 max-w-md text-sm leading-7 text-white/50">Join the Ratsonbase newsletter for company news, project updates and perspectives from the built environment.</p></div>
          <NewsletterForm/>
        </div>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.9fr]">
          <div><Link href="/" className="font-heading text-2xl font-extrabold tracking-[-.05em]">RATSONBASE</Link><p className="mt-2 text-xs font-semibold tracking-[.16em] text-white/45">CONSTRUCTION LIMITED</p><p className="mt-5 max-w-sm text-sm leading-7 text-white/55">Thoughtful construction, dependable delivery and lasting value. Building spaces that move life forward.</p><div className="mt-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-white/45">Follow Ratsonbase</p><div className="mt-3 flex items-center gap-3"><a href="https://www.instagram.com/ratsonbase/" target="_blank" rel="noopener noreferrer" aria-label="Ratsonbase on Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-[#f2a5e8] hover:bg-[#f2a5e8] hover:text-[#08082f]"><Instagram size={18}/></a><a href="https://www.linkedin.com/company/ratson-construction-ltd/" target="_blank" rel="noopener noreferrer" aria-label="Ratsonbase on LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-[#f2a5e8] hover:bg-[#f2a5e8] hover:text-[#08082f]"><Linkedin size={18}/></a><a href="https://www.facebook.com/ratsonbaseng" target="_blank" rel="noopener noreferrer" aria-label="Ratsonbase on Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-[#f2a5e8] hover:bg-[#f2a5e8] hover:text-[#08082f]"><Facebook size={18}/></a></div></div></div>
          <div><h2 className="text-sm font-bold">Explore</h2><div className="mt-4 grid gap-3 text-sm text-white/60"><Link href="/about" className="transition hover:text-white">About us</Link><Link href="/services" className="transition hover:text-white">Services</Link><Link href="/projects" className="transition hover:text-white">Projects</Link><Link href="/blog" className="transition hover:text-white">Blog</Link></div></div>
          <div><h2 className="text-sm font-bold">Get in touch</h2><div className="mt-4 grid gap-3 text-sm text-white/60"><Link href="/contact" className="transition hover:text-white">Contact us</Link><a href="mailto:hello@ratsonbase.com" className="transition hover:text-white">hello@ratsonbase.com</a><Link href="/contact" className="mt-2 inline-flex items-center gap-2 font-bold text-[#f2a5e8]">Start a conversation <ArrowUpRight size={15}/></Link></div></div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Ratsonbase Construction Limited. All rights reserved.</span><span>Integrity, Safety, Teamwork, Excellence and Promptness</span></div>
      </div>
    </footer>
  );
}
