import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CLINIC, telHref } from "@/components/clinic";
import logo from "@/logo-true-aesthetics.webp";

function Icon({ d }: { d: string }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  );
}

const PIN =
  "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";
const PHONE =
  "M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z";
const CLOCK = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2";

// Cached so the year is part of the static page and refreshes when the cache does.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function ContactSection() {
  const { name, partner, address, mapUrl, phones, email, hours } = CLINIC;

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-[#1f3034] px-5 pt-20 pb-10 text-[#d9e4e4] lg:px-[6%] lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 -z-10 size-[620px] rounded-full bg-brand/20 blur-3xl"
      />

      <Reveal className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <p
              data-reveal
              className="text-sm font-medium tracking-[0.2em] text-brand uppercase"
            >
              Contact us
            </p>
            <h2
              id="contact-heading"
              data-reveal
              className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl xl:text-7xl"
            >
              Book your <span className="text-brand">consultation</span>
            </h2>
          </div>
          <div data-reveal className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={telHref(phones[0])}
              className="rounded-full bg-brand px-8 py-4 text-base font-medium whitespace-nowrap text-ink shadow-[0_8px_20px_rgba(40,190,179,0.25)] transition-colors hover:bg-white"
            >
              Call {phones[0]}
            </a>
            <a
              href={`mailto:${email}`}
              className="rounded-full border border-white/40 px-8 py-4 text-base font-medium whitespace-nowrap text-white transition-colors hover:bg-white hover:text-ink"
            >
              Email us
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
          <div
            data-reveal
            className="flex gap-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 lg:p-7"
          >
            <Icon d={PIN} />
            <div>
              <h3 className="text-sm font-medium tracking-[0.2em] text-brand uppercase">
                Address
              </h3>
              <address className="mt-3 leading-relaxed text-white not-italic">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-brand underline-offset-4 hover:underline"
              >
                Get directions ↗
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="flex gap-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 lg:p-7"
          >
            <Icon d={PHONE} />
            <div>
              <h3 className="text-sm font-medium tracking-[0.2em] text-brand uppercase">
                Contact
              </h3>
              <ul className="mt-3 space-y-1.5 text-white">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a href={telHref(phone)} className="hover:text-brand">
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="break-all hover:text-brand"
                  >
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            data-reveal
            className="flex gap-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 lg:p-7"
          >
            <Icon d={CLOCK} />
            <div className="flex-1">
              <h3 className="text-sm font-medium tracking-[0.2em] text-brand uppercase">
                Opening hours
              </h3>
              <dl className="mt-3 space-y-2">
                {hours.map(({ days, time }) => (
                  <div
                    key={days}
                    className="flex flex-wrap justify-between gap-x-4 border-b border-white/10 pb-2 last:border-0"
                  >
                    <dt className="text-[#d9e4e4]">{days}</dt>
                    <dd
                      className={
                        time === "Closed" ? "text-white/50" : "text-white"
                      }
                    >
                      {time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="" sizes="44px" className="h-11 w-auto" />
            <div>
              <p className="font-display text-xl text-white">{name}</p>
              <p className="text-xs text-white/60">
                In association with {partner}
              </p>
            </div>
          </div>
          <p className="text-xs text-white/50">
            © <CopyrightYear /> {name}. All rights reserved.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
