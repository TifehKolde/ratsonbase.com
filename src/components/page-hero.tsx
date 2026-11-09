import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-white sm:py-28">
      <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div className="absolute -right-8 -top-16 h-64 w-64 rounded-full border border-white/10" />
      <div className="container-shell relative">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f2a5e8]">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-heading text-5xl font-bold leading-[.98] tracking-[-.06em] sm:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{description}</p>
        <Link href="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 text-sm font-bold text-white transition hover:bg-[#980281]">Talk to our team <ArrowUpRight size={17} /></Link>
      </div>
    </section>
  );
}
