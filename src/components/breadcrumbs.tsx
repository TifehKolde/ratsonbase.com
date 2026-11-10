import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items, variant = "light" }: { items: Array<{ label: string; href?: string }>; variant?: "light" | "dark" }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol className={`flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm ${variant === "dark" ? "text-slate-500" : "text-white/60"}`}>
        <li><Link href="/" className={`inline-flex items-center gap-1.5 transition ${variant === "dark" ? "hover:text-brand" : "hover:text-white"}`}><Home size={14}/> Home</Link></li>
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            <ChevronRight size={13} className={variant === "dark" ? "text-slate-300" : "text-white/35"}/>
            {item.href && index !== items.length - 1
              ? <Link href={item.href} className={`transition ${variant === "dark" ? "hover:text-brand" : "hover:text-white"}`}>{item.label}</Link>
              : <span aria-current="page" className={`max-w-[min(55vw,28rem)] truncate ${variant === "dark" ? "font-bold text-brand" : "text-white"}`}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
