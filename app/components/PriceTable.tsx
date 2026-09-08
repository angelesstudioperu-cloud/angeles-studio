/* eslint-disable @next/next/no-img-element -- ver PageHero. */
import { NativeLink as Link } from './NativeLink';
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

/**
 * Misma lectura que la carta de la portada —foto y precio— pero con la banda
 * de color de cada categoría, que es lo que distingue a esta página.
 */
export function PriceTable({ category }: { category: ServiceCategory }) {
  const content = categoryContent[category];
  const list = servicesByCategory(category);

  return (
    <article className={`price-block price-block-${category}`} id={category}>
      <header className="price-block-head">
        <div className="price-block-title">
          <p className="eyebrow">{content.label}</p>
          <h2>{content.title}</h2>
        </div>
        <p className="price-block-intro">{content.intro}</p>
      </header>

      <div className="price-grid">
        {list.map((service) => (
          <article className="price-card" key={service.slug}>
            <Link className="price-card-link" href={servicePath(service.slug)}>
              <span className="price-card-media">
                <img
                  src={service.media.src}
                  alt={service.media.alt}
                  width={service.media.width}
                  height={service.media.height}
                  loading="lazy"
                />
              </span>
              <span className="price-card-body">
                <strong>{service.name}</strong>
                <small>{service.note}</small>
                <em>{formatDuration(service.durationMinutes)}</em>
              </span>
            </Link>
            <a
              className="price-card-cta"
              href={`/reservar?servicio=${service.slug}`}
              aria-label={`Reservar ${service.name}`}
            >
              <PriceTag service={service} />
            </a>
          </article>
        ))}
      </div>
    </article>
  );
}

export function RemovalTable() {
  return (
    <section className="removals" aria-labelledby="removals-title">
      <div className="removals-heading">
        <p className="eyebrow">Retiros</p>
        <h2 id="removals-title">Empezamos por dejar la uña sana</h2>
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
