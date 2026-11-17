import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass, HardHat } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for may have moved or is no longer available.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader forceSolid />
      <main className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-[#07072f] py-24 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-44 h-[620px] w-[620px] rounded-full border border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-[370px] w-[370px] rounded-full border border-[#B4049A]/30" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/[.06] text-[#ef9be3]">
              <HardHat size={30} strokeWidth={1.6} />
            </div>
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[.28em] text-[#ef9be3]">Error 404 · Page not found</p>
            <h1 className="mt-5 font-heading text-[clamp(5rem,17vw,10rem)] font-extrabold leading-[.82] tracking-[-.09em] text-white">404</h1>
            <h2 className="mt-8 font-heading text-3xl font-bold tracking-[-.04em] sm:text-5xl">Looks like this page is off the plans.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              The page may have moved, the link may be outdated, or the address may have been entered incorrectly. Let's get you back on track.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#B4049A] px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#980281]">
                <ArrowLeft size={16} /> Back to homepage
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[.05] px-7 text-sm font-bold text-white transition hover:bg-white/10">
                Contact our team <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 border-t border-white/10 pt-7 text-sm text-white/55">
              <Link href="/services" className="inline-flex items-center gap-2 transition hover:text-white"><Compass size={15} /> Explore services</Link>
              <Link href="/projects" className="transition hover:text-white">View projects</Link>
              <Link href="/about" className="transition hover:text-white">About Ratsonbase</Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
