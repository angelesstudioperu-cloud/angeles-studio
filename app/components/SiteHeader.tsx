import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { business } from '../content/business';

/** `compact` marca los cuatro enlaces que sobreviven en móvil. */
export const navLinks = [
  { href: '/servicios', label: 'Servicios', compact: true },
  { href: '/galeria', label: 'Galería', compact: true },
  { href: '/nosotros', label: 'El studio', compact: false },
  { href: '/contacto', label: 'Ubicación', compact: true },
] as const;

export type NavHref = (typeof navLinks)[number]['href'] | '/' | '/reservar';

export function SiteHeader({ current, tone = 'light' }: { current?: NavHref; tone?: 'light' | 'dark' }) {
  return (
    <header className={`site-header site-header-${tone}`} role="banner">
      <Link className="brand" href="/" aria-label={`${business.name}, inicio`}>
        <BrandLogo />
      </Link>

      <nav className="site-nav" aria-label="Navegación principal">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className={link.compact ? undefined : 'nav-wide-only'}
            href={link.href}
            aria-current={current === link.href ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link className="nav-cta" href="/reservar" aria-current={current === '/reservar' ? 'page' : undefined}>
          Reservar
        </Link>
      </nav>
    </header>
  );
}
