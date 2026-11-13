"use client";

import { useId, useState } from "react";
import Reveal from "@/components/Reveal";
import { CLINIC, telHref } from "@/components/clinic";
import { FAQS } from "@/components/faqs";

// Lets search engines show the answers directly (FAQPage structured data).
const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
}).replace(/</g, "\\u003c");

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <li data-reveal className="border-b border-foreground/15">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className={`text-lg leading-snug font-medium transition-colors duration-300 lg:text-xl ${
              open
                ? "text-brand-deep"
                : "text-foreground group-hover:text-brand-deep"
            }`}
          >
            {question}
          </span>
          {/* A plus that turns into a minus. */}
          <span
            aria-hidden="true"
            className={`relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              open
                ? "border-brand bg-brand text-ink"
                : "border-foreground/25 text-foreground group-hover:border-brand-deep"
            }`}
          >
            <span className="absolute h-px w-3.5 bg-current" />
            <span
              className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${
                open ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pr-14 pb-6 text-base leading-relaxed text-ink-muted">
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FaqSection() {
  // One answer open at a time; the first starts open so the section reads as an accordion.
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate bg-[#eef3f3] px-5 pb-24 lg:px-[6%] lg:pb-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
      />
      <Reveal className="mx-auto grid max-w-[1400px] gap-12 border-t border-foreground/15 pt-16 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:pt-24 xl:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p
            data-reveal
            className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
          >
            FAQ
          </p>
          <h2
            id="faq-heading"
            data-reveal
            className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl"
          >
            Questions, <span className="text-brand">answered</span>
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-md text-base leading-relaxed text-ink-muted"
          >
            What patients most often ask us before their first visit. Every plan
            starts with a consultation, so ask us anything.
          </p>

          <div
            data-reveal
            className="mt-10 max-w-md rounded-[1.75rem] bg-white/70 p-7 shadow-[0_20px_50px_-30px_rgba(31,48,52,0.35)] ring-1 ring-foreground/10"
          >
            <p className="font-display text-2xl text-foreground">
              Still have a question?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Talk to our team, {CLINIC.hours[0].days},{" "}
              {CLINIC.hours[0].time}.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={telHref(CLINIC.phones[0])}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium whitespace-nowrap text-ink transition-colors hover:bg-brand-deep hover:text-white"
              >
                Call {CLINIC.phones[0]}
              </a>
              <a
                href={`mailto:${CLINIC.email}`}
                className="rounded-full border border-foreground/30 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:bg-foreground hover:text-white"
              >
                Email us
              </a>
            </div>
          </div>
        </div>

        <ul className="border-t border-foreground/15">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              {...faq}
              open={open === index}
              onToggle={() => setOpen(open === index ? -1 : index)}
            />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
