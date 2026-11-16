"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroSlide = { src: string; alt: string };

export function HeroImageSlider({ slides }: { slides: HeroSlide[] }) {
  const safeSlides = slides.length ? slides.slice(0, 5) : [{ src: "/images/banners/DSC03322b.jpg", alt: "Ratsonbase construction project" }];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || safeSlides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % safeSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, safeSlides.length]);

  const changeSlide = (direction: number) => setActive((current) => (current + direction + safeSlides.length) % safeSlides.length);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#08082f]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} aria-label="Ratsonbase project image slider">
      {safeSlides.map((slide, index) => (
        <img key={slide.src} src={slide.src} alt={index === active ? slide.alt : ""} aria-hidden={index !== active} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" className={"absolute inset-0 h-full w-full object-cover object-[center_35%] transition-opacity duration-700 " + (index === active ? "opacity-100" : "opacity-0")} />
      ))}
      {safeSlides.length > 1 && (
        <div className="absolute bottom-[82px] right-5 z-20 flex items-center gap-2 sm:bottom-[94px] sm:right-10" aria-label="Hero image controls">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous hero image" className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-[#08082f]/35 text-white backdrop-blur-md transition hover:bg-white hover:text-brand"><ChevronLeft size={18} /></button>
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-[#08082f]/35 px-3 py-2" aria-label={"Slide " + (active + 1) + " of " + safeSlides.length}>
            {safeSlides.map((slide, index) => <button key={slide.src} type="button" onClick={() => setActive(index)} aria-label={"Show hero image " + (index + 1)} aria-current={active === index ? "true" : undefined} className={"h-1.5 rounded-full transition-all " + (active === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white")} />)}
          </div>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next hero image" className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-[#08082f]/35 text-white backdrop-blur-md transition hover:bg-white hover:text-brand"><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
