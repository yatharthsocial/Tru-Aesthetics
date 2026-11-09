import Image from "next/image";
import { DOCTOR } from "@/components/doctor";
import Reveal from "@/components/Reveal";
import silk from "@/hero-silk.webp";
import tealStroke from "@/teal-stroke.webp";
import brushMask from "@/brush-mask.png";
import painted from "@/doctor-kirash-painted.webp";

const CARD =
  "rounded-3xl bg-pill/90 shadow-[0_10px_30px_rgba(45,70,75,0.12)] backdrop-blur-sm";

export default function DoctorSection() {
  const { name, title, intro, highlights } = DOCTOR;
  const [years, ...otherHighlights] = highlights;

  return (
    <section
      id="doctor"
      aria-labelledby="doctor-heading"
      className="relative isolate overflow-hidden bg-[#e3eaea]"
    >
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

      <Reveal className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:gap-14 xl:gap-20 lg:px-[6%] lg:py-28">
        {/* Portrait painted onto the canvas: dry-brush edges fade into the background. */}
        <div className="relative isolate mx-auto w-full max-w-[520px] lg:max-w-none">
          {/* Brand teal laid down first, peeking out from under the painting. */}
          <Image
            src={tealStroke}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 1024px) 45vw, 520px"
            className="absolute -bottom-[9%] -left-[7%] -z-10 w-[92%] max-w-none opacity-80"
          />
          <div
            data-reveal
            className="relative aspect-[1416/1149]"
            style={{
              maskImage: `url(${brushMask.src})`,
              WebkitMaskImage: `url(${brushMask.src})`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          >
            <Image
              src={painted}
              alt={`${name} at his desk at Tru Aesthetics`}
              fill
              sizes="(min-width: 1024px) 45vw, 520px"
              quality={90}
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="canvas-grain absolute inset-0 opacity-25 mix-blend-multiply"
            />
          </div>

          <div
            data-reveal
            className={`absolute right-2 -bottom-6 px-6 py-4 sm:right-6 ${CARD} rounded-full`}
          >
            <p className="font-display text-4xl leading-none text-brand-deep">
              {years.value}
            </p>
            <p className="mt-1.5 text-sm text-ink-muted">{years.label}</p>
          </div>
        </div>

        {/* Details */}
        <div>
          <p
            data-reveal
            className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
          >
            Meet the doctor
          </p>
          <h2
            id="doctor-heading"
            data-reveal
            className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-6xl"
          >
            {name}
          </h2>
          <p
            data-reveal
            className="mt-3 text-sm font-medium tracking-[0.15em] text-ink-muted uppercase"
          >
            {title}
          </p>

          <p
            data-reveal
            className="mt-7 border-l-2 border-brand pl-5 font-display text-2xl leading-snug text-foreground lg:text-3xl"
          >
            {intro}
          </p>

          <dl
            data-reveal
            className="mt-9 flex divide-x divide-foreground/15 border-y border-foreground/15 py-5"
          >
            {otherHighlights.map(({ value, label }) => (
              <div key={label} className="flex-1 px-5 first:pl-0">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl leading-none text-brand-deep lg:text-4xl">
                  {value}
                </dd>
                <dd className="mt-1.5 text-sm text-ink-muted">{label}</dd>
              </div>
            ))}
          </dl>

        </div>
      </Reveal>
    </section>
  );
}
