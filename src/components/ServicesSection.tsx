"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import ServiceFocus, { ALL_FIXES } from "@/components/ServiceFocus";
import { SERVICES } from "@/components/services";
import { getSmoothScroll } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const pad = (value: number) => String(value).padStart(2, "0");

// Scroll-driven tour: pins the list and image, then one step per treatment plus a finale.
const PIN_OK =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const STEPS = SERVICES.length + 1;
const SCROLL_PER_STEP = 0.8; // of the viewport height
// On reaching a step the scroll settles on it and holds while the change plays and the marker
// appears, so a fast scroll can't skip past a treatment.
const SETTLE_S = 0.6;
// Covers the marker (0.3s) and the tooltip finishing its entrance (about 1.75s) after the step starts.
const HOLD_MS = 1500;

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

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  // Whether a visitor is on a row right now. Nothing is highlighted or marked until they are,
  // and before-and-after effects (like the hairline) only play while they are.
  const [engaged, setEngaged] = useState(false);
  const choose = (index: number) => {
    setActive(index);
    setEngaged(true);
  };
  // The finale step, where she is shown with every treatment applied.
  const [complete, setComplete] = useState(false);
  // One focus view at a time: beside the list on desktop, inside the open row on phones.
  const isDesktop = useIsDesktop();
  const [pinned, setPinned] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const current = SERVICES[active];

  useEffect(() => {
    const query = window.matchMedia(PIN_OK);
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!pinned || !el) return;
    let lastStep = -1;
    let release: number | undefined;
    // Scrolling done while a step holds is remembered, then carried on once it releases,
    // so one continuous scroll glides from step to step without a second push.
    let holding = false;
    let moving = false;
    let pending = 0;
    let tour: ScrollTrigger | undefined;
    const centreOf = (self: ScrollTrigger, step: number) =>
      self.start + ((step + 0.5) / STEPS) * (self.end - self.start);
    // While pinned, any scroll moves exactly one step: queued during a hold, at once otherwise.
    const intend = (direction: number) => {
      if (!direction || !tour?.isActive || moving) return;
      pending = Math.sign(direction);
      if (!holding) carryOn(tour);
    };
    const onWheel = (event: WheelEvent) => intend(event.deltaY);
    let touchY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) =>
      intend(touchY - (event.touches[0]?.clientY ?? touchY));
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) intend(1);
      if (["ArrowUp", "PageUp"].includes(event.key)) intend(-1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);

    const carryOn = (self: ScrollTrigger) => {
      const lenis = getSmoothScroll();
      if (!lenis || !pending) return;
      const next = lastStep + pending;
      pending = 0;
      moving = true;
      const target =
        next >= STEPS
          ? self.end + window.innerHeight * 0.35
          : next < 0
            ? self.start - window.innerHeight * 0.35
            : centreOf(self, next);
      lenis.scrollTo(target, {
        duration: 0.9,
        lock: true,
        force: true,
      });
    };
    const hold = (self: ScrollTrigger, step: number) => {
      const lenis = getSmoothScroll();
      if (!lenis) return;
      window.clearTimeout(release);
      holding = true;
      pending = 0;
      lenis.scrollTo(centreOf(self, step), {
        duration: SETTLE_S,
        lock: true,
        force: true,
        onComplete: () => {
          moving = false;
          lenis.stop();
          release = window.setTimeout(() => {
            holding = false;
            lenis.start();
            carryOn(self);
          }, HOLD_MS);
        },
      });
    };
    const trigger = (tour = ScrollTrigger.create({
      trigger: el,
      pin: true,
      start: "center center",
      end: () => `+=${STEPS * SCROLL_PER_STEP * window.innerHeight}`,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const step = Math.min(STEPS - 1, Math.floor(self.progress * STEPS));
        setComplete(step === STEPS - 1);
        setActive(Math.min(step, SERVICES.length - 1));
        // Only hold while the visitor is scrolling inside the pin; a jump past it (a nav link,
        // say) must not be pulled back.
        if (step !== lastStep && self.isActive) {
          lastStep = step;
          hold(self, step);
        }
      },
      onToggle: (self) => {
        setEngaged(self.isActive);
        if (!self.isActive) {
          lastStep = -1;
          holding = false;
          moving = false;
          pending = 0;
        }
        if (!self.isActive && self.direction > 0) setComplete(true);
        if (!self.isActive && self.direction < 0) setComplete(false);
      },
    }));
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(release);
      getSmoothScroll()?.start();
      trigger.kill();
      setEngaged(false);
      setComplete(false);
    };
  }, [pinned]);

  // Clicking a row while pinned scrolls to that treatment's step.
  const jumpTo = (index: number) => {
    const trigger = ScrollTrigger.getAll().find(
      (t) => t.trigger === stage.current,
    );
    if (!trigger) return choose(index);
    const y =
      trigger.start + ((index + 0.5) / STEPS) * (trigger.end - trigger.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-[#eef3f3] px-5 pt-8 pb-24 lg:px-[6%] lg:pt-12 lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[560px] rounded-full bg-brand/10 blur-3xl"
      />

      <Reveal className="mx-auto max-w-[1400px]">
        <div className="border-t border-foreground/15 pt-16 lg:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
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
                className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-7xl"
              >
                Treatments, <span className="text-brand">tailored</span> to you
              </h2>
            </div>
            <p
              data-reveal
              className="max-w-sm text-base leading-relaxed text-ink-muted"
            >
              Hover or tap a treatment to see the area it focuses on. Every plan
              starts with a consultation.
            </p>
          </div>
        </div>

        <div
          ref={stage}
          className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-12 xl:gap-16"
        >
          <ol
            className="border-t border-foreground/15"
            onMouseLeave={() => !pinned && setEngaged(false)}
          >
            {SERVICES.map(
              ({ name, category, description, featured }, index) => {
                const isActive = engaged && !complete && index === active;
                return (
                  <li
                    key={name}
                    data-reveal
                    className="border-b border-foreground/15"
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => (pinned ? jumpTo(index) : choose(index))}
                      onMouseEnter={() => !pinned && choose(index)}
                      onFocus={() => !pinned && choose(index)}
                      onBlur={() => !pinned && setEngaged(false)}
                      className="group relative flex w-full items-baseline gap-4 py-5 text-left lg:gap-6 lg:py-4 xl:py-5"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-[-1px] left-0 h-px bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                      <span
                        className={`w-7 shrink-0 text-sm font-medium transition-colors ${
                          isActive ? "text-brand-deep" : "text-ink-muted/70"
                        }`}
                      >
                        {pad(index + 1)}
                      </span>
                      <span
                        className={`flex-1 font-display text-3xl leading-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-4xl xl:text-5xl ${
                          isActive
                            ? "translate-x-2 text-brand-deep"
                            : "text-foreground/70 group-hover:text-foreground"
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

                    {/* Phones only: on desktop the description sits under the arch, so rows never resize under the cursor. */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 lg:hidden ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-11 lg:pl-[52px]">
                          <p className="max-w-md text-base leading-relaxed text-ink-muted">
                            {description}
                          </p>
                          <span className="mt-3 inline-block rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium text-ink-muted sm:hidden">
                            {featured ? "Our speciality" : category}
                          </span>
                          {isActive && isDesktop === false && (
                            <ServiceFocus
                              index={index}
                              engaged={engaged}
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

          <div data-reveal className="hidden lg:block">
            <div className={pinned ? "" : "sticky top-28"}>
              <div className="mx-auto max-w-[540px]">
                <div className="relative">
                  {isDesktop && (
                    <ServiceFocus
                      index={active}
                      engaged={engaged}
                      complete={complete}
                      applied={
                        !pinned
                          ? undefined
                          : complete
                            ? ALL_FIXES
                            : engaged
                              ? ALL_FIXES.slice(0, active + 1)
                              : []
                      }
                    />
                  )}
                </div>
                <p
                  key={complete ? "complete" : engaged ? current.name : "rest"}
                  className="service-in mt-2 min-h-[3.5rem] text-center text-base leading-relaxed text-ink-muted"
                >
                  {complete
                    ? "Every treatment, planned around you, for your natural best."
                    : engaged
                      ? current.description
                      : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
