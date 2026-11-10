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

function HeroSkeleton() {
  return (
    <section className="page-hero relative isolate overflow-hidden bg-[#08082f] py-16 text-white sm:py-24 lg:py-28">
      <div className="page-hero-orb absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/15" />
      <div className="page-hero-orb absolute -right-8 -top-16 h-64 w-64 rounded-full border border-white/10" />
      <div className="container-shell relative z-10">
        <Block className="mb-6 h-3 w-40 bg-white/20" />
        <Block className="h-12 w-[min(90%,760px)] bg-white/20 sm:h-16" />
        <Block className="mt-3 h-12 w-[min(68%,580px)] bg-white/20 sm:h-16" />
        <Block className="mt-7 h-4 w-[min(80%,620px)] bg-white/15" />
        <Block className="mt-3 h-4 w-[min(65%,500px)] bg-white/15" />
        <Block className="mt-9 h-12 w-44 rounded-full bg-white/20" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08082f]/35 to-transparent" />
    </section>
  );
}

function ProjectCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative">
        <Block className="aspect-[16/10] w-full rounded-none" />
        <Block className="absolute left-5 top-5 h-7 w-28 rounded-full bg-white/25" />
      </div>
      <div className="p-7">
        <Block className="h-3 w-32" />
        <Block className="mt-4 h-7 w-3/4" />
        <Block className="mt-4 h-3 w-full" />
        <Block className="mt-2 h-3 w-5/6" />
        <Block className="mt-6 h-4 w-32" />
      </div>
    </article>
  );
}

function ServiceCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative">
        <Block className="aspect-[16/9] w-full rounded-none" />
        <Block className="absolute left-5 top-5 h-7 w-24 rounded-full bg-white/25" />
      </div>
      <div className="flex min-h-[230px] flex-col p-7">
        <Block className="h-7 w-4/5" />
        <Block className="mt-4 h-3 w-full" />
        <Block className="mt-2 h-3 w-11/12" />
        <Block className="mt-auto h-4 w-32" />
      </div>
    </article>
  );
}
function BlogPostCardSkeleton() {
  return (
    <article className="blog-post-card flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111127]">
      <Block className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Block className="h-3 w-24" />
          <Block className="h-3 w-20" />
        </div>
        <Block className="mt-4 h-6 w-11/12" />
        <Block className="mt-2 h-6 w-3/4" />
        <div className="mt-4 space-y-2">
          <Block className="h-3 w-full" />
          <Block className="h-3 w-full" />
          <Block className="h-3 w-4/5" />
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <Block className="h-9 w-9 rounded-full" />
            <Block className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Block className="h-3 w-8" />
            <Block className="h-3 w-8" />
            <Block className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogListingSkeleton() {
  return (
    <div className="blog-index-page min-h-screen">
      <section className="blog-index-hero">
        <div className="container-shell">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Block className="mb-5 h-3 w-28" />
            <Block className="h-10 w-[min(90%,720px)] sm:h-14"  />
            <Block className="mt-2 h-10 w-[min(68%,540px)] sm:h-14" />
            <Block className="mt-4 h-4 w-[min(78%,560px)]" />
            <Block className="mt-2 h-4 w-[min(60%,430px)]" />
            <Block className="mt-6 h-4 w-32" />
          </div>
        </div>
      </section>
      <div className="container-shell">
        <div className="blog-index-toolbar mt-7 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#111127] lg:flex-row lg:items-center lg:justify-between">
          <div className="blog-category-list">
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
            {Array.from({ length: 6 }, (_, index) => <BlogPostCardSkeleton key={index} />)}
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
            <div className="space-y-4"><Block className="h-10 w-4/5 sm:h-12" /><Block className="h-4 w-2/3" /></div>
            <div className="space-y-3"><Block className="h-3 w-full" /><Block className="h-3 w-5/6" /><Block className="h-3 w-4/5" /></div>
          </div>
          <div className={`mt-12 grid gap-7 ${type === "projects" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {Array.from({ length: count }, (_, index) => type === "projects"
              ? <ProjectCardSkeleton key={index} />
              : <ServiceCardSkeleton key={index} />)}
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#f6f6fc]">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div className="space-y-4"><Block className="h-10 w-5/6 sm:h-12" /><Block className="h-4 w-full" /><Block className="h-4 w-4/5" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, index) => <div key={index} className="rounded-2xl bg-white p-6"><Block className="h-3 w-10" /><Block className="mt-4 h-5 w-3/4" /><Block className="mt-3 h-3 w-full" /><Block className="mt-2 h-3 w-5/6" /></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell rounded-3xl bg-brand p-8 sm:p-12">
          <Block className="h-9 w-2/3 bg-white/20" />
          <Block className="mt-4 h-4 w-1/2 bg-white/15" />
          <Block className="mt-7 h-12 w-44 rounded-full bg-white/20" />
        </div>
      </section>
    </>
  );
}
function DetailSkeleton({ type }: { type: "project-detail" | "service-detail" }) {
  if (type === "project-detail") {
    return (
      <>
        <HeroSkeleton />
        <section className="section-pad">
          <div className="container-shell grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            <div className="space-y-8">
              <Block className="aspect-[16/9] w-full rounded-2xl" />
              <div className="space-y-4"><Block className="h-9 w-3/4" /><Block className="h-4 w-full" /><Block className="h-4 w-full" /><Block className="h-4 w-5/6" /></div>
              <div className="rounded-2xl border border-[#e8e8f1] bg-[#f8f8fc] p-7"><Block className="h-6 w-40" /><Block className="mt-4 h-4 w-full" /><Block className="mt-2 h-4 w-5/6" /><Block className="mt-6 h-12 w-52 rounded-full" /></div>
            </div>
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <Block className="h-7 w-2/3" />
              {Array.from({ length: 5 }, (_, index) => <div key={index} className="flex gap-3 border-b border-slate-100 py-5"><Block className="h-9 w-9 rounded-xl" /><div className="flex-1 space-y-2"><Block className="h-3 w-24" /><Block className="h-4 w-32" /></div></div>)}
              <div className="mt-6 rounded-xl bg-[#f8f5fb] p-5"><Block className="h-4 w-40" /><Block className="mt-3 h-3 w-full" /><Block className="mt-4 h-4 w-36" /></div>
            </aside>
          </div>
        </section>
        <section className="section-pad"><div className="container-shell"><Block className="h-10 w-2/3" /><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <ProjectCardSkeleton key={index} />)}</div></div></section>
      </>
    );
  }

  return (
    <>
      <HeroSkeleton />
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div className="space-y-5"><Block className="h-10 w-5/6 sm:h-12" /><Block className="h-4 w-full" /><Block className="h-4 w-full" /><Block className="h-4 w-5/6" /><Block className="mt-4 h-12 w-48 rounded-full" /></div>
          <Block className="aspect-[5/4] w-full rounded-3xl" />
        </div>
      </section>
      <section className="section-pad bg-[#f6f6fc]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4"><Block className="h-10 w-5/6 sm:h-12" /><Block className="h-4 w-full" /><Block className="h-4 w-4/5" /></div>
          <div className="grid gap-4 sm:grid-cols-2">{Array.from({ length: 4 }, (_, index) => <div key={index} className="flex gap-4 rounded-2xl bg-white p-6"><Block className="h-5 w-5 rounded-full" /><Block className="h-4 flex-1" /></div>)}</div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell"><Block className="h-10 w-2/3" /><div className="mt-10 grid gap-5 md:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <div key={index} className="rounded-2xl border border-slate-200 p-7"><Block className="h-6 w-6" /><Block className="mt-6 h-3 w-10" /><Block className="mt-3 h-6 w-3/4" /><Block className="mt-3 h-3 w-full" /><Block className="mt-2 h-3 w-5/6" /></div>)}</div></div>
      </section>
      <section className="section-pad bg-[#f6f6fc]"><div className="container-shell"><Block className="h-9 w-48" /><div className="mt-8 grid gap-5 md:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <ServiceCardSkeleton key={index} />)}</div></div></section>
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
