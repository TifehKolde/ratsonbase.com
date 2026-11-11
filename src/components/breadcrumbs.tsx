import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({
  items,
  variant = "light",
  align = "start",
}: {
  items: Array<{ label: string; href?: string }>;
  variant?: "light" | "dark";
  align?: "start" | "center";
}) {
  const alignment = align === "center" ? "justify-center text-center" : "justify-start text-left";

  return (
    <nav aria-label="Breadcrumb" className={`mb-3 flex w-full ${alignment}`}>
      <ol className={`flex max-w-full flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold sm:text-sm ${alignment} ${variant === "dark" ? "text-slate-500" : "text-white/65"}`}>
        <li className="shrink-0">
          <Link href="/" className={`inline-flex items-center gap-1.5 transition ${variant === "dark" ? "hover:text-brand" : "hover:text-white"}`}>
            <Home size={14} aria-hidden="true" /> Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex min-w-0 max-w-full items-center gap-2">
            <ChevronRight size={13} className={variant === "dark" ? "shrink-0 text-slate-300" : "shrink-0 text-white/40"} aria-hidden="true" />
            {item.href && index !== items.length - 1 ? (
              <Link href={item.href} className={`min-w-0 truncate transition ${variant === "dark" ? "hover:text-brand" : "hover:text-white"}`}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={`min-w-0 max-w-[min(65vw,32rem)] break-words ${variant === "dark" ? "font-bold text-brand" : "font-semibold text-white"}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
