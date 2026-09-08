'use client';

/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery } from '../content/gallery';
import { categoryContent } from '../content/services';

/** Galería con vista ampliada: se toca una foto y se abre a pantalla. */
const SWIPE_THRESHOLD = 45;

export function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((step: number) => {
    setOpen((i) => (i === null ? i : (i + step + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    }
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, go]);

  const active = open === null ? null : gallery[open];
  const position = open === null ? 0 : open + 1;

  return (
    <>
      <section className="gallery-grid" id="galeria" aria-label="Galería de trabajos">
        {gallery.map((item, index) => (
          <button
            type="button"
            key={item.src}
            className="gallery-item"
            onClick={() => setOpen(index)}
            aria-label={`Ampliar: ${item.caption}`}
          >
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading={index < 3 ? 'eager' : 'lazy'} />
            <span className="gallery-item-tag">{categoryContent[item.tag].label}</span>
          </button>
        ))}
      </section>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.caption} onClick={close}>
          <button type="button" className="lightbox-close" onClick={close} aria-label="Cerrar">
            ✕
          </button>
          {/* En celular se pasa con el dedo; el botón solo aparece con puntero. */}
          <button type="button" className="lightbox-step lightbox-prev" onClick={(event) => { event.stopPropagation(); go(-1); }} aria-label="Foto anterior">
            ‹
          </button>
          <figure
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => { touchX.current = event.changedTouches[0].clientX; }}
            onTouchEnd={(event) => {
              const start = touchX.current;
              if (start === null) return;
              const delta = event.changedTouches[0].clientX - start;
              touchX.current = null;
              if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
            }}
          >
            <img src={active.src} alt={active.alt} width={active.width} height={active.height} />
            <figcaption>
              <span>{categoryContent[active.tag].label}</span>
              {active.caption}
              <b>{position} / {gallery.length}</b>
            </figcaption>
          </figure>
          <button type="button" className="lightbox-step lightbox-next" onClick={(event) => { event.stopPropagation(); go(1); }} aria-label="Foto siguiente">
            ›
          </button>
        </div>
      )}
    </>
  );
}
