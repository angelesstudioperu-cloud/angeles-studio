import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { business } from '../content/business';

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/galeria', label: 'Galería' },
  { href: '/nosotros', label: 'El studio' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export type NavHref = (typeof navLinks)[number]['href'] | '/reservar';

export function SiteHeader({ current, tone = 'light' }: { current?: NavHref; tone?: 'light' | 'dark' }) {
  return (
    <header className={`site-header site-header-${tone}`} role="banner">
      <Link className="brand" href="/" aria-label={`${business.name}, inicio`}>
        <BrandLogo />
      </Link>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} aria-current={current === link.href ? 'page' : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="/reservar" aria-current={current === '/reservar' ? 'page' : undefined}>
        Reservar cita
      </Link>

      <details className="mobile-menu">
        <summary aria-label="Abrir navegación">Menú</summary>
        <nav aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={current === link.href ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
          <Link href="/reservar">Reservar</Link>
        </nav>
      </details>
    </header>
  );
}
