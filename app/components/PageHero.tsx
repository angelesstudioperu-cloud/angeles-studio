/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { NativeLink as Link } from './NativeLink';
import type { ReactNode } from 'react';
import { BrandWings } from './BrandLogo';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image?: { src: string; alt: string; width: number; height: number };
  caption?: { index: string; text: ReactNode };
  actions?: ReactNode;
  breadcrumb: string;
  visual?: ReactNode;
  className?: string;
  showEmblem?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  caption,
  actions,
  breadcrumb,
  visual,
  className = '',
  showEmblem = true,
}: PageHeroProps) {
  const hasVisual = Boolean(image || visual);

  return (
    <section className={`page-hero${hasVisual ? '' : ' page-hero-plain'}${className ? ` ${className}` : ''}`}>
      <div className="page-hero-copy">
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{breadcrumb}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-intro">{intro}</p>
        {actions && <div className="hero-actions">{actions}</div>}
      </div>

      {!hasVisual && showEmblem && (
        <span className="page-hero-emblem" data-reveal="off" aria-hidden="true">
          <BrandWings />
        </span>
      )}

      {visual}

      {image && (
        <div className="page-hero-visual hero-photo">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" />
          {caption && (
            <div className="hero-caption">
              <span>{caption.index}</span>
              <p>{caption.text}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
