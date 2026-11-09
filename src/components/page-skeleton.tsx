"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
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

function ListingSkeleton({ type }: { type: "projects" | "services" | "blog" }) {
  const count = type === "projects" ? 4 : 6;
  return (
    <>
      <HeroSkeleton />
      <section className="section-pad">
        <div className="container-shell">
          <div className="mb-12 grid gap-6 md:grid-cols-[1fr_.75fr] md:items-end">
            <div className="space-y-4">
              <Block className="h-9 w-4/5 sm:h-12" />
              <Block className="h-4 w-2/3" />
            </div>
            <div className="space-y-3">
              <Block className="h-3 w-full" />
              <Block className="h-3 w-5/6" />
            </div>
          </div>
          {type === "blog" && <CardSkeleton />}
          <div className={`mt-8 grid gap-6 ${type === "projects" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {Array.from({ length: count }, (_, index) => <CardSkeleton key={index} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function DetailSkeleton({ type }: { type: "project-detail" | "service-detail" | "blog-detail" }) {
  if (type === "blog-detail") {
    return (
      <>
        <HeroSkeleton detail />
        <section className="section-pad">
          <div className="container-shell mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="space-y-7">
                <Block className="aspect-[16/9] w-full" />
                <Block className="h-8 w-4/5" />
                {Array.from({ length: 12 }, (_, index) => (
                  <Block key={index} className={`h-4 ${index % 3 === 0 ? "w-4/5" : "w-full"}`} />
                ))}
              </div>
              <div className="hidden space-y-4 lg:block">
                <Block className="h-48 w-full" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <HeroSkeleton detail />
      <section className="section-pad">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-7">
            <Block className={type === "project-detail" ? "aspect-[16/9] w-full" : "aspect-[5/4] w-full"} />
            <Block className="h-8 w-3/4" />
            {Array.from({ length: 6 }, (_, index) => <Block key={index} className={`h-4 ${index % 2 ? "w-5/6" : "w-full"}`} />)}
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 p-6">
            <Block className="h-6 w-2/3" />
            {Array.from({ length: 5 }, (_, index) => <Block key={index} className="h-4 w-full" />)}
          </div>
        </div>
      </section>
    </>
  );
}

function HomeSkeleton() {
  return (
    <>
      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#08082f] py-32 sm:min-h-[740px]">
        <div className="container-shell w-full space-y-7">
          <Block className="h-12 max-w-3xl bg-white/15 sm:h-20" />
          <Block className="h-12 max-w-2xl bg-white/15 sm:h-20" />
          <Block className="h-4 max-w-xl bg-white/10" />
          <Block className="h-4 max-w-md bg-white/10" />
          <div className="flex gap-3 pt-5">
            <Block className="h-14 w-44 rounded-full bg-white/15" />
            <Block className="h-14 w-40 rounded-full bg-white/10" />
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell space-y-7">
          <Block className="h-10 w-2/3 sm:h-14" />
          <Block className="h-4 max-w-3xl" />
          <Block className="h-4 max-w-2xl" />
        </div>
      </section>
      <section className="section-pad bg-[#f7f7fb]">
        <div className="container-shell">
          <Block className="mb-10 h-10 w-2/3 sm:h-14" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index} image={false} />)}
          </div>
        </div>
      </section>
    </>
  );
}

export function PageSkeleton({ variant }: { variant: SkeletonVariant }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page content</span>
      <SiteHeader />
      <main>
        {variant === "home" ? <HomeSkeleton /> : null}
        {variant === "projects" || variant === "services" || variant === "blog"
          ? <ListingSkeleton type={variant} />
          : null}
        {variant === "project-detail" || variant === "service-detail" || variant === "blog-detail"
          ? <DetailSkeleton type={variant} />
          : null}
      </main>
      <SiteFooter />
    </div>
  );
}
