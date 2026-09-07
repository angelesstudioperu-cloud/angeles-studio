'use client';

/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import Link from 'next/link';
import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { PriceTag } from './PriceTag';
import { SELECT_SERVICE_EVENT } from './bookingBridge';
import { categories, categoryContent, servicePath, servicesByCategory, type ServiceCategory } from '../content/services';

/**
 * Carta única del salón. El nombre lleva a la ficha del servicio; el precio
 * baja al formulario con ese servicio ya elegido.
 */
export function ServiceMenu() {
  const [category, setCategory] = useState<ServiceCategory>('manos');
  const panelId = 'carta-panel';
  const list = servicesByCategory(category);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, current: ServiceCategory) {
    const currentIndex = categories.indexOf(current);
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % categories.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = categories.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const next = categories[nextIndex];
    setCategory(next);
    document.getElementById(`carta-tab-${next}`)?.focus();
  }

  /** Avisa al formulario y baja hasta él. Sin JS, el href lleva a /reservar. */
  function pickService(event: MouseEvent, slug: string) {
    const form = document.getElementById('reservar');
    if (!form) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: { slug } }));
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="menu" id="servicios" aria-labelledby="menu-title">
      <div className="section-bar">
        <h2 id="menu-title">Catálogo</h2>
        <Link className="text-link" href="/servicios">
          Lista completa y retiros <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="menu-tabs" role="tablist" aria-label="Categorías de servicio">
        {categories.map((key) => (
          <button
            id={`carta-tab-${key}`}
            key={key}
            type="button"
            role="tab"
            tabIndex={category === key ? 0 : -1}
            aria-selected={category === key}
            aria-controls={panelId}
            onClick={() => setCategory(key)}
            onKeyDown={(event) => handleTabKey(event, key)}
          >
            {categoryContent[key].label}
          </button>
        ))}
      </div>

      <div className="menu-grid" id={panelId} role="tabpanel" aria-labelledby={`carta-tab-${category}`} key={category}>
        {list.map((service) => (
          <article className="menu-card" key={service.slug}>
            <Link className="menu-card-link" href={servicePath(service.slug)}>
              <span className="menu-card-media">
                <img
                  src={service.media.src}
                  alt={service.media.alt}
                  width={service.media.width}
                  height={service.media.height}
                  loading="lazy"
                />
              </span>
              <span className="menu-card-body">
                <strong>{service.shortName ?? service.name}</strong>
              </span>
            </Link>
            <a
              className="menu-card-cta"
              href={`/reservar?servicio=${service.slug}`}
              onClick={(event) => pickService(event, service.slug)}
              aria-label={`Reservar ${service.name}`}
            >
              <PriceTag service={service} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
