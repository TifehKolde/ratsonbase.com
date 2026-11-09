import { Play, Video } from "lucide-react";

export function IntroVideo() {
  const videoId = process.env.NEXT_PUBLIC_INTRO_VIDEO_ID;
  return (
    <section className="section-pad bg-[#08082f] text-white">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow text-[#f2a5e8]">Meet Ratsonbase</p>
          <h2 className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-.05em] sm:text-5xl">See how we bring ideas to life.</h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/65">A short introduction to our people, our approach and the standards behind the work we deliver.</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-white/40">Company introduction</p>
        </div>
        <div className="video-frame relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_70%_25%,rgba(180,4,154,.45),transparent_35%),linear-gradient(135deg,#17175e,#05051e)] shadow-2xl">
          {videoId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={"https://www.youtube-nocookie.com/embed/" + encodeURIComponent(videoId)}
              title="Ratsonbase Construction Limited company introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl"><Play size={24} fill="currentColor"/></span>
              <Video size={18} className="mt-6 text-[#e9a0df]"/>
              <p className="mt-3 text-lg font-bold">Our introduction film</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">Your YouTube video will appear here when its video ID is added.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
