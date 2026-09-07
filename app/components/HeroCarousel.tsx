'use client';

/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { NativeLink as Link } from './NativeLink';
import { useCallback, useEffect, useRef, useState } from 'react';

type Slide = {
  id: string;
  eyebrow: string;
  title: [string, string];
  cta: { label: string; href: string };
  image: { src: string; width: number; height: number; alt: string };
};

const slides: Slide[] = [
  {
    id: 'detalles',
    eyebrow: 'Los Olivos, Lima',
    title: ['Pequeños detalles', 'Gran presencia'],
    cta: { label: 'Reservar', href: '/reservar' },
    image: { src: '/images/angeles-nails-hero.webp', width: 1536, height: 1024, alt: 'Manicure en proceso en Ángeles Nails Salon' },
  },
  {
    id: 'manos',
    eyebrow: 'Manos · S/ 30',
    title: ['Esmaltado en gel', 'que dura semanas'],
    cta: { label: 'Ver uñas', href: '/servicios#manos' },
    image: { src: '/images/servicio-manos.webp', width: 1400, height: 937, alt: 'Manicure nude con nail art delicado' },
  },
  {
    id: 'mirada',
    eyebrow: 'Mirada · S/ 15',
    title: ['Una mirada abierta,', 'sin exagerar'],
    cta: { label: 'Ver mirada', href: '/servicios#mirada' },
    image: { src: '/images/servicio-mirada.webp', width: 1400, height: 934, alt: 'Especialista trabajando el lifting de pestañas de una clienta' },
  },
  {
    id: 'pies',
    eyebrow: 'Pies · S/ 20',
    title: ['Pedicure spa', 'con calma'],
    cta: { label: 'Ver pies', href: '/servicios#pies' },
    image: { src: '/images/studio-atencion.webp', width: 1400, height: 933, alt: 'Especialista realizando un pedicure spa a una clienta' },
  },
];

const INTERVAL = 6000;
const SWIPE_THRESHOLD = 45;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, go]);

  // Se cambia de slide arrastrando: sin flechas ni puntos que delaten cuántas hay.
  function handlePointerDown(event: React.PointerEvent) {
    dragStart.current = event.clientX;
    setPaused(true);
  }

  function handlePointerUp(event: React.PointerEvent) {
    const start = dragStart.current;
    dragStart.current = null;
    setPaused(false);
    if (start === null) return;
    const delta = event.clientX - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    go(delta < 0 ? index + 1 : index - 1);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
  }

  const active = slides[index];

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Servicios destacados"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { dragStart.current = null; setPaused(false); }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* La foto y el texto comparten el lienzo editorial a sangre; el CSS
          adapta el encuadre y el velo de lectura a cada ancho. */}
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
            draggable={false}
            fetchPriority={slideIndex === 0 ? 'high' : 'low'}
            loading={slideIndex === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div className="hero-grid">
        <div className="hero-copy" key={active.id}>
          <div className="hero-copy-text">
            <p className="eyebrow">{active.eyebrow}</p>
            <h1>
              {active.title[0]}
              <br />
              <em>{active.title[1]}</em>
            </h1>
          </div>
          <Link className="button button-primary hero-cta" href={active.cta.href}>
            {active.cta.label}
          </Link>
        </div>
      </div>

    </div>
  );
}
