import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { getPublicServices, type PublicService } from "@/lib/public-api";

export const metadata: Metadata = { title: "Our Services | Ratsonbase Construction Limited", description: "Explore construction, renovation and property services from Ratsonbase Construction Limited." };

export default async function ServicesPage() {
  let services: PublicService[] = [];
  let unavailable = false;
  try { services = await getPublicServices(); } catch { unavailable = true; }
  return <><SiteHeader/><main><PageHero eyebrow="What we do" title="From first plan to final finish." description="Practical expertise and a hands-on approach, shaped around the needs of each project." breadcrumbs={[{ label: "Services" }]}/>
    <section className="section-pad"><div className="container-shell"><div className="mb-10 max-w-2xl"><p className="eyebrow">Our capabilities</p><h2 className="mt-5 text-4xl font-bold text-brand">Solutions shaped around your project.</h2></div>
      {unavailable ? <p className="rounded-2xl bg-[#f6f6fc] p-8 text-slate-600">Our service information is temporarily unavailable. Please contact our team to discuss your requirements.</p> : services.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <article key={service.id} className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"><span className="text-xs font-bold uppercase tracking-[.18em] text-accent">Our service</span><h3 className="mt-8 text-2xl font-bold text-brand">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{service.description}</p><Link href={"/services/"+service.slug} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand">Explore service <ArrowUpRight size={16}/></Link></article>)}</div> : <p className="rounded-2xl bg-[#f6f6fc] p-8 text-slate-600">Our service information is being updated. Please contact us to discuss your project.</p>}
    </div></section></main><SiteFooter/></>;
}
