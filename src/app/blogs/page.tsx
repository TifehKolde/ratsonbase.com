import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPublicPosts, type PublicPost } from "@/lib/public-api";
import { BlogIndexClient } from "@/components/blog-index-client";
import { BlogThemeShell } from "@/components/blog-theme-shell";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  let image: string | undefined;
  try {
    const posts = (await getPublicPosts()).posts;
    image = posts.find((post) => post.featured_image)?.featured_image || undefined;
  } catch {
    // Use the branded fallback image if the articles API is unavailable.
  }
  return createPageMetadata({
    title: "Insights",
    description: "Ideas, expertise and perspectives on construction, engineering, property development and the built environment from Ratsonbase.",
    path: "/insights",
    image,
    imageAlt: "Insights from Ratsonbase Construction Limited",
  });
}

export default async function BlogsPage() {
  let posts: PublicPost[] = [];
  let unavailable = false;
  try { posts = (await getPublicPosts()).posts; } catch { unavailable = true; }
  return <><SiteHeader/><BlogThemeShell><main className="blog-index-page min-h-screen bg-[#f7f7fc] text-slate-900"><BlogIndexClient posts={posts}/>{unavailable && <p className="container-shell pb-10 text-center text-sm text-slate-500">Articles are temporarily unavailable. Please check back soon.</p>}</main></BlogThemeShell><SiteFooter/></>;
}
