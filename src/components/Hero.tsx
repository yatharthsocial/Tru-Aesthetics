import HeroShell from "@/components/HeroShell";
import SiteHeader from "@/components/SiteHeader";

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
      <div className="absolute inset-x-5 bottom-[max(6.5rem,11%)] z-10 text-center lg:inset-x-auto lg:top-1/2 lg:bottom-auto lg:left-[6%] lg:w-[46%] lg:-translate-y-1/2 lg:text-left">
        <p
          className="hero-reveal font-display text-3xl leading-tight text-ink-muted sm:text-4xl xl:text-5xl"
          style={{ "--reveal-delay": "0s" } as React.CSSProperties}
        >
          Experts in Timeless Beauty
        </p>
        <h1
          className="hero-reveal mt-2 text-5xl leading-[1.05] font-extrabold tracking-[-0.02em] text-[#2f4a4c] sm:text-6xl lg:mt-3 xl:text-7xl"
          style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
        >
          <span className="text-brand">Trú</span> Aesthetics
        </h1>
        <p
          className="hero-reveal mt-6 text-sm leading-snug text-ink-muted lg:hidden"
          style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}
        >
          Cosmetic surgery &amp; hair transplant
          <span className="block font-medium text-brand-deep">Mangaluru</span>
        </p>
      </div>

      {/* Desktop: the clinic's specialities and city, at the foot of the screen. */}
      <p
        className="hero-reveal absolute bottom-[8%] left-[6%] z-10 hidden text-base leading-snug text-ink-muted lg:block"
        style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}
      >
        Cosmetic surgery &amp; hair transplant
        <span className="block font-medium text-brand">Mangaluru</span>
      </p>
    </HeroShell>
  );
}
