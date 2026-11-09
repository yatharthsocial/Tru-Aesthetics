import Image from "next/image";
import { SERVICES } from "@/components/services";
import aged from "@/model-female-aged.webp";
import portrait from "@/model-female.webp";
import receded from "@/model-female-receded.webp";

/** A short frosted label beside a marker, opening away from the face. */
function MarkerTip({
  label,
  note,
  side,
}: {
  label?: string;
  note: string;
  side: "left" | "right";
}) {
  return (
    <span
      className={`absolute top-1/2 hidden -translate-y-1/2 items-center lg:flex ${
        side === "right" ? "left-3 flex-row" : "right-3 flex-row-reverse"
      }`}
    >
      <span className="tip-line h-px w-8 bg-brand-deep/60" />
      <span
        className={`tip-card w-[190px] rounded-2xl bg-pill/95 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(45,70,75,0.18)] backdrop-blur-sm ${
          side === "right" ? "text-left" : "text-right"
        }`}
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
 * She shows signs of ageing and a receded hairline at rest. Hovering Hair Transplant fills the
 * hairline back in; Anti Aging fades the ageing away.
 */
export default function ServiceFocus({
  index,
  engaged,
  className = "",
}: {
  index: number;
  /** Whether a visitor is on the service right now; before-and-after effects play only then. */
  engaged: boolean;
  className?: string;
}) {
  const service = SERVICES[index];
  // At rest she shows no markers and stays "before"; everything appears while a service is hovered.
  const points = engaged ? service.points : [];
  const rejuvenates = engaged && service.rejuvenates;
  const restoresHair = engaged && service.restoresHair;
  // Tooltips sit beside the markers on desktop; narrower screens list them under the face.
  const notes = points
    .map((point, i) => ({ ...point, number: i + 1 }))
    .filter((point) => point.note);
  const numbered = notes.length > 1;

  return (
    <>
      {/* A tall frame with the photo scaled past its sides, so she fills it; the photo's empty
          backdrop above her hair falls outside the top and her shoulders fade out at the sides. */}
      <div
        aria-hidden="true"
        className={`relative aspect-[4/5] ${className}`}
      >
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
            {/* The full hairline sits over the receded one and grows forward down the forehead
                while Hair Transplant is hovered (see .hair-grow in globals.css). */}
            <Image
              src={aged}
              alt=""
              fill
              sizes="(min-width: 1024px) 620px, 370px"
              quality={90}
              data-on={restoresHair}
              className="hair-grow object-contain"
            />
            <Image
              src={portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 620px, 370px"
              quality={90}
              className={`object-contain transition-opacity ease-in-out ${
                rejuvenates
                  ? "opacity-100 delay-300 duration-[2200ms]"
                  : "opacity-0 duration-700"
              }`}
            />
          </div>

          {points.map(({ x, y, label, note }, i) => (
            <span
              key={`${index}-${i}`}
              className="service-in absolute"
              style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
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
                />
              )}
            </span>
          ))}
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
