"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send, LoaderCircle, CheckCircle2 } from "lucide-react";
import { submitPublicComment, type PublicComment } from "@/lib/public-api";
import { TurnstileField } from "@/components/turnstile-field";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function BlogEngagement({ slug, initialComments, comments }: {
  slug: string; initialComments: number; comments: PublicComment[];
}) {
  const [name, setName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [body, setBody] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const formStartedAt = useRef(0);

  useEffect(() => { formStartedAt.current = Date.now(); }, []);

  async function handleComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCommentLoading(true);
    setCommentMessage("");
    try {
      const result = await submitPublicComment(slug, { name, email: commentEmail, body, website, form_elapsed_ms: Date.now() - formStartedAt.current, turnstile_token: turnstileToken });
      setCommentMessage(result.message || "Your comment has been submitted and is awaiting moderation.");
      setName("");
      setCommentEmail("");
      setBody("");
      setTurnstileResetKey(value => value + 1);
    } catch (error) {
      setCommentMessage(error instanceof Error ? error.message : "Unable to submit your comment.");
    } finally {
      setCommentLoading(false);
    }
  }

  return (
    <section className="blog-engagement mt-16">
      <div id="reader-comments" className="scroll-mt-28">
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-[-.04em] text-brand dark:text-white sm:text-3xl">Comments</h2>
            <span className="text-xs font-semibold text-slate-400">{initialComments} {initialComments === 1 ? "comment" : "comments"}</span>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-[#fafaff] p-5 sm:p-8 dark:border-white/10 dark:bg-slate-900">
            <form onSubmit={handleComment} className="relative grid gap-4">
              <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="comment-website">Leave this field empty</label>
                <input id="comment-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required maxLength={100} value={name} onChange={event => setName(event.target.value)} placeholder="Your name" aria-label="Your name" autoComplete="name" className="min-h-12 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none dark:border-white/10 dark:bg-[#15152b] dark:text-white transition focus:border-accent focus:ring-4 focus:ring-accent/5" />
                <input required type="email" maxLength={254} value={commentEmail} onChange={event => setCommentEmail(event.target.value)} placeholder="Email address" aria-label="Email address" autoComplete="email" className="min-h-12 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/5 dark:border-white/10 dark:bg-[#15152b] dark:text-white" />
              </div>
              <textarea required maxLength={5000} rows={4} value={body} onChange={event => setBody(event.target.value)} placeholder="Write your thoughts..." aria-label="Write your comment" className="min-h-32 resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none dark:border-white/10 dark:bg-[#15152b] dark:text-white transition focus:border-accent focus:ring-4 focus:ring-accent/5" />
              <TurnstileField onTokenChange={setTurnstileToken} resetKey={turnstileResetKey} theme="auto" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[.68rem] leading-5 text-slate-400">Your email address will not be displayed publicly. Comments are reviewed before publication.</p>
                <button disabled={commentLoading || !turnstileToken} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:bg-accent disabled:opacity-60">
                  {commentLoading ? <LoaderCircle className="animate-spin" size={16} /> : <>Post comment <Send size={15} /></>}
                </button>
              </div>
            </form>
            {commentMessage && <p role="status" className="mt-4 flex items-start gap-2 text-xs leading-6 text-slate-600 dark:text-slate-300"><CheckCircle2 size={15} className="mt-1 shrink-0 text-accent" />{commentMessage}</p>}
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-2xl font-bold text-brand dark:text-white">Recent comments</h3>
            <span className="text-xs font-semibold text-slate-400">{comments.length} shown</span>
          </div>
          {comments.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {comments.map(comment => (
                <article key={comment.id} className="rounded-2xl border border-slate-200 bg-white p-5 transition dark:border-white/10 dark:bg-slate-900 hover:border-brand/20 hover:shadow-md">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-brand dark:text-white">{comment.name}</p>
                    <time className="text-[.68rem] text-slate-400">{dateLabel(comment.created_at)}</time>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{comment.body}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-7 text-sm text-slate-500 dark:border-white/15 dark:bg-slate-900 dark:text-slate-400">No approved comments yet. Be the first to join the conversation.</p>
          )}
        </div>
      </div>
    </section>
  );
}
