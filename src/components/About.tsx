import Link from "next/link";

const POINTS = [
  {
    title: "Doctor-led planning",
    text: "Every hairline is designed in consultation, around your face and how your hair grows.",
  },
  {
    title: "Natural density",
    text: "Grafts are placed at the angle and direction of your own hair, so the result reads as yours.",
  },
  {
    title: "Care through recovery",
    text: "We stay with you from the first consultation to the final result.",
  },
];

export function AboutContent() {
  return (
    <>
      <p
        data-about-item
        className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
      >
        About us
      </p>
      <h2
        data-about-item
        className="mt-2 font-display text-3xl leading-tight sm:text-4xl lg:mt-3 text-foreground lg:text-5xl xl:text-6xl"
      >
        Natural results, planned around you
      </h2>
      <p
        data-about-item
        className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base lg:mt-6 lg:text-lg"
      >
        Tru Aesthetics is a hair restoration clinic focused on results that
        look like they were always there. We take the time to understand your
        hair loss before recommending a plan.
      </p>
      <ul className="mt-8 hidden gap-6 lg:grid xl:grid-cols-3 xl:gap-5">
        {POINTS.map(({ title, text }) => (
          <li
            key={title}
            data-about-item
            className="border-t border-foreground/20 pt-4"
          >
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              {text}
            </p>
          </li>
        ))}
      </ul>
      <div data-about-item className="mt-5 lg:mt-10">
        <Link
          href="#contact"
          className="inline-block rounded-full bg-brand px-10 py-3.5 text-base font-medium tracking-wide whitespace-nowrap text-ink shadow-[0_8px_20px_rgba(18,122,115,0.28)] transition-colors hover:bg-brand-deep hover:text-white"
        >
          Book a consultation
        </Link>
      </div>
    </>
  );
}

/** Shown in place of the scroll tour when it is off (reduced motion, no WebGL). */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="tour-fallback mx-auto max-w-3xl px-5 py-16 lg:py-24"
    >
      <AboutContent />
    </section>
  );
}
