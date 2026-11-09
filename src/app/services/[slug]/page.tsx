import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { getPublicServiceBySlug, type PublicService } from "@/lib/public-api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try { const service = await getPublicServiceBySlug(slug); return { title: service.title+" | Ratsonbase Construction Limited", description: service.description }; } catch { return { title: "Service | Ratsonbase Construction Limited" }; }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service: PublicService;
  try { service = await getPublicServiceBySlug(slug); } catch { notFound(); }
  return <><SiteHeader/><main><PageHero eyebrow="Our services" title={service.title} description={service.description} breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}/><section className="section-pad"><div className="container-shell max-w-4xl"><p className="eyebrow">How we can help</p><h2 className="mt-5 text-4xl font-bold text-brand">Let's shape the right solution for your needs.</h2><p className="mt-6 text-lg leading-8 text-slate-600">{service.description}</p><Link href="/contact" className="mt-9 inline-flex rounded-full bg-accent px-7 py-4 text-sm font-bold text-white">Discuss this service</Link></div></section></main><SiteFooter/></>;
}
