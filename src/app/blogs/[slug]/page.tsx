import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { BlogEngagement } from "@/components/blog-engagement";
import { ArticleReadingProgress } from "@/components/article-reading-progress";
import { getPublicPostBySlug, getPublicPosts, getPublicComments, type PublicPost, type PublicComment } from "@/lib/public-api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPublicPostBySlug(slug);
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      alternates: { canonical: `https://www.ratsonbase.com/blogs/${encodeURIComponent(slug)}` },
      openGraph: { title: post.meta_title || post.title, description: post.meta_description || post.excerpt, url: `https://www.ratsonbase.com/blogs/${encodeURIComponent(slug)}`, images: post.featured_image ? [post.featured_image] : [], type: "article" },
    };
  } catch { return { title: "Article | Ratsonbase Construction Limited" }; }
}

function dateLabel(value?: string | null) {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently published" : new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
function readTime(content: string) {
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
function initials(name: string) {
  return name.split(" ").filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: PublicPost;
  try { post = await getPublicPostBySlug(slug); } catch { notFound(); }

  let related: PublicPost[] = [];
  let comments: PublicComment[] = [];
  try { related = (await getPublicPosts()).posts.filter((item) => item.slug !== slug).slice(0, 3); } catch {}
  try { comments = (await getPublicComments(slug)).comments; } catch {}

  const author = post.author?.name || "Ratsonbase Editorial";
  const published = dateLabel(post.published_at || post.created_at);

  return (
    <>
      <SiteHeader />
      <ArticleReadingProgress />
      <main className="ratsonbase-article-page">
        <section className="article-editorial-hero">
          <div className="container-shell relative z-10">
            <Reveal>
              <Breadcrumbs items={[{ label: "Blogs", href: "/blogs" }, { label: post.title }]} />
              <div className="mx-auto mt-12 max-w-4xl text-center lg:mt-16">
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[.7rem] font-bold uppercase tracking-[.13em] text-slate-500">
                  <span className="rounded-full border border-brand/15 bg-brand-light px-4 py-2 text-brand">{post.category?.name || "Ratsonbase Journal"}</span>
                  <span className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-accent" />{published}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={14} className="text-accent" />{readTime(post.content_html)} min read</span>
                </div>
                <h1 className="mt-8 font-heading text-[clamp(2.5rem,6.4vw,5.35rem)] font-bold leading-[1.04] tracking-[-.065em] text-brand">{post.title}</h1>

                <div className="mt-9 inline-flex items-center gap-3 border-t border-brand/10 pt-6 text-left">
                  {post.author?.profile_picture
                    ? <img src={post.author.profile_picture} alt={author} className="h-12 w-12 rounded-full object-cover ring-4 ring-white shadow-md" />
                    : <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-sm font-extrabold text-white ring-4 ring-white shadow-md">{initials(author)}</span>}
                  <div><p className="text-sm font-bold text-brand">By {author}</p><p className="mt-1 text-xs text-slate-500">Ratsonbase Construction Limited</p></div>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="article-hero-orbit article-hero-orbit-one" />
          <div className="article-hero-orbit article-hero-orbit-two" />
        </section>

        <article className="section-pad !pt-10 sm:!pt-14">
          <div className="container-shell">
            {post.featured_image && (
              <Reveal delay={0.04}>
                <figure className="article-feature-figure mx-auto mb-14 max-w-5xl overflow-hidden rounded-[1.5rem] border border-brand/[.07] bg-white shadow-[0_24px_70px_rgba(1,0,110,.10)]">
                  <img src={post.featured_image} alt={post.title} className="aspect-[16/8.5] w-full object-cover" />
                </figure>
              </Reveal>
            )}

            <div className="article-reading-layout mx-auto max-w-6xl">
              <div className="article-reading-column min-w-0">
                {post.excerpt && <p className="article-lead">{post.excerpt}</p>}
                <Reveal delay={0.06}>
                  <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content_html }} />
                </Reveal>

                <Reveal delay={0.08}>
                  <aside className="article-inline-cta mt-14 rounded-3xl p-7 text-white sm:p-9">
                    <div className="max-w-2xl">
                      <p className="text-[.65rem] font-extrabold uppercase tracking-[.18em] text-white/65">Build with confidence</p>
                      <h2 className="mt-3 font-heading text-2xl font-bold leading-tight sm:text-3xl">Planning a project of your own?</h2>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">Speak with the Ratsonbase team about construction, engineering and property solutions shaped around your project goals.</p>
                      <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand transition hover:bg-[#fceafa]">Talk to our team <ArrowUpRight size={16} /></Link>
                    </div>
                  </aside>
                </Reveal>

                {post.author && (
                  <Reveal delay={0.1}>
                    <aside className="article-author-card mt-14 flex flex-col gap-5 rounded-3xl border border-brand/10 bg-white p-6 shadow-[0_14px_45px_rgba(1,0,110,.05)] sm:flex-row sm:items-center sm:p-8">
                      {post.author.profile_picture
                        ? <img src={post.author.profile_picture} alt={author} className="h-20 w-20 shrink-0 rounded-full object-cover" />
                        : <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand text-2xl font-extrabold text-white">{initials(author)}</span>}
                      <div><p className="text-[.65rem] font-extrabold uppercase tracking-[.16em] text-accent">About the author</p><h2 className="mt-2 font-heading text-xl font-bold text-brand">{author}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{post.author.bio || "Contributor to the Ratsonbase journal, sharing perspectives on construction, engineering and the built environment."}</p></div>
                    </aside>
                  </Reveal>
                )}

                <BlogEngagement slug={slug} initialLikes={post.likes_count || 0} initialComments={post.comments_count || 0} comments={comments} />

                <div className="mt-10 flex flex-col gap-4 border-t border-brand/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-accent"><ArrowLeft size={16} /> Back to all articles</Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-accent">Discuss a project with us <ArrowUpRight size={16} /></Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="article-related-section section-pad">
            <div className="container-shell">
              <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div><p className="text-[.68rem] font-extrabold uppercase tracking-[.17em] text-accent">Explore more</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-[-.05em] text-brand sm:text-4xl">Continue reading</h2></div>
                  <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-accent">Visit the journal <ArrowUpRight size={16} /></Link>
                </div>
                <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {related.map((item, index) => (
                    <Reveal key={item.id} delay={index * 0.06}>
                      <Link href={"/blogs/" + item.slug} className="article-related-card group block h-full overflow-hidden rounded-2xl border border-brand/[.08] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(1,0,110,.10)]">
                        <div className="aspect-[16/10] overflow-hidden bg-brand-light">{item.featured_image ? <img src={item.featured_image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(180,4,154,.35),transparent_35%),linear-gradient(135deg,#01006e,#242477)]" />}</div>
                        <div className="p-6"><div className="flex items-center justify-between gap-3 text-[.65rem] font-bold uppercase tracking-[.12em] text-slate-400"><span>{item.category?.name || "Ratsonbase Journal"}</span><span>{dateLabel(item.published_at || item.created_at)}</span></div><h3 className="mt-4 line-clamp-2 font-heading text-xl font-bold leading-snug text-brand transition group-hover:text-accent">{item.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{item.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand group-hover:text-accent">Read article <ArrowUpRight size={15} /></span></div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
