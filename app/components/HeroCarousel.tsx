'use client';

/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

type Slide = {
  id: string;
  eyebrow: string;
  title: [string, string];
  copy: string;
  cta: { label: string; href: string };
  image: { src: string; width: number; height: number; alt: string };
  caption: string;
};

const slides: Slide[] = [
  {
    id: 'detalles',
    eyebrow: 'Nail salon · Los Olivos, Lima',
    title: ['Pequeños detalles.', 'Gran presencia.'],
    copy: 'Uñas, pedicure spa y diseño de mirada con técnica y sin prisa. Atendemos con cita previa de lunes a sábado, de 10 a.m. a 8:30 p.m.',
    cta: { label: 'Reservar mi cita', href: '/reservar' },
    image: { src: '/images/angeles-nails-hero.webp', width: 1536, height: 1024, alt: 'Manicure en proceso en Ángeles Nails Salon' },
    caption: 'Precisión de cerca.',
  },
  {
    id: 'manos',
    eyebrow: 'Manos · desde S/ 30',
    title: ['Esmaltado en gel', 'que dura semanas.'],
    copy: 'Preparación cuidadosa, forma elegida contigo y color sellado en cabina. Y si quieres largo, tenemos acrílico, polygel, rubber, builder y soft gel.',
    cta: { label: 'Ver servicios de manos', href: '/servicios#manos' },
    image: { src: '/images/servicio-manos.webp', width: 1400, height: 937, alt: 'Manicure nude con nail art delicado' },
    caption: 'Manicure de autor.',
  },
  {
    id: 'mirada',
    eyebrow: 'Mirada y cejas · desde S/ 15',
    title: ['Una mirada abierta,', 'sin exagerar.'],
    copy: 'Lifting de pestañas, laminado de cejas, henna y depilación. Respetamos tu forma natural y sumamos definición.',
    cta: { label: 'Ver diseño de mirada', href: '/servicios#mirada' },
    image: { src: '/images/servicio-mirada.webp', width: 1400, height: 934, alt: 'Especialista trabajando el lifting de pestañas de una clienta' },
    caption: 'Lifting desde S/ 35.',
  },
  {
    id: 'pies',
    eyebrow: 'Pies · desde S/ 20',
    title: ['Pedicure spa', 'con calma.'],
    copy: 'Limpieza completa, cuidado de cutícula y esmaltado en gel. También hacemos acripie para un acabado que aguanta semanas.',
    cta: { label: 'Ver servicios de pies', href: '/servicios#pies' },
    image: { src: '/images/studio-atencion.webp', width: 1400, height: 933, alt: 'Especialista realizando un pedicure spa a una clienta' },
    caption: 'Sin apuro.',
  },
];

const INTERVAL = 6500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, go]);

  // Flechas del teclado cuando el carrusel tiene el foco dentro.
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
  }

  const active = slides[index];

  return (
    <div
      className="hero-carousel"
      ref={regionRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Servicios destacados de Ángeles Nails Salon"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-grid">
        <div className="hero-copy" key={active.id}>
          <p className="eyebrow">{active.eyebrow}</p>
          <h1>
            {active.title[0]}
            <br />
            <em>{active.title[1]}</em>
          </h1>
          <p className="hero-intro">{active.copy}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={active.cta.href}>
              {active.cta.label}
            </Link>
            <Link className="text-link" href="/servicios">
              Ver precios <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="hero-visual hero-photo">
          {slides.map((slide, slideIndex) => (
            <img
              key={slide.id}
              className={slideIndex === index ? 'is-active' : undefined}
              src={slide.image.src}
              alt={slideIndex === index ? slide.image.alt : ''}
              width={slide.image.width}
              height={slide.image.height}
              aria-hidden={slideIndex === index ? undefined : true}
              fetchPriority={slideIndex === 0 ? 'high' : 'low'}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="hero-caption">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{active.caption}</p>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button type="button" className="hero-arrow" onClick={() => go(index - 1)} aria-label="Servicio anterior">
          <span aria-hidden="true">←</span>
        </button>
        <div className="hero-dots" role="tablist" aria-label="Elegir servicio destacado">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={slide.eyebrow}
              className={slideIndex === index ? 'is-active' : undefined}
              onClick={() => go(slideIndex)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button type="button" className="hero-arrow" onClick={() => go(index + 1)} aria-label="Siguiente servicio">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
