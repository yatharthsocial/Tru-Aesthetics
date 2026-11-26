import { CLINIC } from "@/components/clinic";

// Google's keyless embed, centred on the clinic. Without an API key its colours can't be
// changed, so it is toned to the site's palette with CSS, and our own pin sits on top.
const EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  CLINIC.mapQuery,
)}&z=16&output=embed`;

/**
 * The clinic's location as a card in the site's style: a softly toned map with a teal pin,
 * and a bar with the clinic's name and a directions link. The whole card opens Google Maps.
 */
export default function ClinicMap({ className = "" }: { className?: string }) {
  return (
    <a
      href={CLINIC.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get directions to ${CLINIC.name} in Google Maps (opens in a new tab)`}
      className={`group block overflow-hidden rounded-[1.5rem] bg-pill shadow-[0_20px_50px_-28px_rgba(31,48,52,0.45)] ring-1 ring-foreground/10 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(31,48,52,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-deep ${className}`}
    >
      <div className="relative aspect-[16/8] overflow-hidden bg-[#dfe8e8]">
        {/* The map itself is a picture here: the card is the link, so it doesn't pan. */}
        <iframe
          src={EMBED_URL}
          title={`Map showing ${CLINIC.name}, ${CLINIC.address.join(", ")}`}
          loading="lazy"
          tabIndex={-1}
          referrerPolicy="no-referrer-when-downgrade"
          className="pointer-events-none absolute inset-0 size-full border-0 [filter:grayscale(1)_contrast(0.92)_brightness(1.06)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        {/* A soft teal wash, so the map sits in the site's colours. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#bfdedb]/45 mix-blend-multiply"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(238,243,243,0.9)]"
        />

        {/* The clinic's pin, over the centre of the map where Google places it. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center"
        >
          <span className="relative flex size-10 items-center justify-center rounded-full rounded-br-none bg-brand-deep shadow-[0_8px_18px_rgba(11,95,89,0.45)] [transform:rotate(45deg)]">
            <span className="size-3.5 rounded-full bg-white" />
          </span>
          <span className="absolute top-full mt-1 size-3 -translate-y-1/2 animate-ping rounded-full bg-brand/60 motion-reduce:hidden" />
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {CLINIC.name}
          </p>
          <p className="truncate text-xs text-ink-muted">
            Lotus Paradise Plaza, Bendoor
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-deep px-4 py-2 text-xs font-medium text-white transition-colors group-hover:bg-foreground">
          Get directions
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </a>
  );
}
