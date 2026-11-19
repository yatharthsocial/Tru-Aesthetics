"use client";

import { useEffect, useRef, useState } from "react";

const MAX_WAIT_MS = 1500;
// Reveal the content this close to the end, so it starts as the last frame settles.
const REVEAL_BEFORE_END_S = 0.25;
// If the film stalls, show the content anyway after its length plus this.
const STALL_GRACE_MS = 6000;
const END_FRAME = "/hero/hero-end.jpg";

/**
 * The first screen: the clinic's film plays once, full-screen, behind the header. The hero
 * content stays hidden until the film reaches its last frame (her portrait on the right),
 * then fades in slowly in the open space on the left (see .hero-reveal in globals.css).
 * With reduced motion, or if the browser won't autoplay, it opens on the last frame with
 * the content showing.
 */
export default function HeroShell({ children }: { children: React.ReactNode }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const film = video.current;
    let cancelled = false;

    // The header's entrance waits for the film and fonts, so nothing pops in mid-animation.
    const canPlay = new Promise<void>((resolve) => {
      if (!film || film.readyState >= 3) return resolve();
      film.addEventListener("canplay", () => resolve(), { once: true });
      film.addEventListener("error", () => resolve(), { once: true });
    });
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));
    Promise.race([Promise.all([canPlay, document.fonts.ready]), timeout]).then(
      () => {
        if (!cancelled) setReady(true);
      },
    );

    if (!film) return;
    const finish = () => {
      if (!cancelled) setDone(true);
    };
    // Rest on the last frame and show the content straight away.
    const showEnd = () => {
      film.pause();
      film.poster = END_FRAME;
      const seek = () => {
        if (Number.isFinite(film.duration)) film.currentTime = film.duration;
      };
      if (film.readyState >= 1) seek();
      else film.addEventListener("loadedmetadata", seek, { once: true });
      finish();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showEnd();
      return () => {
        cancelled = true;
      };
    }

    const onTime = () => {
      if (
        Number.isFinite(film.duration) &&
        film.currentTime >= film.duration - REVEAL_BEFORE_END_S
      )
        finish();
    };
    film.addEventListener("timeupdate", onTime);
    film.addEventListener("ended", finish);
    film.addEventListener("error", showEnd);
    film.play().catch(showEnd);
    const stall = window.setTimeout(
      finish,
      (Number.isFinite(film.duration) ? film.duration : 10) * 1000 +
        STALL_GRACE_MS,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(stall);
      film.removeEventListener("timeupdate", onTime);
      film.removeEventListener("ended", finish);
      film.removeEventListener("error", showEnd);
    };
  }, []);

  return (
    <section
      data-ready={ready}
      data-done={done}
      className="relative h-svh min-h-[560px] overflow-hidden bg-[#e4ecec]"
    >
      <video
        ref={video}
        aria-hidden="true"
        muted
        playsInline
        preload="auto"
        poster="/hero/hero-poster.jpg"
        className="hero-anim hero-silk absolute inset-0 size-full object-cover object-[70%_center] lg:object-center"
      >
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>

      {/* Light washes: under the header, at the foot (melting into the next section), and
          a soft veil behind the content, which comes in with it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#eef3f3] to-transparent"
      />
      <div
        aria-hidden="true"
        className="hero-veil pointer-events-none absolute inset-0 bg-gradient-to-t from-[#eef3f3] via-[#eef3f3]/60 to-transparent lg:bg-gradient-to-r lg:via-[#eef3f3]/45"
      />

      {children}
    </section>
  );
}
