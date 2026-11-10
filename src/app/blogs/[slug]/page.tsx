import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { BlogEngagement } from "@/components/blog-engagement";
import { ArticleReadingProgress } from "@/components/article-reading-progress";
import { getPublicPostBySlug, getPublicPosts, getPublicComments, type PublicPost, type PublicComment } from "@/lib/public-api";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  try { const post=await getPublicPostBySlug(slug); return {title:post.meta_title||post.title,description:post.meta_description||post.excerpt,openGraph:{title:post.meta_title||post.title,description:post.meta_description||post.excerpt,images:post.featured_image?[post.featured_image]:[] ,type:"article"}}; }
  catch { return {title:"Article | Ratsonbase Construction Limited"}; }
}
function dateLabel(value?:string|null){if(!value)return "Recently published";const d=new Date(value);return Number.isNaN(d.getTime())?"Recently published":new Intl.DateTimeFormat("en",{day:"numeric",month:"long",year:"numeric"}).format(d);}
function readTime(content:string){const words=content.replace(/<[^>]*>/g," ").trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(words/220));}
export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  let post:PublicPost;
  try { post=await getPublicPostBySlug(slug); } catch { notFound(); }
  let related:PublicPost[]=[]; let comments:PublicComment[]=[];
  try { related=(await getPublicPosts()).posts.filter(p=>p.slug!==slug).slice(0,3); } catch {}
  try { comments=(await getPublicComments(slug)).comments; } catch {}
  const author=post.author?.name||"Ratsonbase Editorial";
  return <><SiteHeader/><ArticleReadingProgress/><main className="bg-white dark:bg-[#080817]">
    <section className="blog-article-hero relative isolate overflow-hidden bg-[#08082f] py-16 text-white sm:py-24 lg:py-28" style={{backgroundImage:`linear-gradient(90deg,rgba(5,6,35,.96) 0%,rgba(5,6,35,.86) 54%,rgba(5,6,35,.5) 100%),url("${post.featured_image||"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=88"}")`}}>
      <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full border border-white/15"/><div className="pointer-events-none absolute -right-5 top-10 h-64 w-64 rounded-full border border-white/10"/>
      <div className="container-shell relative z-10"><Reveal><Breadcrumbs items={[{label:"Blogs",href:"/blogs"},{label:post.title}]}/>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.15em] text-white/70"><span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur">{post.category?.name||"Ratsonbase insights"}</span><span className="inline-flex items-center gap-2"><CalendarDays size={13}/>{dateLabel(post.published_at||post.created_at)}</span><span className="inline-flex items-center gap-2"><Clock3 size={13}/>{readTime(post.content_html)} min read</span></div>
        <h1 className="mt-7 max-w-5xl font-heading text-[clamp(2.6rem,6.2vw,5.5rem)] font-bold leading-[1.02] tracking-[-.065em]">{post.title}</h1>
        {post.excerpt&&<p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{post.excerpt}</p>}
        <div className="mt-9 inline-flex items-center gap-3 border-t border-white/20 pt-5">{post.author?.profile_picture?<img src={post.author.profile_picture} alt={author} className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"/>:<span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-sm font-bold">{author.split(" ").map(part=>part[0]).slice(0,2).join("")}</span>}<div><p className="text-xs font-bold text-white">{author}</p><p className="mt-1 text-[.68rem] text-white/50">Article contributor</p></div></div>
      </Reveal></div>
    </section>
    <article className="section-pad"><div className="container-shell"><div className="mx-auto max-w-3xl">
      {post.featured_image&&<Reveal delay={.04}><figure className="mb-12 overflow-hidden rounded-[1.6rem] border border-slate-100 bg-slate-100 shadow-[0_25px_70px_rgba(1,0,110,.09)] dark:border-white/10"><img src={post.featured_image} alt={post.title} className="aspect-[16/9] w-full object-cover"/><figcaption className="px-5 py-3 text-xs text-slate-400">Featured image · Ratsonbase Journal</figcaption></figure></Reveal>}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-14">
        <div className="min-w-0"><Reveal delay={.07}><div className="article-content" dangerouslySetInnerHTML={{__html:post.content_html}}/></Reveal></div>
        <aside className="hidden lg:block"><div className="sticky top-28 rounded-2xl border border-slate-200 bg-[#fafaff] p-5 dark:border-white/10 dark:bg-slate-900"><p className="text-[.65rem] font-extrabold uppercase tracking-[.17em] text-accent">Keep exploring</p><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Ideas, project updates and perspectives from our team.</p><div className="mt-5 border-t border-slate-200 pt-4 dark:border-white/10"><p className="text-sm font-bold text-brand dark:text-white">The Ratsonbase Journal</p><p className="mt-1 text-xs leading-5 text-slate-400">Thoughtful perspectives on the built environment.</p></div><Link href="/blogs" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand hover:text-accent dark:text-white"><ArrowLeft size={14}/> All articles</Link></div></aside>
      </div>
      {post.author&&<Reveal delay={.1}><aside className="mt-14 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-brand-light/50 p-6 dark:border-white/10 dark:bg-slate-900 sm:flex-row sm:items-center sm:p-8">{post.author.profile_picture?<img src={post.author.profile_picture} alt={author} className="h-20 w-20 shrink-0 rounded-full object-cover"/>:<span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand text-2xl font-bold text-white">{author.split(" ").map(part=>part[0]).slice(0,2).join("")}</span>}<div><p className="text-[.65rem] font-extrabold uppercase tracking-[.15em] text-accent">About the author</p><h2 className="mt-2 text-xl font-bold text-brand dark:text-white">{author}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{post.author.bio||"Contributor to the Ratsonbase journal."}</p></div></aside></Reveal>}
      <BlogEngagement slug={slug} initialLikes={post.likes_count||0} initialComments={post.comments_count||0} comments={comments}/>
      <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-7 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between"><Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-accent dark:text-white"><ArrowLeft size={16}/> Back to all stories</Link><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-accent">Discuss a project with us <ArrowUpRight size={16}/></Link></div>
    </div></div></article>
    {related.length>0&&<section className="section-pad bg-[#f7f7fc] dark:bg-[#0d0d20]"><div className="container-shell"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-accent">Continue reading</p><h2 className="mt-3 text-3xl font-bold tracking-[-.04em] text-brand dark:text-white">Related stories</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{related.map(p=><Link key={p.id} href={"/blogs/"+p.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"><div className="aspect-[16/10] overflow-hidden bg-brand-light">{p.featured_image?<img src={p.featured_image} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/>:<div className="h-full w-full bg-gradient-to-br from-brand to-accent"/>}</div><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-accent">{p.category?.name||"Ratsonbase insights"}</p><h3 className="mt-3 line-clamp-2 text-lg font-bold text-brand dark:text-white">{p.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{p.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand group-hover:text-accent dark:text-white">Read story <ArrowUpRight size={15}/></span></div></Link>)}</div></div></section>}
  </main><SiteFooter/></>;
}
