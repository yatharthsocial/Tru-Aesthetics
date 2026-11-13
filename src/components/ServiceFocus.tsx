import Image from "next/image";
import { SERVICES, type Fix } from "@/components/services";
import hair0 from "@/hairline/recede-0.webp";
import hair20 from "@/hairline/recede-0.2.webp";
import hair40 from "@/hairline/recede-0.4.webp";
import hair60 from "@/hairline/recede-0.6.webp";
import hair80 from "@/hairline/recede-0.8.webp";
import receded from "@/hairline/recede-1.webp";
import lipsBefore from "@/lips-before.webp";
import upperlipBefore from "@/upperlip-before.webp";
import portrait from "@/model-female.webp";

// Hairline frames from the receded arch to the full hairline. On hover they fade in one over
// the next with overlapping, eased fades, so the hairline advances continuously; on leave they
// fade back out in reverse.
const HAIR_FRAMES = [hair80, hair60, hair40, hair20, hair0];
const HAIR_STEP_MS = 180;

// Each concern as a layer over just that area of her face; it fades out once treated.
const BEFORE_LAYERS = [
  { fix: "lips", src: lipsBefore },
  { fix: "upperlip", src: upperlipBefore },
] as const;

export const ALL_FIXES = SERVICES.map((service) => service.fix);

// The marker and tooltip arrive together with the treatment's text, in one short, eased
// entrance (see SYNC_S), so the words and the tooltip always appear as a pair.
const MARKER_DELAY_S = 0;
/** How long the tooltip's entrance takes; matches the description's fade in ServicesSection. */
export const SYNC_S = 0.6;
/** When a treatment points at several areas, each area follows the one before by this much. */
export const STAGGER_S = 0.25;

/**
 * The turn each marker appears in: the areas with a tooltip one after another, and a marker
 * without one (the other eye, the other side of the mouth) along with the tooltip at its height.
 */
export function revealOrder(points: { y: number; note?: string }[]) {
  const noted = points.filter((point) => point.note);
  return points.map((point) => {
    const partner = point.note
      ? point
      : noted.find((other) => Math.abs(other.y - point.y) < 0.02);
    return partner ? noted.indexOf(partner) : 0;
  });
}

/** A short frosted label beside a marker, opening away from the face. */
function MarkerTip({
  label,
  note,
  side,
  delay = 0,
}: {
  label?: string;
  note: string;
  side: "left" | "right";
  /** Seconds the marker waits before appearing; the tooltip follows it. */
  delay?: number;
}) {
  return (
    <span
      className={`absolute top-1/2 hidden -translate-y-1/2 items-center lg:flex ${
        side === "right" ? "left-3 flex-row" : "right-3 flex-row-reverse"
      }`}
    >
      <span
        className="tip-line h-px w-8 bg-brand-deep/60"
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${SYNC_S}s`,
        }}
      />
      <span
        className={`tip-card w-[190px] rounded-2xl bg-pill/95 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(45,70,75,0.18)] backdrop-blur-sm ${
          side === "right" ? "text-left" : "text-right"
        }`}
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${SYNC_S}s`,
        }}
      >
        {label && (
          <span className="block text-[11px] font-medium tracking-[0.18em] text-brand-deep uppercase">
            {label}
          </span>
        )}
        <span className="mt-0.5 block text-xs leading-snug text-foreground">
          {note}
        </span>
      </span>
    </span>
  );
}

/**
 * The model portrait, held still, with markers and tooltips on the areas a service treats.
 * At rest she shows every concern; each treatment corrects its own. Hovering shows one fix at a
 * time; the scroll tour passes `applied` so fixes build up and stay.
 */
export default function ServiceFocus({
  index,
  engaged,
  complete = false,
  applied,
  className = "",
}: {
  index: number;
  /** Whether a visitor is on the service right now; markers show only then. */
  engaged: boolean;
  /** The finale: every treatment applied and no markers. */
  complete?: boolean;
  /** Fixes already applied (scroll tour). Without it, only the hovered service's fix shows. */
  applied?: Fix[];
  className?: string;
}) {
  const service = SERVICES[index];
  const done = new Set<Fix>(
    applied ?? (complete ? ALL_FIXES : engaged ? [service.fix] : []),
  );
  // At rest she shows no markers; they appear while a service is shown. In the finale the
  // last treatment's markers stay a moment, fading away (see the wrapper below).
  const points = engaged || complete ? service.points : [];
  const order = revealOrder(points);
  const restoresHair = done.has("hairline");
  const rejuvenates = done.has("skin");
  const markerDelay = MARKER_DELAY_S;
  // Tooltips sit beside the markers on desktop; narrower screens list them under the face.
  const notes = points
    .map((point, i) => ({ ...point, number: i + 1 }))
    .filter((point) => point.note);
  const numbered = notes.length > 1;

  return (
    <>
      {/* A tall frame with the photo scaled past its sides, so she fills it; the photo's empty
          backdrop above her hair falls outside the top and her shoulders fade out at the sides. */}
      <div aria-hidden="true" className={`relative aspect-[4/5] ${className}`}>
        <div className="absolute bottom-0 left-1/2 aspect-[1122/1402] w-[115%] -translate-x-1/2">
          {/* Soft brand glow behind her. */}
          <div className="absolute inset-x-[14%] top-[22%] bottom-[14%] rounded-full bg-brand/20 blur-3xl" />

          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent),linear-gradient(to_right,transparent_4%,black_14%,black_86%,transparent_96%)] [mask-composite:intersect]">
            <Image
              src={receded}
              alt=""
              fill
              sizes="(min-width: 1024px) 620px, 370px"
              quality={90}
              className="object-contain"
            />
            {HAIR_FRAMES.map((frame, i) => (
              <Image
                key={i}
                src={frame}
                alt=""
                fill
                sizes="(min-width: 1024px) 620px, 370px"
                quality={90}
                className={`object-contain transition-opacity ${
                  restoresHair ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDuration: `${restoresHair ? 550 : 400}ms`,
                  transitionTimingFunction: "cubic-bezier(0.45, 0, 0.55, 1)",
                  transitionDelay: `${
                    restoresHair
                      ? 150 + i * HAIR_STEP_MS
                      : (HAIR_FRAMES.length - 1 - i) * 110
                  }ms`,
                }}
              />
            ))}
            {BEFORE_LAYERS.map(({ fix, src }) => (
              <Image
                key={fix}
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 620px, 370px"
                quality={90}
                className={`object-contain transition-opacity ease-in-out ${
                  done.has(fix)
                    ? "opacity-0 duration-[1000ms]"
                    : "opacity-100 duration-500"
                }`}
              />
            ))}
            <Image
              src={portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 620px, 370px"
              quality={90}
              className={`object-contain transition-opacity ease-in-out ${
                rejuvenates
                  ? "opacity-100 delay-150 duration-[1300ms]"
                  : "opacity-0 duration-700"
              }`}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: complete ? 0 : 1 }}
          >
            {points.map(({ x, y, label, note }, i) => (
              <span
                key={`${index}-${i}`}
                className="service-in absolute"
                style={{
                  left: `${x * 100}%`,
                  top: `${y * 100}%`,
                  animationDelay: `${markerDelay + order[i] * STAGGER_S}s`,
                  animationDuration: `${SYNC_S}s`,
                }}
              >
                <span className="hero-marker" data-active="true" />
                {note && numbered && (
                  <span className="absolute top-2.5 left-2.5 flex size-4 items-center justify-center rounded-full bg-foreground text-[9px] font-medium text-white lg:hidden">
                    {notes.findIndex((item) => item.number === i + 1) + 1}
                  </span>
                )}
                {note && (
                  <MarkerTip
                    label={label}
                    note={note}
                    side={x < 0.5 ? "left" : "right"}
                    delay={markerDelay + order[i] * STAGGER_S}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol key={index} className="mt-3 space-y-2 lg:hidden">
        {notes.map(({ label, note, number }, i) => (
          <li
            key={number}
            className="service-in flex gap-3 rounded-2xl bg-pill/90 px-3.5 py-2.5 shadow-[0_6px_18px_rgba(45,70,75,0.12)]"
            style={{ animationDelay: `${0.2 + i * 0.12}s` }}
          >
            {numbered && (
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-white">
                {i + 1}
              </span>
            )}
            <span>
              <span className="block text-[11px] font-medium tracking-[0.18em] text-brand-deep uppercase">
                {label}
              </span>
              <span className="mt-0.5 block text-sm leading-snug text-foreground">
                {note}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
