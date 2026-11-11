import type Lenis from "lenis";

// The page's Lenis instance, created by the hero tour, so other sections can hold or steer scrolling.
let instance: Lenis | null = null;

export const setSmoothScroll = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getSmoothScroll = () => instance;
