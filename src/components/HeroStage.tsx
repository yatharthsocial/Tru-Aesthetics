"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HEAD_AREAS } from "@/components/headAreas";
import {
  createPortraitRenderer,
  type PortraitRenderer,
  type PortraitView,
} from "@/lib/portraitRenderer";

gsap.registerPlugin(ScrollTrigger);

const MAX_WAIT_MS = 2000;
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const AREA_HOLD = 0.7;
const AREA_STEP = 2;
const REST_VIEW: PortraitView = {
  zoom: 1,
  focusX: 0.5,
  focusY: 0.4,
  panX: 0,
  panY: 0,
  yaw: 0,
  pitch: 0,
};

type HeroStageProps = {
  colorUrl: string;
  depthUrl: string;
  children: React.ReactNode;
};

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
  const restImage = select<HTMLImageElement>("img[data-hero-portrait]")[0];

  const view = { ...REST_VIEW };
  const link = { strength: 0, active: 0 };
  let activeMarker = -1;

  const size = () => {
    renderer.resize(stage.clientWidth, stage.clientHeight);
    return stage.clientWidth >= 1024;
  };
  let isDesktop = size();

  const draw = () => {
    renderer.render(view);

    const points = HEAD_AREAS.map((area) => renderer.project(area.anchor, view));
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

    const stageBox = stage.getBoundingClientRect();
    const cardBox = cards[active].getBoundingClientRect();
    const onRight = HEAD_AREAS[active].side === "right";
    leader.setAttribute("x1", String(points[active].x));
    leader.setAttribute("y1", String(points[active].y));
    leader.setAttribute(
      "x2",
      String(
        (isDesktop
          ? onRight
            ? cardBox.left
            : cardBox.right
          : cardBox.left + cardBox.width / 2) - stageBox.left,
      ),
    );
    leader.setAttribute(
      "y2",
      String(
        (isDesktop ? cardBox.top + cardBox.height / 2 : cardBox.top) -
          stageBox.top,
      ),
    );
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

  gsap.set(cards, { autoAlpha: 0, y: 26 });

  const move = { duration: 1, ease: "power2.inOut" };
  const viewFor = (index: number) => {
    const { panX, zoom, ...rest } = HEAD_AREAS[index].view;
    return isDesktop
      ? { ...rest, zoom, panX, panY: -0.04 }
      : {
          ...rest,
          focusX: (rest.focusX + 0.5) / 2,
          zoom: zoom * 1.15,
          panX: 0,
          panY: -0.3,
        };
  };
  const cardIn = { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" };
  const cardOut = { autoAlpha: 0, y: -26, duration: 0.3, ease: "power2.in" };

  const tour = gsap.timeline({
    defaults: { ease: "none" },
    onUpdate: draw,
    scrollTrigger: {
      trigger: stage,
      pin: true,
      start: "top top",
      end: () => `+=${(HEAD_AREAS.length + 1) * window.innerHeight * 1.4}`,
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  });

  tour.addLabel("rest", 0);
  tour.to(heroText, { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" }, 0);
  tour.to(view, { ...viewFor(0), ...move }, 0);
  tour.to(markerLayer, { autoAlpha: 1, duration: 0.3 }, 0.6);
  tour.to(cards[0], cardIn, 0.7);
  tour.to(link, { strength: 1, duration: 0.3 }, 0.8);

  HEAD_AREAS.forEach((area, index) => {
    const position = 1.1 + index * AREA_STEP;
    tour.addLabel(area.id, position);

    const next = index + 1;
    const leave = position + AREA_HOLD;
    tour.to(link, { strength: 0, duration: 0.2 }, leave);
    tour.to(cards[index], cardOut, leave);

    if (next < HEAD_AREAS.length) {
      tour.to(view, { ...viewFor(next), ...move, duration: 1.1 }, leave + 0.1);
      tour.set(link, { active: next }, leave + 0.6);
      tour.to(cards[next], cardIn, leave + 0.8);
      tour.to(link, { strength: 1, duration: 0.3 }, leave + 0.9);
    } else {
      tour.to(view, { ...REST_VIEW, ...move }, leave + 0.1);
      tour.to(markerLayer, { autoAlpha: 0, duration: 0.3 }, leave + 0.1);
      tour.to(
        heroText,
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        leave + 0.6,
      );
      tour.addLabel("end", leave + 1.1);
    }
  });

  return () => {
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
