"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import ServiceFocus from "@/components/ServiceFocus";
import { SERVICES } from "@/components/services";

const pad = (value: number) => String(value).padStart(2, "0");

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  // Whether a visitor is on a row right now. Nothing is highlighted or marked until they are,
  // and before-and-after effects (like the hairline) only play while they are.
  const [engaged, setEngaged] = useState(false);
  const choose = (index: number) => {
    setActive(index);
    setEngaged(true);
  };
  // Only one 3D view runs at a time: sticky beside the list on desktop, inside the open row on phones.
  const isDesktop = useIsDesktop();
  const current = SERVICES[active];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-[#eef3f3] px-5 pt-8 pb-24 lg:px-[6%] lg:pt-12 lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[560px] rounded-full bg-brand/10 blur-3xl"
      />

      <Reveal className="mx-auto max-w-[1400px]">
        <div className="border-t border-foreground/15 pt-16 lg:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p
                data-reveal
                className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase"
              >
                Our services
              </p>
              <h2
                id="services-heading"
                data-reveal
                className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-7xl"
              >
                Treatments, <span className="text-brand">tailored</span> to you
              </h2>
            </div>
            <p
              data-reveal
              className="max-w-sm text-base leading-relaxed text-ink-muted"
            >
              Hover or tap a treatment to see the area it focuses on. Every plan
              starts with a consultation.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[3fr_2fr] lg:gap-12 xl:gap-16">
          <ol
            className="border-t border-foreground/15"
            onMouseLeave={() => setEngaged(false)}
          >
            {SERVICES.map(({ name, category, description, featured }, index) => {
              const isActive = engaged && index === active;
              return (
                <li key={name} data-reveal className="border-b border-foreground/15">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => choose(index)}
                    onMouseEnter={() => choose(index)}
                    onFocus={() => choose(index)}
                    onBlur={() => setEngaged(false)}
                    className="group relative flex w-full items-baseline gap-4 py-5 text-left lg:gap-6 lg:py-6"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[-1px] left-0 h-px bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                    <span
                      className={`w-7 shrink-0 text-sm font-medium transition-colors ${
                        isActive ? "text-brand-deep" : "text-ink-muted/70"
                      }`}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className={`flex-1 font-display text-3xl leading-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-4xl xl:text-5xl ${
                        isActive
                          ? "translate-x-2 text-brand-deep"
                          : "text-foreground/70 group-hover:text-foreground"
                      }`}
                    >
                      {name}
                    </span>
                    <span
                      className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-medium sm:inline ${
                        featured
                          ? "bg-brand text-ink"
                          : "border border-foreground/20 text-ink-muted"
                      }`}
                    >
                      {featured ? "Our speciality" : category}
                    </span>
                  </button>

                  {/* Phones only: on desktop the description sits under the arch, so rows never resize under the cursor. */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 lg:hidden ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-11 lg:pl-[52px]">
                        <p className="max-w-md text-base leading-relaxed text-ink-muted">
                          {description}
                        </p>
                        <span className="mt-3 inline-block rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium text-ink-muted sm:hidden">
                          {featured ? "Our speciality" : category}
                        </span>
                        {isActive && isDesktop === false && (
                          <ServiceFocus
                            index={index}
                            engaged={engaged}
                            className="mt-4 w-full max-w-[320px]"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div data-reveal className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mx-auto max-w-[540px]">
                <div className="relative">
                  {isDesktop && <ServiceFocus index={active} engaged={engaged} />}
                  {engaged && (
                    <p className="service-in absolute top-0 right-0 rounded-full bg-pill/90 px-4 py-2 text-xs font-medium text-ink-muted shadow-[0_6px_18px_rgba(45,70,75,0.14)]">
                      {pad(active + 1)} / {pad(SERVICES.length)}
                    </p>
                  )}
                </div>
                <p
                  key={engaged ? current.name : "rest"}
                  className="service-in mt-2 min-h-[3.5rem] text-center text-base leading-relaxed text-ink-muted"
                >
                  {engaged ? current.description : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
