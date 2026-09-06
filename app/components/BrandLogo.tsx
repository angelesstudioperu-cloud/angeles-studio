type BrandLogoProps = {
  /** `full` incluye el lettering; `mark` solo las alas. */
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const wing = (
  <>
    <path d="M2 98 C1.9 56 19.9 24.4 56 3 C56.1 45 38.1 76.6 2 98 Z" />
    <path d="M2 98 C10.4 64.4 31 42.4 64 32 C55.6 65.6 35 87.6 2 98 Z" />
    <path d="M2 98 C12.7 75 30.7 64.4 56 66 C45.3 89 27.3 99.6 2 98 Z" />
    <path d="M28 72 C23 83 15 90 6 95" />
  </>
);

/** Las alas de Ángeles: tres plumas por lado, en espejo. */
export function BrandWings({ className }: { className?: string }) {
  return (
    <svg className={`brand-wings ${className ?? ''}`} viewBox="0 0 140 110" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(74,5)">{wing}</g>
        <g transform="translate(66,5) scale(-1,1)">{wing}</g>
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
