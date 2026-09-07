/* eslint-disable @next/next/no-img-element -- ver PageHero. */
import Link from 'next/link';
import { PriceTag } from './PriceTag';
import {
  categoryContent,
  formatDuration,
  formatFlatPrice,
  removals,
  servicePath,
  servicesByCategory,
  type ServiceCategory,
} from '../content/services';

export function PriceTable({ category, index }: { category: ServiceCategory; index: number }) {
  const content = categoryContent[category];
  const list = servicesByCategory(category);

  return (
    <article className="price-block" id={category}>
      <div className="price-block-media">
        <img src={content.image} alt={content.imageAlt} width={content.imageWidth} height={content.imageHeight} loading="lazy" />
        <span className="price-block-index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="price-block-body">
        <p className="eyebrow">{content.label}</p>
        <h2>{content.title}</h2>
        <p className="price-block-intro">{content.intro}</p>

        <ul className="price-list">
          {list.map((service) => (
            <li key={service.slug}>
              <Link className="price-row" href={servicePath(service.slug)}>
                <span className="price-row-main">
                  <strong>{service.name}</strong>
                  <span className="price-row-note">{service.note}</span>
                </span>
                <span className="price-row-meta">
                  <PriceTag service={service} />
                  <small>{formatDuration(service.durationMinutes)}</small>
                </span>
                <span className="price-row-go" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link className="text-link" href="/reservar">
          Reservar {content.label.toLowerCase()} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export function RemovalTable() {
  return (
    <section className="removals" aria-labelledby="removals-title">
      <div className="removals-heading">
        <p className="eyebrow">Retiros</p>
        <h2 id="removals-title">Empezamos por dejar la uña sana.</h2>
        <p>
          Si vienes con un trabajo anterior, el retiro se cobra aparte del servicio nuevo. Lo hacemos con lima y sin
          dañar tu uña natural.
        </p>
      </div>
      <ul className="removal-grid">
        {removals.map((removal) => (
          <li key={removal.slug}>
            <strong>{formatFlatPrice(removal.price)}</strong>
            <span>
              {removal.name}
              <small>{formatDuration(removal.durationMinutes)}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
