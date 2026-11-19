"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setSmoothScroll } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);
// Phone address bars resize the viewport mid-scroll; recalculating then makes pins jump.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Gently smooths wheel scrolling across the page, kept in step with the scroll animations. */
export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches)
      return;
    const lenis = new Lenis({ lerp: 0.09, autoRaf: false });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setSmoothScroll(lenis);
    return () => {
      gsap.ticker.remove(raf);
      setSmoothScroll(null);
      lenis.destroy();
    };
  }, []);
  return null;
}
