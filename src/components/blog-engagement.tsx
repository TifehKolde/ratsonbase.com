"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Heart, MessageCircle, Share2, Send, LoaderCircle, CheckCircle2, X, LockKeyhole, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { likePublicPost, subscribeToNewsletter, submitPublicComment, type PublicComment } from "@/lib/public-api";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function BlogEngagement({ slug, initialLikes, initialComments, comments }: {
  slug: string; initialLikes: number; initialComments: number; comments: PublicComment[];
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [likeOpen, setLikeOpen] = useState(false);
  const [likeEmail, setLikeEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [likeMessage, setLikeMessage] = useState("");
  const [likeSuccess, setLikeSuccess] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [name, setName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [body, setBody] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  async function handleLike(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLikeLoading(true); setLikeMessage(""); setLikeSuccess(false);
    try {
      try {
        await subscribeToNewsletter({ email: likeEmail, first_name: firstName || undefined });
      } catch (error) {
        const code = (error as Error & { code?: string }).code;
        if (code !== "ALREADY_SUBSCRIBED") throw error;
      }
      const result = await likePublicPost(slug, likeEmail);
      setLikes(result.likes_count);
      setLikeSuccess(true);
      setLikeMessage(result.already_liked ? "You have already liked this article." : "You're subscribed and your like has been added. Thank you!");
    } catch (error) {
      setLikeMessage(error instanceof Error ? error.message : "Unable to complete your request. Please try again.");
    } finally { setLikeLoading(false); }
  }

  async function handleComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setCommentLoading(true); setCommentMessage("");
    try {
      const result = await submitPublicComment(slug, { name, email: commentEmail, body });
      setCommentMessage(result.message || "Your comment has been submitted and is awaiting moderation.");
      setName(""); setCommentEmail(""); setBody("");
    } catch (error) { setCommentMessage(error instanceof Error ? error.message : "Unable to submit your comment."); }
    finally { setCommentLoading(false); }
  }

  async function shareArticle() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url });
      else { await navigator.clipboard.writeText(url); setShareMessage("Article link copied to clipboard."); }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") setShareMessage("Could not share this article from this browser.");
    }
  }

  return (
    <section className="blog-engagement mt-16">
      <div className="blog-action-bar flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-[0_14px_45px_rgba(1,0,110,.06)] backdrop-blur-xl sm:px-6">
        <div><p className="text-[.62rem] font-extrabold uppercase tracking-[.18em] text-accent">Enjoyed this read?</p><p className="mt-1 text-sm font-semibold text-brand">Pass it on or show your appreciation.</p></div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={()=>{setLikeMessage("");setLikeSuccess(false);setLikeOpen(true);}} aria-label="Like this article" className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#f1d8ed] bg-[#fff8fd] px-4 text-sm font-bold text-accent transition hover:-translate-y-0.5 hover:border-accent hover:bg-[#fceafa]"><Heart size={17} className="transition group-hover:scale-110"/><span>{likes}</span><span className="hidden sm:inline">Like</span></button>
          <a href="#reader-comments" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-bold text-brand transition hover:border-brand hover:bg-brand-light"><MessageCircle size={16}/><span>{initialComments}</span><span className="hidden sm:inline">Comments</span></a>
          <button type="button" onClick={shareArticle} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand transition hover:border-brand hover:bg-brand-light" aria-label="Share article"><Share2 size={16}/></button>
        </div>
      </div>
      {shareMessage && <p role="status" className="mt-3 text-right text-xs text-slate-500">{shareMessage}</p>}

      <div id="reader-comments" className="mt-16 scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div><h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-.05em] text-brand sm:text-4xl">Good ideas are better when shared.</h2><p className="mt-4 text-sm leading-7 text-slate-500">Have a perspective or question? Leave a comment and join the conversation with the Ratsonbase community.</p><div className="mt-7 flex items-center gap-3 text-xs font-semibold text-slate-400"><span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-brand"><MessageCircle size={16}/></span>{initialComments} approved {initialComments===1?"comment":"comments"}</div></div>
          <div className="rounded-3xl border border-slate-200 bg-[#fafaff] p-5 sm:p-8">
            <form onSubmit={handleComment} className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2"><input required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="min-h-12 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/5"/><input required type="email" value={commentEmail} onChange={e=>setCommentEmail(e.target.value)} placeholder="Email address" aria-label="Email address" className="min-h-12 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/5"/></div>
              <textarea required maxLength={5000} rows={4} value={body} onChange={e=>setBody(e.target.value)} placeholder="Write your thoughts..." aria-label="Write your comment" className="min-h-32 resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/5"/>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-[.68rem] leading-5 text-slate-400">Comments are reviewed before they appear publicly.</p><button disabled={commentLoading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:bg-accent disabled:opacity-60">{commentLoading?<LoaderCircle className="animate-spin" size={16}/>:<>Post comment <Send size={15}/></>}</button></div>
            </form>
            {commentMessage&&<p role="status" className="mt-4 flex items-start gap-2 text-xs leading-6 text-slate-600"><CheckCircle2 size={15} className="mt-1 shrink-0 text-accent"/>{commentMessage}</p>}
          </div>
        </div>
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4"><div><h3 className="mt-3 text-2xl font-bold text-brand">Recent comments</h3></div><span className="text-xs font-semibold text-slate-400">{comments.length} shown</span></div>
          {comments.length ? <div className="mt-6 grid gap-4 md:grid-cols-2">{comments.map(comment=><article key={comment.id} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand/20 hover:shadow-md"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-brand">{comment.name}</p><time className="text-[.68rem] text-slate-400">{dateLabel(comment.created_at)}</time></div><p className="mt-3 text-sm leading-7 text-slate-600">{comment.body}</p></article>)}</div> : <p className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-7 text-sm text-slate-500">No approved comments yet. Be the first to join the conversation.</p>}
        </div>
      </div>

      {likeOpen && <div className="blog-like-modal fixed inset-0 z-[100] flex items-center justify-center bg-[#07071f]/65 p-4 backdrop-blur-sm" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setLikeOpen(false);}}>
        <div role="dialog" aria-modal="true" aria-labelledby="newsletter-like-title" className="relative w-full max-w-[440px] rounded-[1.6rem] border border-white/70 bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,.28)] sm:p-8">
          <button type="button" onClick={()=>setLikeOpen(false)} aria-label="Close dialog" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"><X size={17}/></button>
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fceafa] text-accent"><Heart size={25}/></span>
          {likeSuccess ? <><h2 id="newsletter-like-title" className="mt-3 text-2xl font-bold text-brand">You're part of the conversation.</h2><p className="mt-3 text-sm leading-7 text-slate-600">{likeMessage}</p><button type="button" onClick={()=>setLikeOpen(false)} className="mt-7 min-h-12 w-full rounded-full bg-brand px-5 text-sm font-bold text-white transition hover:bg-accent">Continue reading</button></> : <>
            <h2 id="newsletter-like-title" className="mt-3 max-w-sm text-2xl font-bold leading-tight tracking-[-.04em] text-brand">Subscribe to like this article.</h2><p className="mt-3 text-sm leading-7 text-slate-500">Article likes are reserved for Ratsonbase newsletter subscribers. Enter your email below. If you're already subscribed, we'll recognise your email and add your like.</p>
            <form onSubmit={handleLike} className="mt-6 grid gap-3"><input type="text" maxLength={80} value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First name (optional)" aria-label="First name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-accent"/><input type="email" required value={likeEmail} onChange={e=>setLikeEmail(e.target.value)} placeholder="Email address" aria-label="Email address" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-accent"/><label className="flex items-start gap-3 text-xs leading-5 text-slate-500"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required className="mt-1 accent-[#b4049a]"/><span>I agree to receive occasional Ratsonbase news, project updates and insights by email. I understand I can unsubscribe at any time.</span></label><button disabled={likeLoading} className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white transition hover:bg-[#980281] disabled:opacity-60">{likeLoading?<LoaderCircle className="animate-spin" size={17}/>:<>Subscribe & like <Heart size={16}/></>}</button></form>
            {likeMessage&&!likeSuccess&&<p role="alert" className="mt-4 text-xs leading-6 text-rose-600">{likeMessage}</p>}
            <p className="mt-4 flex items-center justify-center gap-2 text-[.68rem] text-slate-400"><LockKeyhole size={12}/> Your email is handled securely. <Link href="/#newsletter" onClick={()=>setLikeOpen(false)} className="font-bold text-accent">Learn more <ArrowUpRight size={12}/></Link></p>
          </>}
        </div>
      </div>}
    </section>
  );
}
