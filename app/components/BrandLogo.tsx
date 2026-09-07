import Image from 'next/image';

type BrandLogoProps = {
  /** `full` incluye el lettering; `mark` solo las alas. */
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/** Isotipo oficial de Ángeles, recortado únicamente por su área transparente. */
export function BrandWings({ className }: { className?: string }) {
  return (
    <Image
      className={`brand-wings ${className ?? ''}`}
      src="/brand/angeles-wings.png"
      alt=""
      width={760}
      height={540}
      unoptimized
      aria-hidden="true"
      draggable={false}
    />
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
