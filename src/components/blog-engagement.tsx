"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Heart, MessageCircle, Share2, Send, LoaderCircle, CheckCircle2 } from "lucide-react";
import { likePublicPost, submitPublicComment, type PublicComment } from "@/lib/public-api";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function BlogEngagement({ slug, initialLikes, initialComments, comments }: {
  slug: string; initialLikes: number; initialComments: number; comments: PublicComment[];
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [email, setEmail] = useState("");
  const [likeMessage, setLikeMessage] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const [name, setName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [body, setBody] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  async function handleLike(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLikeLoading(true); setLikeMessage("");
    try {
      const result = await likePublicPost(slug, email);
      setLikes(result.likes_count);
      setLikeMessage(result.already_liked ? "You have already liked this article." : "Thank you for showing this article some love.");
    } catch (error) { setLikeMessage(error instanceof Error ? error.message : "Unable to like this article."); }
    finally { setLikeLoading(false); }
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
      else { await navigator.clipboard.writeText(url); setShareMessage("Article link copied."); }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") setShareMessage("Could not share this article from this browser.");
    }
  }

  return (
    <section className="mt-14 border-t border-slate-200 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div><p className="eyebrow">Join the conversation</p><h2 className="mt-3 text-3xl font-bold text-brand">Your thoughts matter.</h2><p className="mt-2 text-sm text-slate-500">Share this article or add a thoughtful comment.</p></div>
        <button type="button" onClick={shareArticle} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-bold text-brand transition hover:border-brand hover:bg-brand-light"><Share2 size={16}/> Share article</button>
      </div>
      {shareMessage && <p role="status" className="mt-3 text-xs text-slate-500">{shareMessage}</p>}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#fceafa] text-accent"><Heart size={19}/></span><div><h3 className="font-bold text-brand">Appreciate this article?</h3><p className="text-xs text-slate-500">{likes} {likes===1?"like":"likes"} so far</p></div></div>
          <form onSubmit={handleLike} className="mt-5"><label className="mb-2 block text-xs font-bold text-slate-600" htmlFor="like-email">Newsletter subscriber email</label><div className="flex flex-col gap-2 sm:flex-row"><input id="like-email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="min-h-11 min-w-0 flex-1 rounded-full border border-slate-200 px-4 text-sm outline-none focus:border-accent"/><button disabled={likeLoading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-bold text-white transition hover:bg-accent disabled:opacity-60">{likeLoading?<LoaderCircle className="animate-spin" size={16}/>:<><Heart size={15}/> Like</>}</button></div></form>
          {likeMessage&&<p role="status" className="mt-3 text-xs leading-6 text-slate-500">{likeMessage}</p>}
          <p className="mt-3 text-[.68rem] leading-5 text-slate-400">Liking is available to active Ratsonbase newsletter subscribers.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-brand-light text-brand"><MessageCircle size={19}/></span><div><h3 className="font-bold text-brand">Leave a comment</h3><p className="text-xs text-slate-500">{initialComments} approved comments</p></div></div>
          <form onSubmit={handleComment} className="mt-5 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2"><input required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="min-h-11 min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-accent"/><input required type="email" value={commentEmail} onChange={e=>setCommentEmail(e.target.value)} placeholder="Email address" aria-label="Email address" className="min-h-11 min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-accent"/></div>
            <textarea required maxLength={5000} rows={3} value={body} onChange={e=>setBody(e.target.value)} placeholder="Write your comment..." aria-label="Write your comment" className="min-h-24 resize-y rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-accent"/>
            <button disabled={commentLoading} className="inline-flex min-h-11 items-center justify-center gap-2 justify-self-start rounded-full bg-accent px-5 text-sm font-bold text-white transition hover:bg-[#980281] disabled:opacity-60">{commentLoading?<LoaderCircle className="animate-spin" size={16}/>:<>Submit comment <Send size={15}/></>}</button>
          </form>
          {commentMessage&&<p role="status" className="mt-3 flex items-start gap-2 text-xs leading-6 text-slate-500"><CheckCircle2 size={15} className="mt-1 shrink-0 text-accent"/>{commentMessage}</p>}
          <p className="mt-3 text-[.68rem] leading-5 text-slate-400">Comments are reviewed before they appear publicly.</p>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Reader voices</p><h3 className="mt-3 text-2xl font-bold text-brand">Recent comments</h3></div><span className="text-xs font-semibold text-slate-400">{comments.length} shown</span></div>
        {comments.length ? <div className="mt-6 grid gap-4 md:grid-cols-2">{comments.map(comment=><article key={comment.id} className="rounded-2xl border border-slate-200 bg-[#fbfbfd] p-5"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-brand">{comment.name}</p><time className="text-[.68rem] text-slate-400">{dateLabel(comment.created_at)}</time></div><p className="mt-3 text-sm leading-7 text-slate-600">{comment.body}</p></article>)}</div> : <p className="mt-5 rounded-2xl bg-[#f7f7fb] p-6 text-sm text-slate-500">No approved comments yet. Be the first to join the conversation.</p>}
      </div>
    </section>
  );
}
