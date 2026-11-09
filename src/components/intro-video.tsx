import { Play } from "lucide-react";

const VIDEO_ID = "YppH2GNQ-Z8";

export function IntroVideo() {
  return (
    <section className="section-pad bg-[#08082f] text-white">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow text-[#f2a5e8]">Meet Ratsonbase</p>
          <h2 className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-.05em] sm:text-5xl">See how we bring ideas to life.</h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/65">Get to know Ratsonbase, our approach and the standards behind the work we deliver.</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-white/40">Company introduction</p>
        </div>
        <div className="video-frame relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
            title="Ratsonbase Construction Limited introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
