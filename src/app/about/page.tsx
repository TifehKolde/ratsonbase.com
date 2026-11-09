import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "About Us | Ratsonbase Construction Limited", description: "Learn about Ratsonbase Construction Limited, our approach, values and commitment to quality construction." };

const principles = ["Quality workmanship at every stage", "Clear communication and accountability", "Safety-led project execution", "Solutions shaped around your needs"];

export default function AboutPage() {
  return <><SiteHeader /><main><PageHero eyebrow="Who we are" title="A better standard, from the ground up." description="We bring careful planning, skilled execution and a commitment to doing things properly to every project we undertake." backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88" />
    <section className="section-pad"><div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="eyebrow">Our company</p><h2 className="mt-5 text-4xl font-bold leading-tight text-brand sm:text-5xl">Building with purpose. Delivering with care.</h2></div><div className="space-y-5 text-base leading-8 text-slate-600"><p>Ratsonbase Construction Limited is focused on delivering dependable construction and property solutions through thoughtful planning, practical expertise and close collaboration with clients.</p><p>We believe great projects are built on more than materials. They take clear decisions, responsible execution and attention to the details that make a space work beautifully for the people who use it.</p><p>From the first conversation to project handover, our aim is to make the process clear, considered and focused on lasting value.</p></div></div></section>
    <section className="section-pad bg-[#f6f6fc]"><div className="container-shell grid gap-12 md:grid-cols-2"><div><p className="eyebrow">What guides us</p><h2 className="mt-5 text-4xl font-bold text-brand">Our values are built into the work.</h2></div><div className="grid gap-5">{principles.map((item) => <div key={item} className="flex items-center gap-4 border-b border-slate-200 pb-5"><CheckCircle2 className="shrink-0 text-accent" size={21}/><p className="font-semibold text-slate-700">{item}</p></div>)}</div></div></section>
  </main><SiteFooter /></>;
}
