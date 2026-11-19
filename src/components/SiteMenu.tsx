"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CLINIC, telHref } from "@/components/clinic";
import { getSmoothScroll } from "@/lib/smoothScroll";

// One link per section of the home page, in page order.
const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About us", href: "#about" },
  { label: "Doctors", href: "#doctor" },
  { label: "Services", href: "#services" },
  { label: "Treatments", href: "#treatments" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/** Three lines that fold into a cross while the menu is open. */
function BurgerIcon({ open }: { open: boolean }) {
  const line =
    "absolute left-1/2 h-[1.5px] w-5 -translate-x-1/2 rounded-full bg-current transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span
        className={`${line} top-[4px] ${open ? "translate-y-[6px] rotate-45" : ""}`}
      />
      <span
        className={`${line} top-[10px] ${open ? "scale-x-0 opacity-0" : ""}`}
      />
      <span
        className={`${line} top-[16px] ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
      />
    </span>
  );
}

const BUTTON =
  "flex size-12 items-center justify-center rounded-full bg-pill/90 text-foreground shadow-[0_6px_18px_rgba(45,70,75,0.16)] backdrop-blur-sm transition-colors hover:bg-foreground hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep";

/**
 * The site menu: a hamburger button that opens a full-screen panel with every section,
 * plus the clinic's contact details. `base` points the section links back at the home page
 * from other pages.
 */
export default function SiteMenu({ base = "" }: { base?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const opener = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- the panel is portalled to <body>, which exists only after mount
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const lenis = getSmoothScroll();
    const button = opener.current;
    root.style.overflow = "hidden";
    lenis?.stop();
    // Once the panel is visible (it is inert while hidden), move focus into it.
    const focusTimer = window.setTimeout(
      () => firstLink.current?.focus({ preventScroll: true }),
      60,
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      lenis?.start();
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  // On the home page, close the menu first, then glide to the section.
  const go = (event: React.MouseEvent, href: string) => {
    if (base) return setOpen(false);
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target =
        href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getSmoothScroll();
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
      else target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href === "#top" ? " " : href);
    });
  };

  const panel = (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-[60] overflow-y-auto bg-[#eef3f3]/97 backdrop-blur-md transition-[opacity,visibility] duration-500 ease-out ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="mx-auto flex min-h-full max-w-[1400px] flex-col px-5 pt-5 pb-10 lg:px-[6%] lg:pt-6">
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className={BUTTON}
          >
            <BurgerIcon open />
          </button>
        </div>

        <div className="mt-8 grid flex-1 gap-12 lg:mt-4 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-16">
          <nav aria-label="Primary">
            <ol>
              {NAV_LINKS.map(({ label, href }, index) => (
                <li
                  key={label}
                  className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${120 + index * 45}ms` : "0ms",
                  }}
                >
                  <Link
                    ref={index === 0 ? firstLink : undefined}
                    href={href === "#top" ? base || "/" : `${base}${href}`}
                    onClick={(event) => go(event, href)}
                    className="group flex items-baseline gap-5 py-1.5 font-display text-4xl leading-tight text-foreground transition-colors hover:text-brand-deep focus-visible:text-brand-deep focus-visible:outline-none sm:text-5xl lg:text-6xl"
                  >
                    <span className="w-8 font-sans text-sm text-ink-muted/70 transition-colors group-hover:text-brand-deep">
                      0{index + 1}
                    </span>
                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div
            className={`border-t border-foreground/15 pt-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "450ms" : "0ms" }}
          >
            <p className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase">
              Visit us
            </p>
            <address className="mt-3 text-base leading-relaxed text-ink-muted not-italic">
              {CLINIC.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-6 space-y-1 text-base">
              {CLINIC.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="block text-foreground transition-colors hover:text-brand-deep"
                >
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${CLINIC.email}`}
                className="block text-foreground transition-colors hover:text-brand-deep"
              >
                {CLINIC.email}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              {CLINIC.hours[0].days}, {CLINIC.hours[0].time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={opener}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className={BUTTON}
      >
        <BurgerIcon open={false} />
      </button>
      {/* Rendered at the end of <body>, so the page's own layers can't clip or cover it. */}
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
