"use client";

import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Search } from "lucide-react";
import { TurnstileField } from "@/components/turnstile-field";
import { subscribeToNewsletter } from "@/lib/public-api";
import type { PublicPost } from "@/lib/public-api";

function formatDate(value?: string | null) {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently published" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function FeaturedInsight({ post }: { post: PublicPost }) {
  return (
    <Link href={"/blogs/" + post.slug} className="insights-feature-card group">
      <div className="insights-feature-image">
        {post.featured_image ? <img src={post.featured_image} alt={post.title} loading="eager" /> : <div className="insight-card-placeholder" />}
      </div>
      <div className="insights-feature-info">
        <div className="insights-feature-meta"><span>{formatDate(post.published_at || post.created_at)}</span><span>·</span><span>{post.category?.name || "Insights"}</span></div>
        <h2>{post.title}</h2>
      </div>
      <span className="insights-feature-arrow"><ArrowUpRight size={14}/></span>
    </Link>
  );
}

function PostCard({ post }: { post: PublicPost }) {
  return (
    <article className="insight-card group">
      <Link href={"/blogs/" + post.slug} className="insight-card-image">
        {post.featured_image ? <img src={post.featured_image} alt={post.title} loading="lazy" /> : <div className="insight-card-placeholder" />}
      </Link>
      <div className="insight-card-copy">
        <div className="insight-card-meta"><span>{formatDate(post.published_at || post.created_at)}</span>{post.category?.name && <><span aria-hidden="true">·</span><span>{post.category.name}</span></>}</div>
        <Link href={"/blogs/" + post.slug}><h2>{post.title}</h2></Link>
        {post.excerpt && <p>{post.excerpt}</p>}
        <Link href={"/blogs/" + post.slug} className="insight-read-link">Read article <ArrowUpRight size={15}/></Link>
      </div>
    </article>
  );
}

export function BlogIndexClient({ posts }: { posts: PublicPost[] }) {
  const categories = useMemo(() => ["All insights", ...Array.from(new Set(posts.map(post => post.category?.name).filter((name): name is string => Boolean(name))))], [posts]);
  const [category, setCategory] = useState("All insights");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useRef(Date.now());
  const featured = posts.slice(0, 2);
  const filtered = useMemo(() => posts.filter(post =>
    (category === "All insights" || post.category?.name === category) &&
    (post.title + " " + (post.excerpt || "") + " " + (post.category?.name || "")).toLowerCase().includes(search.toLowerCase().trim())
  ), [posts, category, search]);

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) { setSubscribeStatus("Please complete the security check."); return; }
    setSubmitting(true);
    setSubscribeStatus("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await subscribeToNewsletter({
        email,
        first_name: "",
        website: String(formData.get("website") || ""),
        form_elapsed_ms: Date.now() - startedAt.current,
        turnstile_token: token,
      });
      setSubscribeStatus("You're subscribed. Look out for our next update.");
      setEmail("");
      setToken("");
      form.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setSubscribeStatus(error instanceof Error ? error.message : "We couldn't complete your subscription. Please try again.");
      setToken("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="insights-hero">
        <div className="insights-hero-pattern" aria-hidden="true" />
        <div className="container-shell insights-hero-inner">
          <div className="insights-newsletter">
            <p className="insights-eyebrow">Ratsonbase Journal</p>
            <h1>Stay in the<br /><span>flow</span> of what’s<br />next.</h1>
            <p className="insights-intro">Ideas, perspectives and practical knowledge from the people shaping the built environment. Join our circle and stay informed.</p>
            <form className="insights-subscribe-form" onSubmit={handleSubscribe}>
              <div className="insights-subscribe-row">
                <input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" required />
                <button type="submit" disabled={submitting}>{submitting ? "Joining..." : "Subscribe"} <ArrowUpRight size={15}/></button>
              </div>
              <div className="insights-honeypot" aria-hidden="true"><label htmlFor="insights-website">Website</label><input id="insights-website" name="website" type="text" tabIndex={-1} autoComplete="off"/></div>
              <TurnstileField onTokenChange={setToken} theme="dark" />
              {subscribeStatus && <p className="insights-subscribe-status" role="status">{subscribeStatus}</p>}
            </form>
          </div>
          <div className="insights-featured">
            {featured.length > 0 ? featured.map(post => <FeaturedInsight key={post.id} post={post}/>) : <div className="insights-featured-empty">Fresh perspectives are coming soon.</div>}
          </div>
        </div>
      </section>

      <div className="container-shell insights-content">
        <div className="insights-toolbar">
          <div className="insights-categories" role="group" aria-label="Filter insights by category">
            {categories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={category === item ? "is-active" : ""}>{item}</button>)}
          </div>
          <label className="insights-search"><Search size={16} aria-hidden="true"/><input value={search} onChange={event => setSearch(event.target.value)} type="search" placeholder="Search insights..."/></label>
        </div>
        <section className="insights-results" aria-label="All insights">
          <div className="insights-section-heading"><h2>All insights</h2><span>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span></div>
          {filtered.length > 0 ? <div className="insights-grid">{filtered.map(post => <PostCard key={post.id} post={post}/>)}</div> : <div className="insights-empty"><h3>No insights found</h3><p>Try another search or select a different category.</p><button type="button" onClick={() => {setSearch("");setCategory("All insights");}}>Clear filters</button></div>}
        </section>
      </div>
    </>
  );
}
