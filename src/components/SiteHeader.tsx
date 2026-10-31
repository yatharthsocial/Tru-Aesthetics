import Image from "next/image";
import Link from "next/link";
import logo from "@/logo-true-aesthetics.webp";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services", hasMenu: true },
  { label: "Transformations", href: "#transformations" },
  { label: "About us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className="hero-anim hero-drop absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-[6%] lg:pt-6">
      <Link
        href="/"
        className="justify-self-start"
      >
        <Image
          src={logo}
          alt="Tru Aesthetics"
          priority
          sizes="52px"
          className="h-11 w-auto xl:h-[52px]"
        />
      </Link>

      <nav
        aria-label="Primary"
        className="hidden items-center gap-1 rounded-full bg-pill/95 p-1.5 text-sm font-medium text-foreground shadow-[0_6px_18px_rgba(45,70,75,0.14)] lg:flex xl:gap-2"
      >
        {NAV_LINKS.map(({ label, href, hasMenu }, index) => (
          <Link
            key={label}
            href={href}
            aria-current={index === 0 ? "page" : undefined}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2.5 transition-colors hover:bg-brand/15 aria-[current=page]:bg-foreground aria-[current=page]:text-white xl:px-5"
          >
            {label}
            {hasMenu && <Chevron />}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center justify-end gap-3 lg:flex xl:gap-5">
        <span className="flex items-center gap-1 text-sm font-bold text-foreground">
          EN
          <Chevron />
        </span>
        <Link
          href="#contact"
          className="rounded-full border border-foreground/70 px-4 py-2.5 xl:px-6 text-sm font-medium tracking-wide whitespace-nowrap text-foreground transition-colors hover:bg-foreground hover:text-white"
        >
          Book now
        </Link>
      </div>

      <details className="group relative lg:hidden">
        <summary
          aria-label="Menu"
          className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full bg-pill/85 text-foreground shadow-[0_6px_18px_rgba(45,70,75,0.14)] [&::-webkit-details-marker]:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M3 6.5h14M3 13.5h14" className="group-open:hidden" />
            <path d="m5 5 10 10M15 5 5 15" className="hidden group-open:block" />
          </svg>
        </summary>
        <nav
          aria-label="Mobile"
          className="absolute right-0 mt-2 flex w-56 flex-col rounded-3xl bg-pill p-2 text-base font-medium text-foreground shadow-[0_6px_18px_rgba(45,70,75,0.18)]"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-full px-4 py-2.5 hover:bg-brand/15"
            >
              {label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
