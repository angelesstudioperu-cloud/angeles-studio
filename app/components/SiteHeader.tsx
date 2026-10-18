'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { NativeLink as Link } from './NativeLink';
import { AnimatedHomeLink } from './AnimatedHomeLink';
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
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimer = useRef<number | null>(null);

  useEffect(() => {
    function resetAfterHistoryRestore(event: PageTransitionEvent) {
      if (event.persisted) setIsNavigating(false);
    }
    window.addEventListener('pageshow', resetAfterHistoryRestore);
    return () => {
      if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
      window.removeEventListener('pageshow', resetAfterHistoryRestore);
    };
  }, []);

  function handleNavigation(event: MouseEvent<HTMLElement>) {
    // El logo conserva su propio vuelo. Solo extendemos ese gesto al menú.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = event.target;
    const link = target instanceof Element ? target.closest<HTMLAnchorElement>('.site-nav a') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href);
    if (destination.origin !== window.location.origin) return;

    event.preventDefault();
    if (navigationTimer.current !== null) return;
    setIsNavigating(true);
    navigationTimer.current = window.setTimeout(() => {
      navigationTimer.current = null;
      window.location.assign(destination.href);
    }, 500);
  }

  return (
    <header className={`site-header site-header-${tone}${isNavigating ? ' is-navigating' : ''}`} role="banner" onClick={handleNavigation}>
      <AnimatedHomeLink ariaLabel={`${business.name}, inicio`}>
        <BrandLogo />
      </AnimatedHomeLink>

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
        <Link className="nav-cta button-flow" href="/reservar" aria-current={current === '/reservar' ? 'page' : undefined}>
          Reservar
        </Link>
      </nav>
    </header>
  );
}
