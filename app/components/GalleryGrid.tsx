'use client';

/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { useCallback, useEffect, useState } from 'react';
import { gallery } from '../content/gallery';
import { categoryContent } from '../content/services';

/** Galería con vista ampliada: se toca una foto y se abre a pantalla. */
export function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % gallery.length));
      if (event.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    }
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  const active = open === null ? null : gallery[open];

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
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt={active.alt} width={active.width} height={active.height} />
            <figcaption>
              <span>{categoryContent[active.tag].label}</span>
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
