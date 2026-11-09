import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";

export function PageHero({ eyebrow, title, description, breadcrumbs }: {
  eyebrow: string; title: string; description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}) {
  return (
    <section className="page-hero relative overflow-hidden bg-brand py-16 text-white sm:py-24 lg:py-28">
      <div className="page-hero-orb page-hero-orb-one absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div className="page-hero-orb page-hero-orb-two absolute -right-8 -top-16 h-64 w-64 rounded-full border border-white/10" />
      <div className="container-shell relative">
        <Reveal>
          <Breadcrumbs items={breadcrumbs || [{ label: title }]} />
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f2a5e8]">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,7vw,5.75rem)] font-bold leading-[.98] tracking-[-.06em]">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{description}</p>
          <Link href="/contact" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#980281]">Talk to our team <ArrowUpRight size={17} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
