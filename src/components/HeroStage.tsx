"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setSmoothScroll } from "@/lib/smoothScroll";
import { HEAD_AREAS } from "@/components/headAreas";
import {
  createPortraitRenderer,
  type PortraitRenderer,
  type PortraitView,
} from "@/lib/portraitRenderer";

gsap.registerPlugin(ScrollTrigger);
// Phone address bars resize the viewport mid-scroll; recalculating then makes the pin jump.
ScrollTrigger.config({ ignoreMobileResize: true });

const MAX_WAIT_MS = 2000;
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Scroll distance per second of timeline, as a share of the viewport height. */
const SCROLL_PER_SECOND = 0.4;
const INTRO = 1.4;
const AREA_HOLD = 0.8;
const AREA_SWITCH = 1;
const REST_VIEW: PortraitView = {
  zoom: 1,
  focusX: 0.5,
  focusY: 0.4,
  panX: 0,
  panY: 0,
  yaw: 0,
  pitch: 0,
};

// Once it has moved aside, the head holds one still pose: on the left on desktop,
// at the top on phones. The cards and the About panel own the remaining space.
const DESKTOP_POSE = {
  zoom: 1.02,
  focusX: 0.5,
  focusY: 0.4,
  panX: -0.24,
  panY: 0.02,
};
const MOBILE_POSE = {
  zoom: 1.2,
  focusX: 0.5,
  focusY: 0.24,
  panX: 0,
  panY: -0.445,
};

type HeroStageProps = {
  colorUrl: string;
  depthUrl: string;
  children: React.ReactNode;
};

type Point = { x: number; y: number };

const mix = (a: Point, b: Point, t: number) => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

function buildTour(
  stage: HTMLElement,
  renderer: PortraitRenderer,
  canvas: HTMLCanvasElement,
) {
  const select = gsap.utils.selector(stage);
  const heroText = select("[data-tour-fade]");
  const markerLayer = select("[data-tour-markers]")[0];
  const markers = select<HTMLElement>("[data-tour-marker]");
  const cards = select<HTMLElement>("[data-tour-card]");
  const leader = select<SVGLineElement>("[data-tour-leader]")[0];
  const about = select<HTMLElement>("[data-tour-about]")[0];
  const seam = select<HTMLElement>("[data-tour-seam]")[0];
  const aboutItems = select<HTMLElement>("[data-tour-about] [data-about-item]");
  const restImage = select<HTMLImageElement>("img[data-hero-portrait]")[0];
  const last = HEAD_AREAS.length - 1;

  // Smooth the wheel so the scrubbed tour glides the same way down and back up.
  const lenis = new Lenis({ lerp: 0.09, autoRaf: false });
  const raf = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  setSmoothScroll(lenis);

  const view = { ...REST_VIEW };
  // `active` is fractional mid-turn, so the leader line glides from one area to the next.
  const link = { strength: 0, active: 0 };
  let activeMarker = -1;

  const size = () => {
    renderer.resize(stage.clientWidth, stage.clientHeight);
    return stage.clientWidth >= 1024;
  };
  let isDesktop = size();

  const draw = () => {
    const from = Math.floor(link.active);
    const to = Math.min(from + 1, last);
    const progress = link.active - from;

    // Read card positions before writing any styles, to avoid forcing layout twice a frame.
    const stageBox = stage.getBoundingClientRect();
    const cardEdge = (index: number) => {
      const box = cards[index].getBoundingClientRect();
      return {
        x: box.left - stageBox.left,
        y: box.top + box.height / 2 - stageBox.top,
      };
    };
    const lineEnd = mix(cardEdge(from), cardEdge(to), progress);

    renderer.render(view);
    const points = HEAD_AREAS.map((area) =>
      renderer.project(area.anchor, view),
    );
    points.forEach(({ x, y }, index) => {
      markers[index].style.transform = `translate(${x}px, ${y}px)`;
    });

    const active = Math.round(link.active);
    if (active !== activeMarker) {
      activeMarker = active;
      markers.forEach((marker, index) => {
        marker.dataset.active = String(index === active);
      });
    }

    const lineStart = mix(points[from], points[to], progress);
    leader.setAttribute("x1", String(lineStart.x));
    leader.setAttribute("y1", String(lineStart.y));
    leader.setAttribute("x2", String(lineEnd.x));
    leader.setAttribute("y2", String(lineEnd.y));
    leader.style.opacity = isDesktop ? String(link.strength) : "0";
  };

  const onResize = () => {
    isDesktop = size();
    draw();
  };
  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(stage);

  draw();
  canvas.style.opacity = "1";
  restImage.style.visibility = "hidden";

  gsap.set(cards, { autoAlpha: 0, y: 30 });
  gsap.set(aboutItems, { autoAlpha: 0, y: 48 });

  // Function values are re-read on refresh, so the pose follows a resize across the breakpoint.
  const pose = Object.fromEntries(
    (Object.keys(DESKTOP_POSE) as (keyof typeof DESKTOP_POSE)[]).map((key) => [
      key,
      () => (isDesktop ? DESKTOP_POSE : MOBILE_POSE)[key],
    ]),
  );
  // Symmetric eases, so every step looks the same scrolling down and back up.
  const cardIn = { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.inOut" };
  const cardOut = { autoAlpha: 0, y: -30, duration: 0.6, ease: "power2.inOut" };

  const tour = gsap.timeline({
    defaults: { ease: "none" },
    onUpdate: draw,
    scrollTrigger: {
      trigger: stage,
      pin: true,
      start: "top top",
      end: () =>
        `+=${tour.duration() * SCROLL_PER_SECOND * window.innerHeight}`,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Slide the head aside once, then point at the first area.
  tour.to(
    heroText,
    { autoAlpha: 0, y: -40, duration: 0.7, ease: "power2.inOut" },
    0,
  );
  tour.to(
    view,
    {
      ...pose,
      yaw: 0,
      pitch: 0,
      duration: INTRO,
      ease: "power3.inOut",
      immediateRender: false,
    },
    0,
  );
  tour.to(markerLayer, { autoAlpha: 1, duration: 0.4 }, INTRO - 0.5);
  tour.to(cards[0], cardIn, INTRO - 0.4);
  tour.to(link, { strength: 1, duration: 0.5 }, INTRO - 0.2);

  HEAD_AREAS.forEach((area, index) => {
    const position = INTRO + index * (AREA_HOLD + AREA_SWITCH);
    tour.addLabel(area.id, position);
    const leave = position + AREA_HOLD;

    if (index < last) {
      // The head stays still; the line slides to the next marker while the cards cross-fade.
      tour.to(
        link,
        { active: index + 1, duration: AREA_SWITCH, ease: "sine.inOut" },
        leave,
      );
      tour.to(cards[index], cardOut, leave);
      tour.to(cards[index + 1], cardIn, leave + AREA_SWITCH - 0.6);
      return;
    }

    // The pointers clear and the About panel rises in, one piece at a time.
    tour.to(cards[index], cardOut, leave);
    tour.to(
      markerLayer,
      { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
      leave,
    );
    tour.to(link, { strength: 0, duration: 0.4 }, leave);
    tour.to(seam, { opacity: 1, duration: 1.2, ease: "power2.inOut" }, leave);
    tour.addLabel("about", leave + 0.6);
    tour.set(about, { autoAlpha: 1 }, leave + 0.6);
    tour.to(
      aboutItems,
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut", stagger: 0.18 },
      leave + 0.6,
    );
    tour.to({}, { duration: 1 });
  });

  // The About section only exists inside the tour, so send its nav link to that point of the scroll.
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (!target?.closest('a[href="#about"]') || !tour.scrollTrigger) return;
    event.preventDefault();
    lenis.scrollTo(
      tour.scrollTrigger.labelToScroll("about") + window.innerHeight,
      {
        duration: 2.4,
      },
    );
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    setSmoothScroll(null);
    lenis.destroy();
    resizeObserver.disconnect();
    canvas.style.opacity = "";
    restImage.style.visibility = "";
  };
}

export default function HeroStage({
  colorUrl,
  depthUrl,
  children,
}: HeroStageProps) {
  const stage = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  // Hold the entrance until the portrait is decoded and the fonts are in, so nothing pops in mid-animation.
  useEffect(() => {
    let cancelled = false;
    const portrait = stage.current?.querySelector<HTMLImageElement>(
      "img[data-hero-portrait]",
    );
    const assets = Promise.all([
      portrait?.decode().catch(() => undefined),
      document.fonts.ready,
    ]);
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));

    Promise.race([assets, timeout]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const root = stage.current;
    const canvas = root?.querySelector("canvas");
    if (!root || !canvas || !window.matchMedia(MOTION_OK).matches) return;

    let cancelled = false;
    let renderer: PortraitRenderer | null = null;
    let context: gsap.Context | undefined;
    let teardown: (() => void) | undefined;

    createPortraitRenderer(canvas, colorUrl, depthUrl)
      .then((created) => {
        renderer = created;
        if (cancelled || !created) return;
        document.documentElement.dataset.tour = "on";
        context = gsap.context(() => {
          teardown = buildTour(root, created, canvas);
        }, root);
        // The pin adds scroll length after later sections measured theirs, so re-measure in page order.
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      teardown?.();
      context?.revert();
      renderer?.destroy();
      delete document.documentElement.dataset.tour;
    };
  }, [colorUrl, depthUrl]);

  return (
    <section
      ref={stage}
      data-ready={ready}
      className="relative isolate h-svh min-h-svh overflow-hidden bg-[#d3dcdc]"
    >
      {children}
    </section>
  );
}
