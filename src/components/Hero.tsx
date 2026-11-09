import Image from "next/image";
import Link from "next/link";
import { AboutContent } from "@/components/About";
import { HEAD_AREAS } from "@/components/headAreas";
import HeroStage from "@/components/HeroStage";
import SiteHeader from "@/components/SiteHeader";
import silk from "@/hero-silk.webp";
import depth from "@/tru-goldfinch-depth.webp";
import portrait from "@/tru-goldfinch-hd.webp";
import wordmark from "@/wordmark-tru-aesthetics.webp";

export default function Hero() {
  return (
    <HeroStage colorUrl={portrait.src} depthUrl={depth.src}>
      <noscript>
        <style>{".hero-anim { animation: none; }"}</style>
      </noscript>

      <Image
        src={silk}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-anim hero-silk -z-10 object-cover"
      />

      <SiteHeader />

      <div
        data-tour-fade
        className="absolute inset-x-5 top-[88px] lg:inset-x-[6%] lg:top-[22%]"
      >
        <h1>
          <Image
            src={wordmark}
            alt="Tru Aesthetics"
            priority
            quality={90}
            sizes="(min-width: 1024px) 88vw, 90vw"
            className="hero-anim hero-wordmark h-auto w-full"
          />
        </h1>

        <div className="relative z-20 mt-4 flex flex-col items-center gap-1 text-center lg:mt-[2.5vw] lg:flex-row lg:justify-between lg:text-left">
          <p className="hero-anim hero-slide-left text-sm font-medium tracking-wide text-ink-muted uppercase lg:text-lg">
            Experts in timeless beauty
          </p>
          <p className="hero-anim hero-slide-right text-sm text-ink-muted lg:text-lg">
            Creating looks that turn every head
          </p>
        </div>
      </div>

      <div className="hero-anim hero-portrait absolute inset-0 z-10">
        <Image
          src={portrait}
          alt="Smiling man in a checked shirt"
          priority
          quality={90}
          sizes="(min-width: 1024px) 62vw, 160vw"
          data-hero-portrait
          className="absolute top-[36%] left-1/2 h-[84%] w-auto max-w-none -translate-x-1/2 lg:top-[9%] lg:h-[116%]"
        />
        <canvas
          aria-hidden="true"
          className="absolute inset-0 size-full opacity-0"
        />
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 size-full"
      >
        <line
          data-tour-leader
          className="stroke-brand-deep"
          strokeWidth="1"
          style={{ opacity: 0 }}
        />
      </svg>

      <div
        data-tour-markers
        aria-hidden="true"
        className="invisible absolute inset-0 z-20 opacity-0"
      >
        {HEAD_AREAS.map(({ id }) => (
          <span key={id} data-tour-marker className="hero-marker" />
        ))}
      </div>

      {HEAD_AREAS.map(({ id, name, description }, index) => (
        <article
          key={id}
          data-tour-card
          className="invisible absolute inset-x-4 bottom-6 z-30 rounded-3xl bg-pill p-5 opacity-0 shadow-[0_10px_30px_rgba(45,70,75,0.18)] lg:inset-x-auto lg:top-[32%] lg:bottom-auto lg:left-[50%] lg:w-[420px] lg:p-8"
        >
          <p className="text-sm font-medium text-brand-deep">
            0{index + 1} / 0{HEAD_AREAS.length}
          </p>
          <h2 className="mt-1 font-display text-3xl text-foreground lg:mt-2 lg:text-4xl">
            {name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted lg:mt-3 lg:text-base">
            {description}
          </p>
        </article>
      ))}

      {/* Fades the foot of the scene into the doctor section that follows the tour. */}
      <div
        data-tour-seam
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent to-[#eef3f3] opacity-0 lg:h-56"
      />

      <div
        data-tour-about
        className="invisible absolute inset-x-0 bottom-0 z-30 rounded-t-3xl bg-[#eef3f3] p-5 pb-7 opacity-0 shadow-[0_-10px_30px_rgba(45,70,75,0.14)] lg:inset-x-auto lg:top-1/2 lg:right-[6%] lg:bottom-auto lg:left-[50%] lg:-translate-y-1/2 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none"
      >
        <AboutContent />
      </div>

      <div
        data-tour-fade
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 lg:right-[6%] lg:bottom-[11%] lg:left-auto lg:translate-x-0"
      >
        <Link
          href="#contact"
          className="hero-anim hero-rise block rounded-full bg-brand px-12 py-4 text-base font-medium tracking-wide whitespace-nowrap text-ink shadow-[0_8px_20px_rgba(18,122,115,0.28)] transition-colors hover:bg-brand-deep hover:text-white lg:px-16"
        >
          Book now
        </Link>
      </div>
    </HeroStage>
  );
}
