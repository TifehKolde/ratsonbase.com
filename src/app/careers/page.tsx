import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Careers | Ratsonbase Construction Limited", description: "Explore career opportunities with Ratsonbase Construction Limited." };

export default function CareersPage() {
  return <><SiteHeader/><main><PageHero eyebrow="Careers" title="Build your future with us." description="We value people who care about quality, collaboration, safety and doing meaningful work."/><section className="section-pad"><div className="container-shell max-w-3xl"><p className="eyebrow">Work with Ratsonbase</p><h2 className="mt-5 text-4xl font-bold text-brand">Interested in joining our team?</h2><p className="mt-5 text-base leading-8 text-slate-600">We are building a team of thoughtful, capable people who take pride in their work. For career enquiries and expressions of interest, send us your CV and a short introduction.</p><Link href="mailto:info@ratsonbase.com?subject=Career%20Enquiry" className="mt-8 inline-flex rounded-full bg-accent px-7 py-4 text-sm font-bold text-white">Send a career enquiry</Link></div></section></main><SiteFooter/></>;
}
