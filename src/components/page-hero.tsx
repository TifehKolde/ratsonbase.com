import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";

const heroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=88";

export function PageHero({ eyebrow, title, description, breadcrumbs, backgroundImage = heroImage }: {
  eyebrow: string; title: string; description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  backgroundImage?: string;
}) {
  return (
    <section
      className="page-hero relative isolate overflow-hidden bg-brand py-16 text-white sm:py-24 lg:py-28"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(4,5,34,.91) 0%, rgba(4,5,34,.76) 52%, rgba(4,5,34,.38) 100%), url("${backgroundImage}")`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="page-hero-orb page-hero-orb-one absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/15" />
      <div className="page-hero-orb page-hero-orb-two absolute -right-8 -top-16 h-64 w-64 rounded-full border border-white/10" />
      <div className="container-shell relative z-10">
        <Reveal>
          <Breadcrumbs items={breadcrumbs || [{ label: title }]} />
          <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#f2a5e8]">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[.98] tracking-[-.06em]">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{description}</p>
          <Link href="/contact" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#980281]">Talk to our team <ArrowUpRight size={17} /></Link>
        </Reveal>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08082f]/35 to-transparent" />
    </section>
  );
}
