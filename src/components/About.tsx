import Reveal from "@/components/Reveal";

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

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate bg-[#eef3f3] px-5 pt-16 pb-24 lg:px-[6%] lg:pt-24 lg:pb-32"
    >
      <Reveal className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[6fr_5fr] lg:items-end lg:gap-16 xl:gap-24">
        <div>
          <p
            data-reveal
            className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
          >
            About us
          </p>
          <h2
            id="about-heading"
            data-reveal
            className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl"
          >
            The Science behind{" "}
            <span className="text-brand">Trú Aesthetics</span>
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted lg:text-lg"
          >
            Trú Aesthetics, in association with Dr Mohan Thomas Aesthetics
            Mumbai, is an exclusive Cosmetic Surgery and Hair Transplant clinic
            to meet a spectrum of cosmetic rejuvenation. We pride ourselves in
            using state of the art infrastructure and USFDA approved technology
            located in the heart of Mangalore city.
          </p>
        </div>

        <div>
          <p
            data-reveal
            className="text-sm font-medium tracking-[0.2em] text-ink-muted uppercase"
          >
            Our commitment to your confidence
          </p>
          <ul className="mt-5 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
            {POINTS.map(({ title, text }, index) => (
              <li
                key={title}
                data-reveal
                className="flex gap-5 border-t border-foreground/15 pt-5 lg:py-6"
              >
                <span className="font-display text-2xl text-brand">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
