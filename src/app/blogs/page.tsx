import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPublicPosts, type PublicPost } from "@/lib/public-api";
import { BlogIndexClient } from "@/components/blog-index-client";

export const metadata: Metadata = {
  title: "Insights, Stories & Intelligence | Ratsonbase",
  description: "Ideas, expertise and perspectives shaping the spaces where we live, work and build.",
};

export default async function BlogsPage() {
  let posts: PublicPost[] = [];
  let unavailable = false;
  try { posts = (await getPublicPosts()).posts; } catch { unavailable = true; }
  return <><SiteHeader/><main className="section-pad min-h-screen bg-[#fbfbfe] dark:bg-[#080817]"><BlogIndexClient posts={posts}/>{unavailable && <p className="container-shell mt-8 text-center text-sm text-slate-500">Articles are temporarily unavailable. Please check back soon.</p>}</main><SiteFooter/></>;
}
