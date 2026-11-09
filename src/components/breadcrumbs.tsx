import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/60 sm:text-sm">
        <li><Link href="/" className="inline-flex items-center gap-1.5 transition hover:text-white"><Home size={14}/> Home</Link></li>
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            <ChevronRight size={13} className="text-white/35"/>
            {item.href && index !== items.length - 1
              ? <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
              : <span aria-current="page" className="max-w-[min(55vw,28rem)] truncate text-white">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
