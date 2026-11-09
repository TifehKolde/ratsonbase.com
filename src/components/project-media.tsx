"use client";

import { useState } from "react";
import { Play, X, Images, Maximize2 } from "lucide-react";

function videoSource(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\\./, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? { embed: "https://www.youtube-nocookie.com/embed/" + id, direct: false } : null;
    }
    if (host === "youtu.be") return { embed: "https://www.youtube-nocookie.com/embed/" + parsed.pathname.slice(1), direct: false };
    if (host === "vimeo.com") return { embed: "https://player.vimeo.com/video/" + parsed.pathname.split("/").filter(Boolean).pop(), direct: false };
    if (/\\.mp4($|\\?)/i.test(url)) return { embed: url, direct: true };
  } catch { return null; }
  return null;
}

export function ProjectMedia({ title, featuredImage, galleryImages = [], videoUrl }: {
  title: string; featuredImage?: string | null; galleryImages?: string[]; videoUrl?: string | null;
}) {
  const images = Array.from(new Set([featuredImage, ...galleryImages].filter((value): value is string => Boolean(value))));
  const [selected, setSelected] = useState<string | null>(null);
  const video = videoUrl ? videoSource(videoUrl) : null;

  return (
    <div className="space-y-12">
      {images.length > 0 && <section aria-label="Project photo gallery">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="eyebrow">Project gallery</p><h2 className="mt-3 text-2xl font-bold text-brand sm:text-3xl">A closer look at the details.</h2></div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400"><Images size={15}/>{images.length} {images.length === 1 ? "photo" : "photos"}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image, index) => <button key={image} type="button" onClick={() => setSelected(image)} aria-label={"View project photo " + (index + 1)} className={(index === 0 ? "col-span-2 aspect-[16/9] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto " : "aspect-[4/3] ") + "group relative overflow-hidden rounded-2xl bg-slate-100 text-left"}>
            <img src={image} alt={title + " — project photo " + (index + 1)} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand opacity-0 shadow transition group-hover:opacity-100"><Maximize2 size={16}/></span>
          </button>)}
        </div>
      </section>}
      {video && <section>
        <div className="mb-5"><p className="eyebrow">Project film</p><h2 className="mt-3 text-2xl font-bold text-brand sm:text-3xl">See the project in motion.</h2></div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#08082f] shadow-xl">
          {video.direct ? <video className="h-full w-full" controls preload="metadata" playsInline src={video.embed}/> : <iframe className="absolute inset-0 h-full w-full" src={video.embed} title={title + " project video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>}
        </div>
      </section>}
      {selected && <div role="dialog" aria-modal="true" aria-label="Project photo preview" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05051f]/95 p-4" onClick={() => setSelected(null)}>
        <button type="button" onClick={() => setSelected(null)} aria-label="Close photo preview" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"><X size={22}/></button>
        <img src={selected} alt={title + " enlarged project photo"} className="max-h-[88vh] max-w-full rounded-lg object-contain" onClick={(event) => event.stopPropagation()}/>
      </div>}
    </div>
  );
}
