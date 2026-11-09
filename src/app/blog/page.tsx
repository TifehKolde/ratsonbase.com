import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { getPublicPosts } from "@/lib/public-api";

export const metadata: Metadata = { title: "Insights & Updates | Ratsonbase Construction Limited", description: "Construction insights, project updates and ideas from Ratsonbase Construction Limited." };

export default async function BlogPage() {
  let posts = [];
  let unavailable = false;
  try { const result = await getPublicPosts(); posts = result.posts; } catch { unavailable = true; }
  return <><SiteHeader/><main><PageHero eyebrow="Insights & updates" title="Ideas, knowledge and news from our team." description="Explore perspectives on construction, project delivery, materials and the spaces we create."/><section className="section-pad"><div className="container-shell">
    {unavailable ? <p className="rounded-2xl bg-[#f6f6fc] p-8 text-slate-600">Articles are temporarily unavailable. Please check back soon.</p> : posts.length ? <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200"><div className="aspect-[16/10] bg-gradient-to-br from-brand to-accent bg-cover bg-center" style={post.featured_image ? {backgroundImage:"url("+JSON.stringify(post.featured_image)+")"} : undefined}/><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-accent">{post.category?.name || "Ratsonbase insights"}</p><h2 className="mt-3 text-xl font-bold text-brand">{post.title}</h2><p className="mt-3 text-sm leading-7 text-slate-500">{post.excerpt}</p><Link href={"/blog/"+post.slug} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">Read article <ArrowUpRight size={16}/></Link></div></article>)}</div> : <p className="rounded-2xl bg-[#f6f6fc] p-8 text-slate-600">Our articles are coming soon. Please check back for updates.</p>}
  </div></section></main><SiteFooter/></>;
}
