"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DOCTOR, doctorHref, initials, TEAM } from "@/components/doctor";
import Reveal from "@/components/Reveal";
import { DOCTOR_PHOTOS } from "@/components/doctorPhotos";
import silk from "@/hero-silk.webp";
import logo from "@/logo-true-aesthetics.webp";

gsap.registerPlugin(ScrollTrigger);

// The pinned showcase needs room beside the portrait and a viewer who is fine with motion.
const PIN_OK =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const CARD =
  "rounded-3xl bg-pill/90 shadow-[0_10px_30px_rgba(45,70,75,0.12)] backdrop-blur-sm";

type Slide = {
  slug: string;
  name: string;
  role: string;
  degrees: string;
  intro?: string;
  points?: string[];
  credentials?: { value: string; label: string }[];
  badge: { value: string; label: string };
};

const SLIDES: Slide[] = [
  {
    slug: DOCTOR.slug,
    name: DOCTOR.name,
    role: DOCTOR.title,
    degrees: DOCTOR.qualifications,
    intro: DOCTOR.intro,
    credentials: DOCTOR.credentials,
    badge: DOCTOR.badge,
  },
  {
    ...TEAM[0],
    badge: { value: "FACS", label: "Fellow, American College of Surgeons" },
  },
  {
    ...TEAM[1],
    badge: { value: "MS · ENT", label: "Otorhinolaryngologist" },
  },
];

function ReadMore({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      aria-label={`Read more about ${name}`}
      className="group mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/30 py-2.5 pr-3 pl-5 text-sm font-medium text-foreground transition-colors hover:border-brand-deep hover:bg-brand-deep hover:text-white"
    >
      Read more
      <span className="flex size-6 items-center justify-center rounded-full bg-brand/20 text-brand-deep transition-[transform,background-color,color] group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-brand-deep">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}

function Portrait({ slide }: { slide: Slide }) {
  const photo = DOCTOR_PHOTOS[slide.slug];
  return photo ? (
    <>
      <Image
        src={photo.src}
        alt={`${slide.name}`}
        fill
        sizes="(min-width: 1024px) 460px, 90vw"
        quality={90}
        className={`${photo.className} saturate-[0.92]`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1f3034]/45 to-transparent"
      />
    </>
  ) : (
    // No photo supplied yet: a branded card with the doctor's initials.
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#e9f0f0] via-[#d4e0e0] to-[#bccccc]">
      <Image
        src={logo}
        alt=""
        className="absolute top-8 left-8 h-9 w-auto opacity-60"
      />
      <span
        aria-hidden="true"
        className="font-display text-[7.5rem] leading-none text-brand-deep/70"
      >
        {initials(slide.name)}
      </span>
      <span className="mt-4 text-xs font-medium tracking-[0.3em] text-foreground/50 uppercase">
        Trú Aesthetics
      </span>
    </div>
  );
}

function Badge({ slide }: { slide: Slide }) {
  return (
    <div className={`max-w-[230px] px-6 py-4 ${CARD}`}>
      <p className="font-display text-3xl leading-none text-brand-deep lg:text-4xl">
        {slide.badge.value}
      </p>
      <p className="mt-1.5 text-sm leading-snug text-ink-muted">
        {slide.badge.label}
      </p>
    </div>
  );
}

function Details({
  slide,
  headingLevel,
}: {
  slide: Slide;
  headingLevel: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <>
      <Heading className="font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl">
        {slide.name}
      </Heading>
      <p className="mt-3 text-sm font-medium tracking-[0.15em] text-ink-muted uppercase">
        {slide.role}
      </p>
      <p className="mt-2 text-sm text-brand-deep">{slide.degrees}</p>

      {slide.intro && (
        <p className="mt-6 border-l-2 border-brand pl-5 text-base leading-relaxed text-ink-muted xl:text-lg">
          {slide.intro}
        </p>
      )}
      {slide.points && (
        <ul className="mt-6 space-y-3 border-l-2 border-brand pl-5">
          {slide.points.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-base text-ink-muted xl:text-lg"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
              />
              {point}
            </li>
          ))}
        </ul>
      )}
      {slide.credentials && (
        <dl className="mt-7 flex divide-x divide-foreground/15 border-y border-foreground/15 py-5">
          {slide.credentials.map(({ value, label }) => (
            <div key={label} className="flex-1 px-5 first:pl-0">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-2xl leading-none text-brand-deep lg:text-3xl">
                {value}
              </dd>
              <dd className="mt-1.5 text-sm text-ink-muted">{label}</dd>
            </div>
          ))}
        </dl>
      )}
      <ReadMore href={doctorHref(slide.slug)} name={slide.name} />
    </>
  );
}

function Background() {
  return (
    <>
      <Image
        src={silk}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 scale-x-[-1] object-cover opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eef3f3] via-[#eef3f3]/40 to-[#eef3f3]"
      />
    </>
  );
}

/** Desktop: the section pins and scrolling crossfades from one doctor to the next. */
function PinnedShowcase() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const last = SLIDES.length - 1;

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    const context = gsap.context(() => {
      const portraits = gsap.utils.toArray<HTMLElement>("[data-doc-portrait]");
      const badges = gsap.utils.toArray<HTMLElement>("[data-doc-badge]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-doc-text]");
      const bar = root.querySelector<HTMLElement>("[data-doc-bar]");
      const hidden = "inset(100% 0% 0% 0% round 2rem)";
      const shown = "inset(0% 0% 0% 0% round 2rem)";

      gsap.set(portraits, { clipPath: hidden });
      gsap.set(portraits[0], { clipPath: shown });
      gsap.set([...badges.slice(1), ...texts.slice(1)], {
        autoAlpha: 0,
        y: 48,
      });

      const tour = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          pin: true,
          start: "top top",
          end: () => `+=${last * window.innerHeight * 1.3}`,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
            setActive(Math.min(last, Math.round(self.progress * last)));
          },
        },
      });

      // Each change: the old text lifts away, the new portrait wipes up over the old one,
      // then the new text and badge settle in. Each doctor holds still for a stretch of scroll.
      for (let i = 1; i <= last; i++) {
        const at = (i - 1) * 2 + 0.6;
        tour.to(
          [texts[i - 1], badges[i - 1]],
          { autoAlpha: 0, y: -48, duration: 0.45, ease: "power2.in" },
          at,
        );
        tour.to(
          portraits[i - 1],
          { scale: 0.94, duration: 0.8, ease: "power2.inOut" },
          at,
        );
        tour.to(
          portraits[i],
          { clipPath: shown, duration: 0.8, ease: "power3.inOut" },
          at,
        );
        tour.to(
          [texts[i], badges[i]],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          at + 0.45,
        );
      }
      tour.to({}, { duration: 0.6 });

      // The hero tour pins earlier in the page; re-measure in page order.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, [last]);

  return (
    <section
      ref={section}
      id="doctor"
      aria-labelledby="doctor-heading"
      className="relative isolate flex h-svh items-center overflow-hidden bg-[#e3eaea]"
    >
      <Background />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 items-center gap-14 px-[6%] xl:gap-20">
        <div className="relative mx-auto w-[min(440px,calc((100svh-12rem)*0.8))] pr-5 pb-5">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-5 left-5 rounded-[2rem] border border-brand-deep/50"
          />
          <div className="relative grid aspect-[4/5]">
            {SLIDES.map((slide) => (
              <div
                key={slide.slug}
                data-doc-portrait
                className="relative overflow-hidden rounded-[2rem] bg-[#dbe5e5] shadow-[0_30px_60px_-20px_rgba(31,48,52,0.45)] [grid-area:1/1]"
              >
                <Portrait slide={slide} />
              </div>
            ))}
          </div>
          <div className="absolute -right-10 bottom-12 grid">
            {SLIDES.map((slide) => (
              <div
                key={slide.slug}
                data-doc-badge
                className="[grid-area:1/1] self-end"
              >
                <Badge slide={slide} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-5">
            <h2
              id="doctor-heading"
              className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
            >
              Meet our doctors
            </h2>
            <span className="h-px flex-1 overflow-hidden bg-foreground/15">
              <span
                data-doc-bar
                className="block h-full origin-left scale-x-0 bg-brand-deep"
              />
            </span>
          </div>

          <div className="mt-6 grid">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.slug}
                data-doc-text
                aria-hidden={i !== active}
                className="[grid-area:1/1]"
              >
                <Details slide={slide} headingLevel="h3" />
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-ink-muted/80">
            In association with Dr Mohan Thomas Aesthetics, Mumbai
          </p>
        </div>
      </div>
    </section>
  );
}

/** Phones, tablets and reduced motion: the doctors one after another. */
function StackedDoctors() {
  return (
    <section
      id="doctor"
      aria-labelledby="doctor-heading"
      className="relative isolate overflow-hidden bg-[#e3eaea]"
    >
      <Background />
      <Reveal className="mx-auto max-w-[1400px] px-5 py-20 lg:px-[6%] lg:py-28">
        <h2
          id="doctor-heading"
          data-reveal
          className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
        >
          Meet our doctors
        </h2>
        <div className="mt-10 space-y-20">
          {SLIDES.map((slide) => (
            <article
              key={slide.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div
                data-reveal
                className="relative mx-auto w-full max-w-[400px] pr-5 pb-5"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 top-5 left-5 rounded-[2rem] border border-brand-deep/50"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#dbe5e5] shadow-[0_30px_60px_-20px_rgba(31,48,52,0.45)]">
                  <Portrait slide={slide} />
                </div>
                <div className="absolute -right-2 bottom-10">
                  <Badge slide={slide} />
                </div>
              </div>
              <div data-reveal>
                <Details slide={slide} headingLevel="h3" />
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default function DoctorSection() {
  // Rendered stacked on the server; switches to the pinned showcase where it fits.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(PIN_OK);
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return pinned ? <PinnedShowcase /> : <StackedDoctors />;
}
