"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/components/testimonials";
import { getSmoothScroll } from "@/lib/smoothScroll";

type Story = (typeof TESTIMONIALS)[number];

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function StoryCard({
  story,
  onOpen,
  hidden = false,
}: {
  story: Story;
  onOpen: (story: Story) => void;
  hidden?: boolean;
}) {
  const label = story.name
    ? `Watch ${story.name}'s story`
    : "Watch patient story";
  return (
    <li aria-hidden={hidden || undefined} className="shrink-0">
      <button
        type="button"
        tabIndex={hidden ? -1 : undefined}
        aria-label={label}
        onClick={() => onOpen(story)}
        className="group relative block aspect-[9/16] w-[220px] overflow-hidden rounded-[1.75rem] bg-[#1f3034] text-left shadow-[0_18px_40px_-12px_rgba(31,48,52,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 sm:w-[250px]"
      >
        {/* A silent loop; the section plays it only while the card is on screen. */}
        <video
          data-preview
          src={story.preview}
          poster={story.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#1f3034]/85 via-[#1f3034]/10 to-transparent" />
        <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-deep shadow-lg ring-8 ring-white/20 transition-transform duration-500 group-hover:scale-110">
          <PlayIcon className="ml-0.5 size-5" />
        </span>
        <span className="absolute inset-x-5 bottom-5 text-white">
          <span className="block text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
            Patient story
          </span>
          {story.name && (
            <span className="mt-1 block font-display text-2xl leading-tight">
              {story.name}
            </span>
          )}
          {story.caption && (
            <span className="mt-0.5 block text-xs text-white/75">
              {story.caption}
            </span>
          )}
        </span>
      </button>
    </li>
  );
}

export default function TestimonialsSection() {
  const [open, setOpen] = useState<Story | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const marquee = useRef<HTMLDivElement>(null);

  // Previews play while the section is on screen and pause when it isn't; reduced motion keeps
  // them on their poster.
  useEffect(() => {
    const root = marquee.current;
    if (
      !root ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    )
      return;
    const clips = [
      ...root.querySelectorAll<HTMLVideoElement>("video[data-preview]"),
    ];
    const observer = new IntersectionObserver(
      ([entry]) => {
        for (const clip of clips) {
          if (entry.isIntersecting) clip.play().catch(() => undefined);
          else clip.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open) {
      el.showModal();
      getSmoothScroll()?.stop();
      video.current?.play().catch(() => undefined);
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  const close = () => {
    video.current?.pause();
    setOpen(null);
    getSmoothScroll()?.start();
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden bg-[#eef3f3] pb-24 lg:pb-32"
    >
      <Reveal className="mx-auto max-w-[1400px] px-5 lg:px-[6%]">
        <div className="grid items-end gap-6 border-t border-foreground/15 pt-16 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:pt-24">
          <div>
            <p
              data-reveal
              className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
            >
              Client testimonials
            </p>
            <h2
              id="testimonials-heading"
              data-reveal
              className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl"
            >
              Stories from our <span className="text-brand">patients</span>
            </h2>
          </div>
          <p data-reveal className="text-base leading-relaxed text-ink-muted">
            Hear from the people who trusted Trú Aesthetics with their care. Tap
            a story to watch it.
          </p>
        </div>
      </Reveal>

      {/* Three copies of the row slide left by exactly one copy per loop, so there is no seam
          even on very wide screens. */}
      <div
        ref={marquee}
        className="testimonial-marquee mt-12 lg:mt-16 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <ul className="testimonial-track flex w-max gap-[var(--gap)] py-4 [--gap:1.25rem] lg:[--gap:1.5rem]">
          {[0, 1, 2].map((copy) =>
            TESTIMONIALS.map((story) => (
              <StoryCard
                key={`${story.id}-${copy}`}
                story={story}
                onOpen={setOpen}
                hidden={copy > 0}
              />
            )),
          )}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClose={close}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        aria-label={open?.name ? `${open.name}'s story` : "Patient story"}
        className="testimonial-dialog m-auto outline-none max-h-[92svh] w-[min(420px,92vw)] overflow-visible rounded-[1.75rem] bg-transparent p-0 backdrop:bg-[#1f3034]/80 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="relative">
            <video
              ref={video}
              key={open.id}
              src={open.video}
              poster={open.poster}
              controls
              playsInline
              autoPlay
              className="aspect-[9/16] max-h-[92svh] w-full rounded-[1.75rem] bg-black object-contain shadow-2xl outline-none"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-colors hover:bg-brand"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
