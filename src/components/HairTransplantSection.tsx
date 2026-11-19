"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { HEAD_AREAS } from "@/components/headAreas";
import portrait from "@/tru-goldfinch-hd.webp";

const pad = (value: number) => String(value).padStart(2, "0");
const COUNT = HEAD_AREAS.length;

// Desktop: the section stays on screen (CSS sticky) while the page scrolls through it. The
// pointer follows the scroll exactly (nothing is held): on each area's stretch it first rests
// on the area, then glides on to the next one.
const STEP_VH = 80;
const TRACK_VH = 100 + COUNT * STEP_VH;
/** Share of each stretch the pointer rests on its area before gliding to the next. */
const REST = 0.45;
const ease = (t: number) => t * t * (3 - 2 * t);

/** Where the pointer is, in areas (fractional while gliding), for progress 0…COUNT. */
function pointAt(progress: number) {
  const index = Math.min(COUNT - 1, Math.floor(progress));
  if (index >= COUNT - 1) return COUNT - 1;
  const glide = Math.max(0, (progress - index - REST) / (1 - REST));
  return index + ease(glide);
}

// The man stands in the middle with no frame: his photo is a cut-out, softly faded out at
// the foot and at the shoulders' edges so the text either side stays clear.
const PORTRAIT_MASK =
  "linear-gradient(to bottom, black 48%, transparent 90%), linear-gradient(to right, transparent 4%, black 26%, black 74%, transparent 96%)";
const MASK_STYLE = {
  maskImage: PORTRAIT_MASK,
  WebkitMaskImage: PORTRAIT_MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as CSSProperties;

function DesktopTour() {
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLSpanElement>(null);
  const cardLeft = useRef<HTMLDivElement>(null);
  const cardRight = useRef<HTMLDivElement>(null);
  const leader = useRef<SVGLineElement>(null);
  const leaderEnd = useRef<SVGCircleElement>(null);
  const [active, setActive] = useState(0);
  // The last area shown on each side, so a card keeps its words while it fades away.
  const [bySide, setBySide] = useState({ left: 0, right: 1 });

  useEffect(() => {
    let frame = 0;
    let shown = 0;
    const update = () => {
      frame = 0;
      const el = track.current;
      const pane = panel.current;
      const dot = pointer.current;
      const line = leader.current;
      const end = leaderEnd.current;
      if (!el || !pane || !dot || !line || !end) return;

      const range = el.offsetHeight - window.innerHeight;
      const passed = -el.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, passed / range)) * COUNT;
      const at = pointAt(Math.min(progress, COUNT - 0.0001));
      const from = Math.floor(at);
      const t = at - from;
      const a = HEAD_AREAS[from].anchor;
      const b = HEAD_AREAS[Math.min(from + 1, COUNT - 1)].anchor;
      dot.style.left = `${(a.x + (b.x - a.x) * t) * 100}%`;
      dot.style.top = `${(a.y + (b.y - a.y) * t) * 100}%`;

      // Notes switch halfway through a glide, while the line is faded out.
      const index = Math.round(at);
      const side = HEAD_AREAS[index].side;
      if (index !== shown) {
        shown = index;
        setActive(index);
        setBySide((prev) => ({ ...prev, [side]: index }));
      }

      // The line runs from the pointer to the near edge of the card on its side. It fades out
      // mid-glide and back in, so changing sides never jumps.
      const box = (side === "left" ? cardLeft : cardRight).current;
      if (!box) return;
      const p = pane.getBoundingClientRect();
      const d = dot.getBoundingClientRect();
      const c = box.getBoundingClientRect();
      const x2 = (side === "left" ? c.right : c.left) - p.left;
      const strength = String(1 - Math.sin(Math.PI * t));
      line.style.opacity = strength;
      end.style.opacity = strength;
      const y2 = c.top + c.height / 2 - p.top;
      line.setAttribute("x1", String(d.left + d.width / 2 - p.left));
      line.setAttribute("y1", String(d.top + d.height / 2 - p.top));
      line.setAttribute("x2", String(x2));
      line.setAttribute("y2", String(y2));
      end.setAttribute("cx", String(x2));
      end.setAttribute("cy", String(y2));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // The cards change height with each description; keep the line on their edge.
    const resize = new ResizeObserver(schedule);
    if (cardLeft.current) resize.observe(cardLeft.current);
    if (cardRight.current) resize.observe(cardRight.current);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
    };
  }, []);

  const area = HEAD_AREAS[active];

  return (
    <div
      ref={track}
      className="relative h-[var(--track)]"
      style={{ "--track": `${TRACK_VH}vh` } as CSSProperties}
    >
      <div ref={panel} className="sticky top-0 h-screen overflow-hidden">
        {/* The man, in the middle. */}
        <div className="absolute top-[19vh] left-1/2 aspect-[1500/1872] h-[96vh] -translate-x-1/2">
          <Image
            src={portrait}
            alt="A patient's head, with the areas a hair transplant plans for marked on it"
            fill
            quality={90}
            sizes="80vh"
            className="object-contain"
            style={MASK_STYLE}
          />
          {HEAD_AREAS.map(({ id, anchor }, index) => (
            <span
              key={id}
              aria-hidden="true"
              className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white transition-opacity duration-500 ${
                index === active ? "opacity-0" : "opacity-60"
              }`}
              style={{ left: `${anchor.x * 100}%`, top: `${anchor.y * 100}%` }}
            />
          ))}
          <span
            ref={pointer}
            aria-hidden="true"
            className="absolute"
            style={{
              left: `${HEAD_AREAS[0].anchor.x * 100}%`,
              top: `${HEAD_AREAS[0].anchor.y * 100}%`,
            }}
          >
            <span className="hero-marker" data-active="true" />
          </span>
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 size-full"
        >
          <line ref={leader} className="stroke-brand-deep/60" strokeWidth="1" />
          <circle ref={leaderEnd} r="3" className="fill-brand-deep" />
        </svg>

        <div className="absolute inset-x-0 top-[6vh] z-20 text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase">
            Our speciality
          </p>
          <h2
            id="hair-transplant-heading"
            className="mt-2 font-display text-4xl leading-tight text-foreground xl:text-6xl"
          >
            Hair <span className="text-brand">transplant</span>
          </h2>
        </div>

        {/* The note for the area being pointed at, on its side of the head. */}
        {(["left", "right"] as const).map((side) => {
          const showing = area.side === side;
          const shown = HEAD_AREAS[bySide[side]];
          return (
            <div
              key={side}
              ref={side === "left" ? cardLeft : cardRight}
              aria-hidden={!showing}
              className={`absolute top-[30vh] z-20 w-[24%] max-w-[360px] rounded-[1.5rem] bg-pill/90 p-6 shadow-[0_20px_50px_-24px_rgba(31,48,52,0.35)] ring-1 ring-foreground/10 backdrop-blur-sm transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:p-7 ${
                side === "left" ? "left-[6%]" : "right-[6%]"
              } ${
                showing
                  ? "translate-x-0 opacity-100"
                  : side === "left"
                    ? "-translate-x-6 opacity-0"
                    : "translate-x-6 opacity-0"
              }`}
            >
              <div
                key={shown.id}
                className="service-in"
                aria-live={showing ? "polite" : undefined}
              >
                <p className="text-xs font-medium tracking-[0.2em] text-brand-deep uppercase">
                  {pad(bySide[side] + 1)} · Area
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-foreground xl:text-4xl">
                  {shown.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted xl:text-base">
                  {shown.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Phones: the man with every area numbered, then the areas listed with their notes. */
function MobileList() {
  return (
    <Reveal className="px-5 pt-16 pb-20">
      <p
        data-reveal
        className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
      >
        Hair transplant
      </p>
      <h2
        id="hair-transplant-heading-mobile"
        data-reveal
        className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl"
      >
        Planned <span className="text-brand">area by area</span>
      </h2>
      <p data-reveal className="mt-4 text-base leading-relaxed text-ink-muted">
        Every head of hair is different. These are the five areas we plan for,
        so your result looks natural from every angle.
      </p>

      <div
        data-reveal
        className="relative mx-auto mt-8 aspect-[1500/1300] w-full max-w-[420px] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 aspect-[1500/1872]">
          <Image
            src={portrait}
            alt="A patient's head, with the areas a hair transplant plans for marked on it"
            fill
            quality={90}
            sizes="420px"
            className="object-contain"
            style={MASK_STYLE}
          />
          {HEAD_AREAS.map(({ id, anchor }, index) => (
            <span
              key={id}
              aria-hidden="true"
              className="absolute flex size-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-deep text-[10px] font-medium text-white ring-2 ring-white"
              style={{ left: `${anchor.x * 100}%`, top: `${anchor.y * 100}%` }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <ol className="mt-6 border-t border-foreground/15">
        {HEAD_AREAS.map(({ id, name, description }, index) => (
          <li
            key={id}
            data-reveal
            className="flex gap-4 border-b border-foreground/15 py-5"
          >
            <span className="w-6 pt-1.5 text-sm font-medium text-brand-deep">
              {pad(index + 1)}
            </span>
            <div>
              <h3 className="font-display text-2xl leading-tight text-foreground">
                {name}
              </h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-muted">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export default function HairTransplantSection() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="hair-transplant"
      aria-labelledby={
        isDesktop ? "hair-transplant-heading" : "hair-transplant-heading-mobile"
      }
      className="relative bg-[#eef3f3]"
    >
      {isDesktop ? <DesktopTour /> : <MobileList />}
    </section>
  );
}
