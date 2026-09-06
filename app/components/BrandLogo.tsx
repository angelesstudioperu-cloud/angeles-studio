type BrandLogoProps = {
  /** `full` incluye el lettering; `mark` solo el ala. */
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/** El ala de Ángeles: tres plumas que nacen del mismo punto y el anillo de la marca. */
export function BrandWing({ className }: { className?: string }) {
  return (
    <svg className={`brand-wing ${className ?? ''}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M76 78 C50 60 22 42 26 12 C44 42 62 60 76 78 Z" />
        <path d="M76 78 C48 72 20 60 10 34 C24 62 46 72 76 78 Z" />
        <path d="M76 78 C52 78 28 74 12 66 C34 84 56 88 76 78 Z" />
        <circle cx="80" cy="82" r="4.8" />
      </g>
    </svg>
  );
}

export function BrandLogo({ variant = 'full', size = 'md', className = '' }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo-${size} ${className}`}>
      <BrandWing />
      {variant === 'full' && (
        <span className="brand-lettering">
          <span className="brand-name">Angeles</span>
          <span className="brand-sub">Nails Salon</span>
        </span>
      )}
    </span>
  );
}
