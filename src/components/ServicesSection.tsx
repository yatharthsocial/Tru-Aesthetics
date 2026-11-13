"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import ServiceFocus, { ALL_FIXES, SYNC_S } from "@/components/ServiceFocus";
import { SERVICES } from "@/components/services";
import { getSmoothScroll } from "@/lib/smoothScroll";

const pad = (value: number) => String(value).padStart(2, "0");

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

// Desktop: the section sits in a taller track and stays on screen (CSS sticky) while the page
// scrolls through it. Scrolling is never held or taken over: the page always moves with the
// wheel or trackpad, and which treatment is shown simply follows where the page is.
//
// The stretch of scrolling each step gets, in viewport heights: the four treatments, then the
// finale ("After Trú Aesthetics"). Botox & Fillers reveals three areas in turn and the finale
// is the closing look, so they get longer stretches.
const STEP_VH = [90, 90, 90, 120, 120];
const TRACK_VH = 100 + STEP_VH.reduce((sum, vh) => sum + vh, 0);
// The first treatment comes into focus a little before the section settles at the top.
const LEAD_VH = 30;

export default function ServicesSection() {
  const isDesktop = useIsDesktop();
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);
  // Phones: a tap opens a treatment.
  const [opened, setOpened] = useState(-1);
  const track = useRef<HTMLDivElement>(null);

  // Where the track starts, and where each step begins (as page scroll positions).
  const geometry = () => {
    const el = track.current;
    if (!el) return null;
    const vh = window.innerHeight;
    const lead = (LEAD_VH / 100) * vh;
    const start = el.getBoundingClientRect().top + window.scrollY - lead;
    const range = el.offsetHeight - vh + lead;
    const total = STEP_VH.reduce((sum, value) => sum + value, 0);
    let at = start;
    const bounds = STEP_VH.map((value) => {
      const from = at;
      at += (value / total) * range;
      return [from, at] as const;
    });
    return { start, bounds };
  };

  useEffect(() => {
    if (!isDesktop) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const g = geometry();
      if (!g) return;
      const y = window.scrollY;
      let step = -1;
      g.bounds.forEach(([from], index) => {
        if (y >= from) step = index;
      });
      setComplete(step >= SERVICES.length);
      setActive(step >= SERVICES.length ? -1 : step);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  // Clicking a treatment on desktop glides to the middle of its stretch.
  const scrollToStep = (index: number) => {
    const g = geometry();
    if (!g) return;
    const [from, to] = g.bounds[index];
    const target = (from + to) / 2;
    const lenis = getSmoothScroll();
    if (lenis) lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const engaged = active >= 0;
  const applied = complete
    ? ALL_FIXES
    : engaged
      ? ALL_FIXES.slice(0, active + 1)
      : [];
  const caption = engaged ? SERVICES[active].description : "";

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate bg-[#eef3f3] px-5 pt-8 pb-20 lg:px-[6%] lg:pt-12 lg:pb-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] border-t border-foreground/15" />

      <div
        ref={track}
        className="lg:h-[var(--track)]"
        style={{ "--track": `${TRACK_VH}vh` } as CSSProperties}
      >
        <div className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:pt-0">
          <Reveal className="mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 xl:gap-24">
            {/* Left: the heading, then the treatments. */}
            <div>
              <p
                data-reveal
                className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
              >
                Our services
              </p>
              <h2
                id="services-heading"
                data-reveal
                className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl"
              >
                Treatments, <span className="text-brand">tailored</span> to you
              </h2>
              <p
                data-reveal
                className="mt-4 max-w-md text-base leading-relaxed text-ink-muted"
              >
                See the area each treatment focuses on. Every plan starts with a
                consultation.
              </p>

              <ol className="mt-10 border-t border-foreground/15 lg:mt-12">
                {SERVICES.map(
                  ({ name, category, description, featured }, index) => {
                    const isActive = isDesktop
                      ? index === active
                      : index === opened;
                    return (
                      <li
                        key={name}
                        data-reveal
                        className="border-b border-foreground/15"
                      >
                        <button
                          type="button"
                          aria-expanded={isActive}
                          onClick={() =>
                            isDesktop
                              ? scrollToStep(index)
                              : setOpened(opened === index ? -1 : index)
                          }
                          className="group relative flex w-full items-center gap-4 py-5 text-left lg:gap-6 xl:py-6"
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute bottom-[-1px] left-0 h-px bg-brand transition-[width] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive ? "w-full" : "w-0"
                            }`}
                          />
                          <span
                            className={`w-7 shrink-0 text-sm font-medium transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive ? "text-brand-deep" : "text-ink-muted/70"
                            }`}
                          >
                            {pad(index + 1)}
                          </span>
                          <span
                            className={`flex-1 font-display text-3xl leading-tight transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-4xl xl:text-[2.75rem] ${
                              isActive
                                ? "text-brand-deep"
                                : "text-foreground/60 group-hover:text-foreground"
                            }`}
                          >
                            {name}
                          </span>
                          <span
                            className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-medium sm:inline ${
                              featured
                                ? "bg-brand text-ink"
                                : "border border-foreground/20 text-ink-muted"
                            }`}
                          >
                            {featured ? "Our speciality" : category}
                          </span>
                        </button>

                        {/* Phones only: tap to open, with the portrait inside. */}
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pb-6 pl-11">
                              <p className="max-w-md text-base leading-relaxed text-ink-muted">
                                {description}
                              </p>
                              <span className="mt-3 inline-block rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium text-ink-muted sm:hidden">
                                {featured ? "Our speciality" : category}
                              </span>
                              {isActive && isDesktop === false && (
                                <ServiceFocus
                                  index={index}
                                  engaged
                                  className="mt-4 w-full max-w-[320px]"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  },
                )}
              </ol>
            </div>

            {/* Right: the portrait, level with the heading and list, with the current
                treatment's description under it. */}
            <div
              data-reveal
              className="hidden w-[min(460px,calc((100vh-13rem)*0.8))] lg:block"
            >
              {isDesktop && (
                <ServiceFocus
                  // In the finale she keeps the last treatment's markers while they fade away.
                  index={complete ? SERVICES.length - 1 : Math.max(active, 0)}
                  engaged={engaged}
                  complete={complete}
                  applied={applied}
                />
              )}
              <div className="mx-auto mt-4 min-h-[5.25rem] max-w-sm text-center">
                {complete ? (
                  <div
                    key="finale"
                    className="service-in"
                    // Follows the tooltips fading away.
                    style={{
                      animationDuration: `${SYNC_S}s`,
                      animationDelay: "0.5s",
                    }}
                  >
                    <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-ink uppercase">
                      After Trú Aesthetics
                    </span>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      Every treatment, planned around you, for your natural
                      best.
                    </p>
                  </div>
                ) : (
                  <p
                    key={caption}
                    className="service-in text-base leading-relaxed text-ink-muted"
                    style={{ animationDuration: `${SYNC_S}s` }}
                  >
                    {caption}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
