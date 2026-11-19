"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import Reveal from "@/components/Reveal";
import ServiceFocus, { ALL_FIXES, SYNC_S } from "@/components/ServiceFocus";
import { SERVICES } from "@/components/services";
import { getSmoothScroll } from "@/lib/smoothScroll";

const pad = (value: number) => String(value).padStart(2, "0");

// The section sits in a taller track and stays on screen (CSS sticky) while the page scrolls
// through it, on phones as on desktop. Scrolling is never held or taken over: the page
// always moves with the wheel, trackpad or finger, and which treatment is shown simply
// follows where the page is.
//
// The stretch of scrolling each step gets, in screen heights: the four treatments, then the
// finale ("After Trú Aesthetics"). Botox & Fillers reveals three areas in turn and the finale
// is the closing look, so they get longer stretches.
const STEP_VH = [90, 90, 90, 120, 120];
const MOBILE_STEP_VH = [70, 70, 70, 90, 90];
const trackHeight = (steps: number[]) =>
  100 + steps.reduce((sum, value) => sum + value, 0);
// The first treatment comes into focus a little before the section settles at the top.
const LEAD = 0.3;

/** Which step the page is on, from where the track sits in the window. */
function useSteps(track: RefObject<HTMLDivElement | null>, steps: number[]) {
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);

  // Where each step begins and ends, as page scroll positions.
  const bounds = () => {
    const el = track.current;
    if (!el) return null;
    const vh = window.innerHeight;
    const lead = LEAD * vh;
    const start = el.getBoundingClientRect().top + window.scrollY - lead;
    const range = el.offsetHeight - vh + lead;
    const total = steps.reduce((sum, value) => sum + value, 0);
    let at = start;
    return steps.map((value) => {
      const from = at;
      at += (value / total) * range;
      return [from, at] as const;
    });
  };

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const b = bounds();
      if (!b) return;
      const y = window.scrollY;
      let step = -1;
      b.forEach(([from], index) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `bounds` only reads refs and the fixed step list
  }, []);

  // Glides the page to the middle of a treatment's stretch.
  const goTo = (index: number) => {
    const b = bounds();
    if (!b) return;
    const [from, to] = b[index];
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
  return { active, complete, engaged, applied, goTo };
}

/** "After Trú Aesthetics": the closing note under the portrait. */
function Finale() {
  return (
    <div
      key="finale"
      className="service-in"
      // Follows the tooltips fading away.
      style={{ animationDuration: `${SYNC_S}s`, animationDelay: "0.5s" }}
    >
      <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-ink uppercase">
        After Trú Aesthetics
      </span>
      <p className="mt-3 text-base leading-relaxed text-ink-muted">
        Every treatment, planned around you, for your natural best.
      </p>
    </div>
  );
}

function Heading({ id }: { id: string }) {
  return (
    <>
      <p
        data-reveal
        className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
      >
        Our services
      </p>
      <h2
        id={id}
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
    </>
  );
}

function DesktopServices() {
  const track = useRef<HTMLDivElement>(null);
  const { active, complete, engaged, applied, goTo } = useSteps(track, STEP_VH);
  const caption = engaged ? SERVICES[active].description : "";

  return (
    <div
      ref={track}
      className="h-[var(--track)]"
      style={{ "--track": `${trackHeight(STEP_VH)}vh` } as CSSProperties}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <Reveal className="mx-auto grid w-full max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-16 xl:gap-24">
          {/* Left: the heading, then the treatments. */}
          <div>
            <Heading id="services-heading" />
            <ol className="mt-12 border-t border-foreground/15">
              {SERVICES.map(({ name, category, featured }, index) => {
                const isActive = index === active;
                return (
                  <li
                    key={name}
                    data-reveal
                    className="border-b border-foreground/15"
                  >
                    <button
                      type="button"
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => goTo(index)}
                      className="group relative flex w-full items-center gap-6 py-5 text-left xl:py-6"
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
                        className={`flex-1 font-display text-4xl leading-tight transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:text-[2.75rem] ${
                          isActive
                            ? "text-brand-deep"
                            : "text-foreground/60 group-hover:text-foreground"
                        }`}
                      >
                        {name}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          featured
                            ? "bg-brand text-ink"
                            : "border border-foreground/20 text-ink-muted"
                        }`}
                      >
                        {featured ? "Our speciality" : category}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: the portrait, with the current treatment's description under it. */}
          <div data-reveal className="w-[min(460px,calc((100vh-13rem)*0.8))]">
            <ServiceFocus
              // In the finale she keeps the last treatment's markers while they fade away.
              index={complete ? SERVICES.length - 1 : Math.max(active, 0)}
              engaged={engaged}
              complete={complete}
              applied={applied}
            />
            <div className="mx-auto mt-4 min-h-[5.25rem] max-w-sm text-center">
              {complete ? (
                <Finale />
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
  );
}

/**
 * Phones: the heading scrolls by, then the portrait stays on screen while each treatment
 * plays on her face in turn, with its name and description underneath, ending on
 * "After Trú Aesthetics".
 */
function MobileServices() {
  const track = useRef<HTMLDivElement>(null);
  const { active, complete, engaged, applied, goTo } = useSteps(
    track,
    MOBILE_STEP_VH,
  );
  const current = engaged ? SERVICES[active] : null;

  return (
    <>
      <Reveal className="pt-14">
        <Heading id="services-heading-mobile" />
      </Reveal>

      <div
        ref={track}
        className="mt-6 h-[var(--track)]"
        style={
          { "--track": `${trackHeight(MOBILE_STEP_VH)}svh` } as CSSProperties
        }
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-4 py-6">
          {/* Where you are among the four treatments. */}
          <ol className="flex justify-center gap-2" aria-label="Treatments">
            {SERVICES.map(({ name }, index) => {
              const isActive = index === active;
              const isDone = complete || index < active;
              return (
                <li key={name}>
                  <button
                    type="button"
                    aria-label={name}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => goTo(index)}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors duration-500 ${
                      isActive
                        ? "bg-brand-deep text-white"
                        : isDone
                          ? "bg-brand/25 text-brand-deep"
                          : "border border-foreground/20 text-ink-muted"
                    }`}
                  >
                    {pad(index + 1)}
                  </button>
                </li>
              );
            })}
          </ol>

          <ServiceFocus
            index={complete ? SERVICES.length - 1 : Math.max(active, 0)}
            engaged={engaged}
            complete={complete}
            applied={applied}
            noteList={false}
            className="mx-auto w-[min(84vw,calc((100svh-17rem)*0.8))]"
          />

          <div
            className="mx-auto min-h-[8.5rem] max-w-md text-center"
            aria-live="polite"
          >
            {complete ? (
              <Finale />
            ) : current ? (
              <div
                key={current.name}
                className="service-in"
                style={{ animationDuration: `${SYNC_S}s` }}
              >
                <p className="font-display text-3xl leading-tight text-brand-deep">
                  {current.name}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    current.featured
                      ? "bg-brand text-ink"
                      : "border border-foreground/20 text-ink-muted"
                  }`}
                >
                  {current.featured ? "Our speciality" : current.category}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {current.description}
                </p>
              </div>
            ) : (
              <p className="text-sm text-ink-muted">
                Scroll to see each treatment.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Our services"
      className="relative isolate bg-[#eef3f3] px-5 pt-8 lg:px-[6%] lg:pt-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] border-t border-foreground/15" />

      {/* Both layouts are in the page from the first paint; CSS shows the one that fits, so
          nothing shifts the sections below once the page loads. */}
      <div className="hidden lg:block">
        <DesktopServices />
      </div>
      <div className="lg:hidden">
        <MobileServices />
      </div>
    </section>
  );
}
