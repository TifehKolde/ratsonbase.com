import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { BlogEngagement } from "@/components/blog-engagement";
import { getPublicPostBySlug, getPublicPosts, getPublicComments, type PublicPost, type PublicComment } from "@/lib/public-api";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;try{const p=await getPublicPostBySlug(slug);return{title:p.meta_title||p.title,description:p.meta_description||p.excerpt};}catch{return{title:"Article | Ratsonbase Construction Limited"};}}
function dateLabel(value?:string|null){if(!value)return null;const d=new Date(value);return Number.isNaN(d.getTime())?null:new Intl.DateTimeFormat("en",{day:"numeric",month:"long",year:"numeric"}).format(d);}
export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  let post:PublicPost;
  try { post=await getPublicPostBySlug(slug); } catch { notFound(); }
  let related:PublicPost[]=[];
  let comments:PublicComment[]=[];
  try { related=(await getPublicPosts()).posts.filter(p=>p.slug!==slug).slice(0,3); } catch {}
  try { comments=(await getPublicComments(slug)).comments; } catch {}
  const date=dateLabel(post.published_at||post.created_at);

  return <><SiteHeader/><main>
    <PageHero eyebrow={post.category?.name||"Ratsonbase insights"} title={post.title} description={post.excerpt||"Ideas and perspectives from Ratsonbase Construction Limited."} breadcrumbs={[{label:"Blog",href:"/blog"},{label:post.title}]} backgroundImage={post.featured_image||"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=88"}/>
    <article className="section-pad"><div className="container-shell"><div className="mx-auto max-w-4xl">
      <Reveal><div className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-slate-200 pb-6 text-xs font-semibold text-slate-400">{date&&<span className="inline-flex items-center gap-2"><CalendarDays size={14}/>{date}</span>}{post.author?.name&&<span className="inline-flex items-center gap-2"><UserRound size={14}/>{post.author.name}</span>}<span className="rounded-full bg-brand-light px-3 py-1.5 text-brand">{post.category?.name||"Company insights"}</span></div></Reveal>
      {post.featured_image&&<Reveal delay={.05}><div className="mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 shadow-lg"><img src={post.featured_image} alt={post.title} className="h-full w-full object-cover"/></div></Reveal>}
      <Reveal delay={.08}><div className="article-content" dangerouslySetInnerHTML={{__html:post.content_html}}/></Reveal>
      {post.author&&<Reveal delay={.1}><aside className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-[#f8f8fc] p-6 sm:p-8"><p className="eyebrow">About the author</p><div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">{post.author.profile_picture?<img src={post.author.profile_picture} alt={post.author.name} className="h-20 w-20 shrink-0 rounded-full object-cover"/>:<span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand text-2xl font-bold text-white">{post.author.name.split(" ").map(part=>part[0]).slice(0,2).join("")}</span>}<div><h2 className="text-xl font-bold text-brand">{post.author.name}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{post.author.bio||"Contributor to the Ratsonbase journal."}</p></div></div></aside></Reveal>}
      <BlogEngagement slug={slug} initialLikes={post.likes_count||0} initialComments={post.comments_count||0} comments={comments}/>
      <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-accent"><ArrowLeft size={16}/> Back to all articles</Link><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-accent">Discuss a project with us <ArrowUpRight size={16}/></Link></div>
    </div></div></article>
    {related.length>0&&<section className="section-pad bg-[#f6f6fc]"><div className="container-shell"><p className="eyebrow">Keep reading</p><h2 className="mt-4 text-3xl font-bold text-brand">More insights</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{related.map(p=><Link key={p.id} href={"/blog/"+p.slug} className="rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><p className="text-xs font-bold uppercase tracking-wider text-accent">{p.category?.name||"Ratsonbase insights"}</p><h3 className="mt-3 text-xl font-bold text-brand">{p.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{p.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">Read article <ArrowUpRight size={15}/></span></Link>)}</div></div></section>}
  </main><SiteFooter/></>;
}
