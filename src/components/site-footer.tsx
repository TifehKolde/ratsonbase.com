import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#08082f] py-12 text-white">
      <div className="container-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link href="/" className="font-heading text-2xl font-extrabold tracking-[-.05em]">RATSONBASE</Link>
          <p className="mt-2 text-xs font-semibold tracking-[.16em] text-white/45">CONSTRUCTION LIMITED</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">Thoughtful construction, dependable delivery and lasting value. Building spaces that move life forward.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/60">
            <Link href="/about">About us</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/blog">Blog</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold">Get in touch</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/60">
            <Link href="/contact">Contact us</Link><Link href="/careers">Careers</Link><a href="mailto:info@ratsonbase.com">info@ratsonbase.com</a>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-white/10 pt-6 text-xs text-white/40">© {new Date().getFullYear()} Ratsonbase Construction Limited. All rights reserved.</div>
    </footer>
  );
}
