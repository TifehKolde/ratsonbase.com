import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { getPublicPostBySlug } from "@/lib/public-api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try { const post = await getPublicPostBySlug(slug); return { title: post.meta_title || post.title, description: post.meta_description || post.excerpt }; } catch { return { title: "Article | Ratsonbase Construction Limited" }; }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try { post = await getPublicPostBySlug(slug); } catch { notFound(); }
  return <><SiteHeader/><main><PageHero eyebrow={post.category?.name || "Ratsonbase insights"} title={post.title} description={post.excerpt || "Insights and updates from Ratsonbase Construction Limited."}/><article className="section-pad"><div className="container-shell max-w-4xl">{post.featured_image && <div className="mb-10 aspect-[16/9] rounded-2xl bg-cover bg-center" style={{backgroundImage:"url("+JSON.stringify(post.featured_image)+")"}}/>}<div className="article-content" dangerouslySetInnerHTML={{__html: post.content_html}}/></div></article></main><SiteFooter/></>;
}
