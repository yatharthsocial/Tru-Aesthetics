// "Our Commitment to Your Confidence", as supplied by the clinic.
const POINTS = [
  {
    title: "Safety",
    text: "With our commitment to keep safety, we have made significant investments to acquire the latest and the best equipment.",
  },
  {
    title: "Technology",
    text: "We have selected an array of technological advances unmatched and unsurpassed by any facility in the world.",
  },
  {
    title: "Privacy",
    text: "Your privacy is guaranteed. As this issue is very dear to our heart, we have fire-walled patient activities and records.",
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
        className="mt-2 font-display text-3xl leading-tight sm:text-4xl lg:mt-3 text-foreground lg:text-5xl"
      >
        The Science behind Trú Aesthetics
      </h2>
      <p
        data-about-item
        className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base lg:mt-5 lg:text-base xl:text-lg"
      >
        Trú Aesthetics, in association with Dr Mohan Thomas Aesthetics Mumbai,
        is an exclusive Cosmetic Surgery and Hair Transplant clinic to meet a
        spectrum of cosmetic rejuvenation. We pride ourselves in using state of
        the art infrastructure and USFDA approved technology located in the
        heart of Mangalore city.
      </p>
      <ul className="mt-7 hidden gap-5 lg:grid lg:grid-cols-3">
        {POINTS.map(({ title, text }) => (
          <li
            key={title}
            data-about-item
            className="border-t border-foreground/20 pt-4"
          >
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              {text}
            </p>
          </li>
        ))}
      </ul>
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
