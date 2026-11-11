import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPublicPosts, type PublicPost } from "@/lib/public-api";
import { BlogIndexClient } from "@/components/blog-index-client";
import { BlogThemeShell } from "@/components/blog-theme-shell";

export const metadata: Metadata = {
  title: "Construction Insights & Articles", alternates: { canonical: "/blogs" },
  description: "Ideas, expertise and perspectives shaping the spaces where we live, work and build.",
};

export default async function BlogsPage() {
  let posts: PublicPost[] = [];
  let unavailable = false;
  try { posts = (await getPublicPosts()).posts; } catch { unavailable = true; }
  return <><SiteHeader forceSolid/><BlogThemeShell><main className="blog-index-page min-h-screen bg-[#f7f7fc] text-slate-900 transition-colors dark:bg-[#080817] dark:text-slate-100"><BlogIndexClient posts={posts}/>{unavailable && <p className="container-shell pb-10 text-center text-sm text-slate-500 dark:text-slate-400">Articles are temporarily unavailable. Please check back soon.</p>}</main></BlogThemeShell><SiteFooter/></>;
}
