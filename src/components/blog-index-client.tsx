"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Heart, MessageCircle, Search, SlidersHorizontal } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { PublicPost } from "@/lib/public-api";

function formatDate(value?: string | null) {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently published" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}
function readTime(content: string) {
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
function Avatar({ post }: { post: PublicPost }) {
  const name = post.author?.name || "Ratsonbase Editorial";
  return post.author?.profile_picture
    ? <img src={post.author.profile_picture} alt={name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white" />
    : <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-[.68rem] font-extrabold text-brand ring-2 ring-white">{name.split(" ").map(part => part[0]).slice(0, 2).join("")}</span>;
}
function PostCard({ post }: { post: PublicPost }) {
  return <article className="blog-post-card group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-brand/15 hover:shadow-[0_24px_65px_rgba(1,0,110,.11)] dark:border-white/10 dark:bg-slate-900">
    <Link href={"/blogs/" + post.slug} className="block overflow-hidden bg-brand-light">
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.featured_image ? <img src={post.featured_image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_80%_15%,rgba(180,4,154,.4),transparent_30%),linear-gradient(135deg,#01006e,#17165d)]" />}
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#08082f]/65 px-3 py-1.5 text-[.63rem] font-bold uppercase tracking-[.12em] text-white backdrop-blur">{post.category?.name || "Insights"}</span>
      </div>
    </Link>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-[.7rem] font-medium text-slate-500 dark:text-slate-400"><CalendarDays size={13}/>{formatDate(post.published_at || post.created_at)}<span className="text-slate-300">•</span><Clock3 size={13}/>{readTime(post.content_html)} min read</div>
      <Link href={"/blogs/" + post.slug}><h2 className="mt-4 line-clamp-2 min-h-[3.6rem] text-xl font-bold leading-[1.35] tracking-[-.025em] text-[#171735] transition group-hover:text-accent dark:text-white">{post.title}</h2></Link>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{post.excerpt || "Explore ideas and perspectives from Ratsonbase Construction Limited."}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
        <div className="flex min-w-0 items-center gap-2.5"><Avatar post={post}/><span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">{post.author?.name || "Ratsonbase Team"}</span></div>
        <div className="flex shrink-0 items-center gap-3 text-[.7rem] text-slate-400"><span className="inline-flex items-center gap-1"><Heart size={13}/>{post.likes_count || 0}</span><span className="inline-flex items-center gap-1"><MessageCircle size={13}/>{post.comments_count || 0}</span><span className="blog-card-arrow grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-brand transition group-hover:border-brand group-hover:bg-brand group-hover:text-white dark:border-white/15 dark:text-white"><ArrowUpRight size={15}/></span></div>
      </div>
    </div>
  </article>;
}

export function BlogIndexClient({ posts }: { posts: PublicPost[] }) {
  const categories = useMemo(() => ["All stories", ...Array.from(new Set(posts.map(post => post.category?.name).filter((name): name is string => Boolean(name))))], [posts]);
  const [category, setCategory] = useState("All stories");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => posts.filter(post => (category === "All stories" || post.category?.name === category) && (post.title + " " + (post.excerpt || "") + " " + (post.category?.name || "")).toLowerCase().includes(search.toLowerCase().trim())), [posts, category, search]);

  return <div className="container-shell">
    <section className="blog-index-hero rounded-b-[2rem]">
      <div className="blog-index-hero-inner">
        <div className="blog-index-copy">
          <Breadcrumbs variant="dark" items={[{ label: "Blogs" }]} />
          <h1 className="font-heading text-[clamp(2.25rem,4.7vw,4rem)] font-bold leading-[1.04] tracking-[-.065em] text-brand dark:text-white">Insights for the spaces we build and the lives we shape.</h1>
          <p className="mt-4 max-w-xl text-[.98rem] leading-7 text-slate-600 dark:text-slate-400">Ideas, expertise and perspectives on construction, engineering, property and the built environment.</p>
          <a href="#latest-articles" className="blog-index-hero-link mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-accent dark:text-white">Explore the journal <ArrowRight size={16}/></a>
        </div>
        <div className="blog-index-art" aria-hidden="true">
          <div className="blog-index-art-orbit blog-index-art-orbit-one"/>
          <div className="blog-index-art-orbit blog-index-art-orbit-two"/>
          <div className="blog-index-art-panel">
            <span className="blog-index-art-kicker">RATSONBASE JOURNAL</span>
            <span className="blog-index-art-rule"/>
            <strong>Ideas into<br/>built impact.</strong>
            <span className="blog-index-art-bottom">CONSTRUCTION · ENGINEERING · PROPERTY</span>
          </div>
        </div>
      </div>
    </section>

    <div className="blog-index-toolbar flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-5 shadow-[0_12px_35px_rgba(1,0,110,.045)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="blog-category-list flex gap-2 overflow-x-auto pb-1" aria-label="Filter articles by category">
        {categories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full px-4 py-2.5 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${category === item ? "bg-brand text-white shadow-md shadow-brand/15" : "border border-slate-200 bg-white text-slate-600 hover:border-accent/40 hover:text-accent dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"}`}>{item}</button>)}
      </div>
      <label className="relative block w-full lg:max-w-xs"><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={event => setSearch(event.target.value)} type="search" placeholder="Search the journal..." className="min-h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"/></label>
    </div>

    <section id="latest-articles" className="blog-index-results scroll-mt-28 pb-20 pt-12">
      <div className="blog-index-section-heading mb-7 flex items-end justify-between gap-4">
        <div><h2 className="font-heading text-3xl font-bold tracking-[-.04em] text-brand dark:text-white">Latest articles</h2></div>
        <span className="rounded-full border border-brand/10 bg-white px-3.5 py-2 text-xs font-semibold text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
      </div>
      {filtered.length ? <div className="blog-index-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(post => <PostCard key={post.id} post={post}/>)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-slate-900"><SlidersHorizontal className="mx-auto text-accent" size={25}/><h3 className="mt-4 text-lg font-bold text-brand dark:text-white">No articles found</h3><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try another search or choose a different category.</p><button onClick={() => {setSearch("");setCategory("All stories");}} className="mt-5 rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-white hover:bg-accent">Clear filters</button></div>}
    </section>
  </div>;
}
