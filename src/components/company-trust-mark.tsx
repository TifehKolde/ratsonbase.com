"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function CompanyTrustMark() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (Math.abs(currentY - previousY) > 3) {
          setScrollDirection(currentY < previousY ? "up" : "down");
          previousY = currentY;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative isolate mt-8 inline-flex min-h-[76px] items-center overflow-hidden border-y border-brand/10 px-4 py-3 sm:min-h-[88px] sm:px-5">
      <Image
        src="/logos/ratsonbase-logo.png"
        alt=""
        aria-hidden="true"
        width={220}
        height={90}
        className={`pointer-events-none absolute left-1/2 top-1/2 z-[-1] h-[76px] w-[190px] -translate-y-1/2 object-contain opacity-[0.13] transition-transform duration-700 ease-out sm:h-[88px] sm:w-[220px] ${scrollDirection === "up" ? "-translate-x-[42%]" : "-translate-x-[58%]"}`}
      />
      <span className="relative z-10 border-l-[3px] border-accent pl-4 text-[.68rem] font-extrabold uppercase tracking-[.18em] text-brand sm:text-xs">
        Proudly Nigerian <span className="mx-1 text-accent">·</span> Built on trust
      </span>
    </div>
  );
}
