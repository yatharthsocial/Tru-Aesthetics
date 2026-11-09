"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Fades its [data-reveal] children up into place as they scroll into view. */
export default function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !window.matchMedia(MOTION_OK).matches) return;

    const context = gsap.context(() => {
      // Content stays visible without JavaScript; it is only hidden once this can reveal it.
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 48 });
      ScrollTrigger.batch("[data-reveal]", {
        // Low enough that items at the very bottom of the page still cross it.
        start: "top 94%",
        once: true,
        onEnter: (items) =>
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
