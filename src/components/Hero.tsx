import Image from "next/image";
import HeroShell from "@/components/HeroShell";
import SiteHeader from "@/components/SiteHeader";
import wordmark from "@/wordmark-tru-aesthetics.webp";

export default function Hero() {
  return (
    <HeroShell>
      <noscript>
        <style>
          {
            ".hero-anim { animation: none; } .hero-reveal, .hero-veil { opacity: 1; transform: none; filter: none; }"
          }
        </style>
      </noscript>

      <SiteHeader />

      {/* Hidden while the film plays; fades in, one line after another, in the open space
          on the left of its last frame (at the foot of the screen on phones). */}
      <div className="absolute inset-x-5 bottom-[max(6.5rem,11%)] z-10 text-center lg:inset-x-auto lg:top-1/2 lg:bottom-auto lg:left-[6%] lg:w-[42%] lg:-translate-y-1/2 lg:text-left">
        <p
          className="hero-reveal text-sm font-medium tracking-[0.2em] text-brand-deep uppercase lg:text-base"
          style={{ "--reveal-delay": "0s" } as React.CSSProperties}
        >
          Experts in timeless beauty
        </p>
        <h1
          className="hero-reveal mt-4 lg:mt-6"
          style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
        >
          <Image
            src={wordmark}
            alt="Tru Aesthetics"
            priority
            quality={90}
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="h-auto w-full"
          />
        </h1>
        <span
          aria-hidden="true"
          className="hero-reveal mx-auto mt-6 block h-px w-16 bg-brand lg:mx-0 lg:mt-8"
          style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}
        />
        <p
          className="hero-reveal mt-5 text-lg text-ink-muted lg:mt-6 lg:text-2xl"
          style={{ "--reveal-delay": "1s" } as React.CSSProperties}
        >
          Creating looks that turn every head
        </p>
        <p
          className="hero-reveal mt-2 text-sm text-ink-muted/80 lg:text-base"
          style={{ "--reveal-delay": "1.3s" } as React.CSSProperties}
        >
          Cosmetic surgery &amp; hair transplant · Mangaluru
        </p>
      </div>
    </HeroShell>
  );
}
