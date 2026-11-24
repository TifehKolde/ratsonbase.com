"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Search, ArrowUpRight } from "lucide-react";
import type { PublicPost } from "@/lib/public-api";

function formatDate(value?: string | null) {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently published" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function PostCard({ post }: { post: PublicPost }) {
  return (
    <article className="insight-card group">
      <Link href={"/blogs/" + post.slug} className="insight-card-image">
        {post.featured_image
          ? <img src={post.featured_image} alt={post.title} loading="lazy" />
          : <div className="insight-card-placeholder" />}
      </Link>
      <div className="insight-card-copy">
        <div className="insight-card-meta">
          <span>{formatDate(post.published_at || post.created_at)}</span>
          {post.category?.name && <><span aria-hidden="true">·</span><span>{post.category.name}</span></>}
        </div>
        <Link href={"/blogs/" + post.slug}>
          <h2>{post.title}</h2>
        </Link>
        {post.excerpt && <p>{post.excerpt}</p>}
        <Link href={"/blogs/" + post.slug} className="insight-read-link">
          Read article <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export function BlogIndexClient({ posts }: { posts: PublicPost[] }) {
  const categories = useMemo(() => ["All insights", ...Array.from(new Set(posts.map(post => post.category?.name).filter((name): name is string => Boolean(name))))], [posts]);
  const [category, setCategory] = useState("All insights");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => posts.filter(post =>
    (category === "All insights" || post.category?.name === category) &&
    (post.title + " " + (post.excerpt || "") + " " + (post.category?.name || "")).toLowerCase().includes(search.toLowerCase().trim())
  ), [posts, category, search]);

  return (
    <>
      <section className="insights-hero">
        <div className="container-shell">
          <p className="insights-eyebrow">Ratsonbase Journal</p>
          <h1>Insights</h1>
          <p className="insights-intro">Ideas, knowledge and perspectives on construction, engineering and the built environment.</p>
        </div>
      </section>

      <div className="container-shell insights-content">
        <div className="insights-toolbar">
          <div className="insights-categories" role="group" aria-label="Filter insights by category">
            {categories.map(item => (
              <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={category === item ? "is-active" : ""}>
                {item}
              </button>
            ))}
          </div>
          <label className="insights-search">
            <Search size={16} aria-hidden="true" />
            <input value={search} onChange={event => setSearch(event.target.value)} type="search" placeholder="Search insights..." />
          </label>
        </div>

        <section className="insights-results" aria-label="All insights">
          <div className="insights-section-heading">
            <h2>All insights</h2>
            <span>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
          </div>
          {filtered.length > 0
            ? <div className="insights-grid">{filtered.map(post => <PostCard key={post.id} post={post} />)}</div>
            : <div className="insights-empty"><h3>No insights found</h3><p>Try another search or select a different category.</p><button type="button" onClick={() => { setSearch(""); setCategory("All insights"); }}>Clear filters</button></div>}
        </section>
      </div>
    </>
  );
}
