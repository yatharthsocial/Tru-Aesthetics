export type SocialLink = {
  network: "facebook" | "instagram" | "website";
  url: string;
};

const LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  website: "their website",
} as const;

function Icon({ network }: { network: SocialLink["network"] }) {
  if (network === "website")
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5Z" />
      </svg>
    );
  return network === "facebook" ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="currentColor"
    >
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.89v2.16H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Round icon links to a doctor's social profiles, opening in a new tab. */
export default function SocialLinks({
  name,
  links,
  className = "",
}: {
  name: string;
  links: SocialLink[];
  className?: string;
}) {
  if (links.length === 0) return null;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-ink-muted">Follow</span>
      <ul className="flex gap-2.5">
        {links.map(({ network, url }) => (
          <li key={network}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on ${LABELS[network]} (opens in a new tab)`}
              className="flex size-10 items-center justify-center rounded-full bg-pill text-brand-deep shadow-[0_6px_18px_rgba(45,70,75,0.12)] ring-1 ring-foreground/10 transition-colors duration-300 hover:bg-brand-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              <Icon network={network} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
