'use client';

import Link from 'next/link';
import { useMemo, useState, type KeyboardEvent } from 'react';
import { categories, categoryContent, formatDuration, formatPrice, servicesByCategory, type ServiceCategory } from '../content/services';

type Finish = 'natural' | 'definido' | 'duradero';

const finishes: Finish[] = ['natural', 'definido', 'duradero'];

const recommendations: Record<ServiceCategory, Record<Finish, string>> = {
  manos: { natural: 'Esmaltado en gel', definido: 'Uñas soft gel', duradero: 'Uñas acrílicas' },
  pies: { natural: 'Solo limpieza', definido: 'Pedicure spa en gel', duradero: 'Acripie' },
  mirada: { natural: 'Laminado de cejas', definido: 'Lifting de pestañas', duradero: 'Pigmentación con henna' },
};

export function ServiceExplorer() {
  const idPrefix = 'studio-services';
  const [category, setCategory] = useState<ServiceCategory>('manos');
  const [finish, setFinish] = useState<Finish>('natural');
  const menu = categoryContent[category];
  const visibleServices = servicesByCategory(category);
  const recommendation = useMemo(() => recommendations[category][finish], [category, finish]);
  const panelId = `${idPrefix}-service-panel`;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, current: ServiceCategory) {
    const currentIndex = categories.indexOf(current);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % categories.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = categories.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextCategory = categories[nextIndex];
    setCategory(nextCategory);
    document.getElementById(`${idPrefix}-tab-${nextCategory}`)?.focus();
  }

  return (
    <section className="service-explorer" aria-labelledby="explorer-title">
      <div className="explorer-heading">
        <p className="eyebrow">Explora a tu manera</p>
        <h2 id="explorer-title">
          Elige el detalle
          <br />
          que quieres elevar.
        </h2>
      </div>

      <div className="explorer-shell">
        <div className="explorer-tabs" role="tablist" aria-label="Categorías de servicio">
          {categories.map((key) => (
            <button
              id={`${idPrefix}-tab-${key}`}
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
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div className="explorer-panel" id={panelId} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${category}`} tabIndex={0}>
          <div className="panel-content" key={category}>
            <p>{menu.intro}</p>
            <div className="mini-service-grid">
              {visibleServices.map((service) => (
                <article key={service.slug}>
                  <h3>{service.shortName ?? service.name}</h3>
                  <p>{service.note}</p>
                  <strong>
                    {formatPrice(service.priceFrom)}
                    <small>{formatDuration(service.durationMinutes)}</small>
                  </strong>
                </article>
              ))}
            </div>
            <Link className="panel-link" href="/servicios">
              Ver la lista de precios completa <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="finder">
        <div>
          <p className="eyebrow">Tu match Ángeles</p>
          <h3>¿Qué resultado te representa hoy?</h3>
        </div>
        <fieldset className="finder-options">
          <legend>Estilo de resultado</legend>
          {finishes.map((option) => (
            <button key={option} type="button" aria-pressed={finish === option} onClick={() => setFinish(option)}>
              {option}
            </button>
          ))}
        </fieldset>
        <div className="finder-result" role="status" aria-live="polite">
          <span>Te sugerimos</span>
          <strong key={`${category}-${finish}`}>{recommendation}</strong>
          <Link href="/reservar">
            Reservar este servicio <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
