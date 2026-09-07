type BrandLogoProps = {
  /** `full` incluye el lettering; `mark` solo las alas. */
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const wing = (
  <>
    <path d="M10.5 24.8 C11 38, 13 52, 19 63 C27 77, 42 92, 54.8 102 C57.6 94, 57 84, 54 75 C48 63, 30 42, 10.5 24.8 Z" />
    <path d="M7.2 50.8 C8.5 58, 12 66, 18 74 C26 84, 38 95, 52 100 C53.5 94, 52 86, 47 78 C39 68, 24 57, 7.2 50.8 Z" />
    <path d="M16.5 79.3 C19 86, 26 93, 36 97.5 C41 99.5, 46 100.2, 50 99.5 C47 96, 41 92.5, 33 88.5 C26 84.5, 20 81, 16.5 79.3 Z" />
    <path d="M39 67.5 C45 73, 51 81, 55 89" />
    <path d="M40.5 85 C44.5 88, 48.5 91, 51.5 93.5" />
  </>
);

/** Las alas de Ángeles: tres plumas por lado, en espejo. */
export function BrandWings({ className }: { className?: string }) {
  return (
    <svg className={`brand-wings ${className ?? ''}`} viewBox="4 21 116 85" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <g>{wing}</g>
        <g transform="translate(124,0) scale(-1,1)">{wing}</g>
      </g>
    </svg>
  );
}

export function BrandLogo({ variant = 'full', size = 'md', className = '' }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo-${size} ${className}`}>
      <BrandWings />
      {variant === 'full' && (
        <span className="brand-lettering">
          <span className="brand-name">Angeles</span>
          <span className="brand-sub">Nails Salon</span>
        </span>
      )}
    </span>
  );
}
