export type SocialNetwork = 'instagram' | 'tiktok';

/** Glifos de marca simplificados; heredan el color del contenedor. */
export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  if (network === 'tiktok') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.5 3c.4 2.05 1.72 3.44 3.6 3.63v2.62c-1.3.09-2.5-.29-3.6-1.02v5.9c0 3.4-2.63 5.87-5.9 5.87S4.7 17.53 4.7 14.13c0-3.53 3.02-6.1 6.35-5.65v2.83a3.1 3.1 0 1 0 2.2 2.96V3h3.25Z"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5.4" />
        <circle cx="12" cy="12" r="4.1" />
      </g>
      <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
    </svg>
  );
}
