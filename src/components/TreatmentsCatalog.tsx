"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import {
  HAIR_STUDIO,
  TREATMENT_GROUPS,
  type Treatment,
} from "@/components/clinic";

type GroupId = (typeof TREATMENT_GROUPS)[number]["id"];

const pad = (value: number) => String(value).padStart(2, "0");

// The clinic's copy opens with a one-line pitch; the rest is shown when a card is opened.
const splitCopy = (text: string) => {
  const match = text.match(/^([\s\S]+?[.!?])\s+([\s\S]*)$/);
  return match
    ? { teaser: match[1], rest: match[2] }
    : { teaser: text, rest: "" };
};

// Opening cards, switching tabs and searching change the page height, so re-measure the
// scroll triggers once the height transition has settled.
const relayout = () => window.setTimeout(() => ScrollTrigger.refresh(), 550);

function Arrow({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-3 transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function TreatmentCard({
  treatment,
  number,
  open,
  onToggle,
  delay,
}: {
  treatment: Treatment;
  number: number;
  open: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const { teaser, rest } = splitCopy(treatment.description);
  const id = `treatment-${treatment.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <li className="service-in" style={{ animationDelay: `${delay}ms` }}>
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 lg:p-7 ${
          open
            ? "bg-white shadow-[0_18px_44px_rgba(45,70,75,0.18)]"
            : "bg-pill/80 shadow-[0_8px_24px_rgba(45,70,75,0.1)] hover:bg-white hover:shadow-[0_18px_44px_rgba(45,70,75,0.16)]"
        }`}
      >
        {/* Teal accent that grows along the top edge on hover. */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-brand to-brand-deep transition-transform duration-500 ${
            open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-3xl leading-none text-brand/70">
            {pad(number)}
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl leading-tight text-foreground lg:text-[1.7rem]">
          {treatment.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
          {teaser}
        </p>

        {rest && (
          <>
            <div
              id={id}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-2 text-sm leading-relaxed text-ink-muted">
                  {rest}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={onToggle}
              className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-brand-deep"
            >
              {open ? "Show less" : "Read more"}
              <span className="flex size-6 items-center justify-center rounded-full bg-brand/15 transition-colors group-hover:bg-brand group-hover:text-ink">
                <Arrow open={open} />
              </span>
            </button>
          </>
        )}
      </article>
    </li>
  );
}

export default function TreatmentsCatalog() {
  const [groupId, setGroupId] = useState<GroupId>(TREATMENT_GROUPS[0].id);
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const group = TREATMENT_GROUPS.find(({ id }) => id === groupId)!;
  const search = query.trim().toLowerCase();
  const matches = (treatment: Treatment) =>
    !search ||
    treatment.name.toLowerCase().includes(search) ||
    treatment.description.toLowerCase().includes(search);
  const shown = group.items
    .map((treatment, i) => ({ treatment, number: i + 1 }))
    .filter(({ treatment }) => matches(treatment));
  const other = TREATMENT_GROUPS.find(({ id }) => id !== groupId)!;
  const otherMatches = search ? other.items.filter(matches).length : 0;

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
      className="relative isolate overflow-hidden bg-[#eef3f3] px-5 pb-24 lg:px-[6%] lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-60 -z-10 size-[620px] rounded-full bg-brand/10 blur-3xl"
      />

      <Reveal className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-6 border-t border-foreground/15 pt-16 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:pt-24">
          <div>
            <p
              data-reveal
              className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
            >
              All treatments
            </p>
            <h2
              id="treatments-heading"
              data-reveal
              className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl"
            >
              Discover the Art of <span className="text-brand">Beauty</span>{" "}
              Enhancement
            </h2>
          </div>
          <p data-reveal className="text-base leading-relaxed text-ink-muted">
            At Trú Aesthetics, we specialize in providing top-quality cosmetic
            procedures to help you look and feel your best. Our team of
            experienced and qualified surgeons will work with you to create a
            personalized treatment plan tailored to your individual needs and
            goals.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-[4fr_8fr] lg:gap-12">
          {/* Category picker, search and Hair Studio: sticky beside the cards on desktop. */}
          <aside data-reveal className="lg:sticky lg:top-28">
            <div
              role="tablist"
              aria-label="Treatment type"
              className="grid grid-cols-2 gap-3 lg:grid-cols-1"
            >
              {TREATMENT_GROUPS.map(({ id, label, intro, items }) => {
                const selected = id === groupId;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="treatments-panel"
                    onClick={() => {
                      setGroupId(id);
                      setOpen(null);
                      relayout();
                    }}
                    className={`relative overflow-hidden rounded-3xl p-5 text-left transition-[background-color,box-shadow,color] duration-500 lg:p-6 ${
                      selected
                        ? "bg-foreground text-white shadow-[0_18px_40px_rgba(31,48,52,0.3)]"
                        : "bg-pill/80 text-foreground shadow-[0_8px_24px_rgba(45,70,75,0.1)] hover:bg-white"
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg leading-none whitespace-nowrap sm:text-3xl">
                        {label}
                      </span>
                      <span
                        className={`font-display text-2xl leading-none sm:text-5xl ${
                          selected ? "text-brand" : "text-brand/60"
                        }`}
                      >
                        {items.length}
                      </span>
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                        selected
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      } hidden lg:grid`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-4 text-sm leading-relaxed text-white/75">
                          {intro}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="mt-4 flex items-center gap-3 rounded-full bg-pill/80 px-5 py-3 shadow-[0_8px_24px_rgba(45,70,75,0.08)] ring-brand/40 focus-within:bg-white focus-within:ring-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="size-4 shrink-0 text-ink-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="9" cy="9" r="6" />
                <path d="m14 14 3.5 3.5" />
              </svg>
              <span className="sr-only">Search treatments</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(null);
                  relayout();
                }}
                placeholder={`Search ${group.label.toLowerCase()} treatments`}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-ink-muted/70 focus:outline-none"
              />
            </label>

            <div className="mt-4 hidden overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-6 text-white shadow-[0_18px_40px_rgba(18,122,115,0.3)] lg:block">
              <p className="text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
                Also at our clinic
              </p>
              <h3 className="mt-2 font-display text-3xl">{HAIR_STUDIO.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {HAIR_STUDIO.description}
              </p>
              <Link
                href="#contact"
                className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-brand-deep transition-colors hover:bg-ink hover:text-white"
              >
                Book a visit
              </Link>
            </div>
          </aside>

          <div
            id="treatments-panel"
            role="tabpanel"
            aria-label={`${group.label} treatments`}
          >
            <p className="mb-4 text-sm leading-relaxed text-ink-muted lg:hidden">
              {group.intro}
            </p>
            {shown.length > 0 ? (
              <ul
                key={`${groupId}-${search}`}
                className="grid gap-4 sm:grid-cols-2 lg:gap-5"
              >
                {shown.map(({ treatment, number }, i) => (
                  <TreatmentCard
                    key={treatment.name}
                    treatment={treatment}
                    number={number}
                    open={open === treatment.name}
                    delay={Math.min(i, 8) * 50}
                    onToggle={() => {
                      setOpen(open === treatment.name ? null : treatment.name);
                      relayout();
                    }}
                  />
                ))}
              </ul>
            ) : (
              <div className="rounded-3xl bg-pill/80 p-8 text-center text-ink-muted">
                No {group.label.toLowerCase()} treatments match “{query.trim()}
                ”.
              </div>
            )}
            {otherMatches > 0 && (
              <button
                type="button"
                onClick={() => {
                  setGroupId(other.id);
                  setOpen(null);
                  relayout();
                }}
                className="mt-5 text-sm font-medium text-brand-deep underline-offset-4 hover:underline"
              >
                {otherMatches} {other.label.toLowerCase()} treatment
                {otherMatches > 1 ? "s" : ""} also match “{query.trim()}” →
              </button>
            )}
          </div>

          {/* Hair Studio sits under the cards on phones and tablets. */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-6 text-white shadow-[0_18px_40px_rgba(18,122,115,0.3)] lg:hidden">
            <p className="text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
              Also at our clinic
            </p>
            <h3 className="mt-2 font-display text-3xl">{HAIR_STUDIO.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              {HAIR_STUDIO.description}
            </p>
            <Link
              href="#contact"
              className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-brand-deep"
            >
              Book a visit
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
