"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "YppH2GNQ-Z8";

export function IntroVideo() {
  const [started, setStarted] = useState(false);
  return (
    <section className="section-pad relative overflow-hidden bg-[#08082f] text-white">
      <div className="absolute -right-28 -top-36 h-[430px] w-[430px] rounded-full border border-white/[.08]"/>
      <div className="absolute -bottom-44 left-[-8rem] h-[520px] w-[520px] rounded-full border border-white/[.07]"/>
      <div className="container-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          
          <h2 className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-.055em] sm:text-5xl lg:text-6xl">A closer look at the people, process and purpose behind the build.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">See how we approach construction, coordinate our work and bring each project from an idea to a finished space.</p>
        </div>
        <div className="video-frame group relative mx-auto mt-12 aspect-video w-full max-w-[1120px] overflow-hidden rounded-[1.6rem] border border-white/15 bg-black shadow-[0_35px_100px_rgba(0,0,0,.42)] sm:mt-16">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1&modestbranding=1`}
            title="Ratsonbase Construction Limited introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setStarted(true)}
          />
          {!started && <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#08082f]"><span className="grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/10 text-white shadow-2xl backdrop-blur-md"><Play size={28} fill="currentColor"/></span></div>}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="video-play-pulse grid h-20 w-20 place-items-center rounded-full border border-white/50 bg-white/15 text-white shadow-[0_0_0_14px_rgba(255,255,255,.08)] backdrop-blur-md sm:h-24 sm:w-24"><Play size={30} fill="currentColor"/></span>
          </div>

        </div>
      </div>
    </section>
  );
}
