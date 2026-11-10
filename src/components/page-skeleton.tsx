import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogThemeShell } from "@/components/blog-theme-shell";

type SkeletonVariant =
  | "home"
  | "projects"
  | "project-detail"
  | "services"
  | "service-detail"
  | "blog"
  | "blog-detail";

function Block({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton-block ${className}`} />;
}

function CardSkeleton({ image = true }: { image?: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111127]">
      {image && <Block className="aspect-[16/10] w-full rounded-none" />}
      <div className="space-y-4 p-6 sm:p-7">
        <Block className="h-3 w-1/4" />
        <Block className="h-6 w-3/4" />
        <Block className="h-3 w-full" />
        <Block className="h-3 w-5/6" />
        <Block className="mt-5 h-4 w-28" />
      </div>
    </article>
  );
}

function HeroSkeleton({ detail = false }: { detail?: boolean }) {
  return (
    <section className={`relative overflow-hidden bg-[#08082f] ${detail ? "py-24 sm:py-32" : "py-20 sm:py-28"}`}>
      <div className="container-shell">
        <Block className="mb-10 h-3 w-36 bg-white/15" />
        <Block className={`h-10 max-w-3xl bg-white/15 sm:h-14 ${detail ? "w-4/5" : "w-3/4"}`} />
        <Block className="mt-5 h-4 max-w-2xl bg-white/10" />
        <Block className="mt-3 h-4 max-w-xl bg-white/10" />
      </div>
    </section>
  );
}

function BlogListingSkeleton() {
  return (
    <div className="blog-index-page min-h-screen">
      <section className="blog-index-hero">
        <div className="container-shell">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Block className="mb-5 h-3 w-28" />
            <Block className="h-10 w-[min(90%,720px)] sm:h-14" />
            <Block className="mt-4 h-4 w-[min(78%,560px)]" />
            <Block className="mt-2 h-4 w-[min(60%,430px)]" />
            <Block className="mt-6 h-4 w-32" />
          </div>
        </div>
      </section>
      <div className="container-shell">
        <div className="blog-index-toolbar mt-7 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#111127] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }, (_, index) => <Block key={index} className={`h-10 rounded-full ${index === 0 ? "w-24" : "w-36"}`} />)}
          </div>
          <Block className="h-12 w-full rounded-full lg:max-w-xs" />
        </div>
        <section className="blog-index-results pb-20 pt-12">
          <div className="mb-7 flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
            <Block className="h-9 w-48" />
            <Block className="h-8 w-24 rounded-full" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

function BlogDetailSkeleton() {
  return (
    <div className="ratsonbase-article-page min-h-screen">
      <section className="article-editorial-hero">
        <div className="container-shell relative z-10 flex flex-col items-center text-center">
          <Block className="mb-4 h-3 w-48" />
          <div className="flex flex-wrap justify-center gap-3">
            <Block className="h-8 w-28 rounded-full" />
            <Block className="h-4 w-24 self-center" />
            <Block className="h-4 w-20 self-center" />
          </div>
          <Block className="mt-5 h-12 w-[min(92%,820px)] sm:h-16" />
          <Block className="mt-3 h-12 w-[min(76%,650px)] sm:h-16" />
          <div className="mt-5 inline-flex items-center gap-3 border-t border-brand/10 pt-4">
            <Block className="h-12 w-12 rounded-full" />
            <div className="space-y-2 text-left">
              <Block className="h-3 w-32" />
              <Block className="h-3 w-44" />
            </div>
          </div>
          <Block className="mt-6 h-10 w-36 rounded-full" />
        </div>
      </section>
      <article className="section-pad !pt-10 sm:!pt-14">
        <div className="container-shell">
          <Block className="mx-auto mb-12 aspect-[16/8.5] w-full max-w-5xl rounded-[1.5rem]" />
          <div className="article-reading-layout mx-auto max-w-6xl">
            <div className="article-reading-column min-w-0">
              <div className="mb-10 space-y-3">
                <Block className="h-5 w-full" />
                <Block className="h-5 w-4/5" />
              </div>
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-4 pt-5">
                  <Block className="h-8 w-3/5" />
                  <Block className="h-4 w-full" />
                  <Block className="h-4 w-full" />
                  <Block className="h-4 w-11/12" />
                  <Block className="h-4 w-4/5" />
                </div>
              ))}
              <div className="article-inline-cta mt-14 rounded-3xl p-7 sm:p-9">
                <Block className="skeleton-block-dark h-3 w-36" />
                <Block className="skeleton-block-dark mt-4 h-8 w-3/4" />
                <Block className="skeleton-block-dark mt-4 h-4 w-full" />
                <Block className="skeleton-block-dark mt-2 h-4 w-5/6" />
                <Block className="skeleton-block-dark mt-6 h-11 w-40 rounded-full" />
              </div>
              <div className="article-author-card mt-14 flex gap-5 rounded-3xl border border-brand/10 p-7">
                <Block className="h-20 w-20 shrink-0 rounded-full" />
                <div className="flex-1 space-y-3 pt-1">
                  <Block className="h-3 w-28" />
                  <Block className="h-6 w-44" />
                  <Block className="h-4 w-full" />
                  <Block className="h-4 w-5/6" />
                </div>
              </div>
              <div className="mt-16 space-y-6">
                <Block className="h-8 w-36" />
                <div className="rounded-3xl border border-slate-200 bg-[#fafaff] p-6 sm:p-8">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Block className="h-12 rounded-xl" />
                    <Block className="h-12 rounded-xl" />
                  </div>
                  <Block className="mt-4 h-32 rounded-xl" />
                  <Block className="mt-4 h-11 w-40 rounded-full" />
                </div>
                <Block className="h-7 w-44" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Block className="h-36 rounded-2xl" />
                  <Block className="h-36 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className="article-related-section section-pad">
        <div className="container-shell">
          <Block className="h-9 w-64" />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function ListingSkeleton({ type }: { type: "projects" | "services" }) {
  const count = type === "projects" ? 4 : 6;
  return (
    <>
      <HeroSkeleton />
      <section className="section-pad">
        <div className="container-shell">
          <div className="mb-12 grid gap-6 md:grid-cols-[1fr_.75fr] md:items-end">
            <div className="space-y-4"><Block className="h-9 w-4/5 sm:h-12" /><Block className="h-4 w-2/3" /></div>
            <div className="space-y-3"><Block className="h-3 w-full" /><Block className="h-3 w-5/6" /></div>
          </div>
          <div className={`mt-8 grid gap-6 ${type === "projects" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {Array.from({ length: count }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function DetailSkeleton({ type }: { type: "project-detail" | "service-detail" }) {
  return (
    <>
      <HeroSkeleton detail />
      <section className="section-pad">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-7"><Block className={type === "project-detail" ? "aspect-[16/9] w-full" : "aspect-[5/4] w-full"} /><Block className="h-8 w-3/4" />{Array.from({ length: 6 }, (_, index) => <Block key={index} className={`h-4 ${index % 2 ? "w-5/6" : "w-full"}`} />)}</div>
          <div className="space-y-4 rounded-2xl border border-slate-200 p-6"><Block className="h-6 w-2/3" />{Array.from({ length: 5 }, (_, index) => <Block key={index} className="h-4 w-full" />)}</div>
        </div>
      </section>
    </>
  );
}

function HomeSkeleton() {
  return (
    <>
      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#08082f] py-32 sm:min-h-[740px]"><div className="container-shell w-full space-y-7"><Block className="h-12 max-w-3xl bg-white/15 sm:h-20" /><Block className="h-12 max-w-2xl bg-white/15 sm:h-20" /><Block className="h-4 max-w-xl bg-white/10" /><Block className="h-4 max-w-md bg-white/10" /><div className="flex gap-3 pt-5"><Block className="h-14 w-44 rounded-full bg-white/15" /><Block className="h-14 w-40 rounded-full bg-white/10" /></div></div></section>
      <section className="section-pad"><div className="container-shell space-y-7"><Block className="h-10 w-2/3 sm:h-14" /><Block className="h-4 max-w-3xl" /><Block className="h-4 max-w-2xl" /></div></section>
      <section className="section-pad bg-[#f7f7fb]"><div className="container-shell"><Block className="mb-10 h-10 w-2/3 sm:h-14" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index} image={false} />)}</div></div></section>
    </>
  );
}

export function PageSkeleton({ variant }: { variant: SkeletonVariant }) {
  const isBlog = variant === "blog" || variant === "blog-detail";
  const content = variant === "home" ? <HomeSkeleton />
    : variant === "projects" || variant === "services" ? <ListingSkeleton type={variant} />
    : variant === "project-detail" || variant === "service-detail" ? <DetailSkeleton type={variant} />
    : variant === "blog" ? <BlogListingSkeleton /> : <BlogDetailSkeleton />;

  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page content</span>
      <SiteHeader />
      {isBlog ? <BlogThemeShell><main>{content}</main></BlogThemeShell> : <main>{content}</main>}
      <SiteFooter />
    </div>
  );
}
