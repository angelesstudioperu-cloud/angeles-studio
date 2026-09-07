/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { NativeLink as Link } from '../../components/NativeLink';
import { notFound } from 'next/navigation';
import { MotionEffects } from '../../components/MotionEffects';
import { SiteFooter } from '../../components/SiteFooter';
import { PriceTag } from '../../components/PriceTag';
import { SiteHeader } from '../../components/SiteHeader';
import { WhatsAppFloat } from '../../components/WhatsAppFloat';
import { business, whatsappLink } from '../../content/business';
import {
  categoryContent,
  formatDuration,
  formatFlatPrice,
  getService,
  relatedServices,
  removals,
  services,
  servicePath,
} from '../../content/services';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Servicio no encontrado' };
  return {
    title: service.name,
    description: `${service.note} ${formatFlatPrice(service.priceFrom)} en ${business.name}, Los Olivos.`,
    alternates: { canonical: servicePath(service.slug) },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = categoryContent[service.category];
  const related = relatedServices(service);
  const bookMessage = `Hola, ${business.name}. Quisiera reservar «${service.name}» (${formatFlatPrice(service.priceFrom)}).`;

  return (
    <main className="subpage subpage-servicio">
      <MotionEffects />
      <a className="skip-link" href="#detalle">Saltar al detalle del servicio</a>
      <SiteHeader current="/servicios" />

      <section className="service-hero">
        <div className="service-hero-copy">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/servicios">Servicios</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </nav>
          <p className="eyebrow">{category.label}</p>
          <h1>{service.name}</h1>
          <p className="service-hero-intro">{service.intro}</p>

          <dl className="service-facts">
            <div>
              <dt>Precio</dt>
              <dd><PriceTag service={service} /></dd>
            </div>
            <div>
              <dt>Duración</dt>
              <dd>{formatDuration(service.durationMinutes)}</dd>
            </div>
            <div>
              <dt>Atención</dt>
              <dd>{business.bookingPolicy}</dd>
            </div>
          </dl>

          <div className="hero-actions">
            <Link className="button button-primary" href={`/reservar?servicio=${service.slug}`}>
              Reservar este servicio
            </Link>
            <a className="text-link" href={whatsappLink(bookMessage)} target="_blank" rel="noreferrer">
              Preguntar por WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="service-hero-media hero-photo">
          <img
            src={service.media.src}
            alt={service.media.alt}
            width={service.media.width}
            height={service.media.height}
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="service-detail" id="detalle">
        <article className="service-panel">
          <h2>Para quién es</h2>
          <ul className="tick-list">
            {service.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="service-panel">
          <h2>Qué incluye</h2>
          <ol className="step-list">
            {service.includes.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ol>
        </article>

        <article className="service-panel">
          <h2>Cuidados después</h2>
          <ul className="tick-list">
            {service.care.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="service-video" aria-labelledby="video-title">
        <div className="service-video-copy">
          <p className="eyebrow">En video</p>
          <h2 id="video-title">Míralo en cabina.</h2>
          <p>
            Estamos grabando el proceso de cada servicio. Mientras tanto puedes ver trabajos reales en{' '}
            <a href={business.social.tiktok.url} target="_blank" rel="noreferrer">
              TikTok {business.social.tiktok.handle}
            </a>
            .
          </p>
        </div>
        {/* Reemplazar por <video src="..." controls poster="..."> cuando el salón entregue el material. */}
        <div className="video-slot" role="img" aria-label={`Espacio reservado para el video de ${service.name}`}>
          <span className="video-slot-icon" aria-hidden="true">▶</span>
          <p>Video de {service.name.toLowerCase()}</p>
          <small>Próximamente</small>
        </div>
      </section>

      <section className="service-faq" aria-labelledby="service-faq-title">
        <div>
          <p className="eyebrow">Antes de reservar</p>
          <h2 id="service-faq-title">Dudas frecuentes.</h2>
          <p className="service-faq-note">
            El retiro de un trabajo anterior se cobra aparte:{' '}
            {removals.map((removal, index) => (
              <span key={removal.slug}>
                {index > 0 ? ' · ' : ''}
                S/ {removal.price} {removal.name.toLowerCase()}
              </span>
            ))}
            .
          </p>
        </div>
        <div className="faq-list">
          {service.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">＋</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-services" aria-labelledby="related-title">
          <div className="related-heading">
            <p className="eyebrow">También en {category.label.toLowerCase()}</p>
            <h2 id="related-title">Te puede interesar.</h2>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link className="related-card" href={servicePath(item.slug)} key={item.slug}>
                <img src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} loading="lazy" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                  <PriceTag service={item} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="cta-band">
        <div>
          <p className="eyebrow">Reserva</p>
          <h2>
            {service.name}
            <br />
            <em>{formatFlatPrice(service.priceFrom)}.</em>
          </h2>
          <p>Escríbenos y coordinamos el día y la hora. Te confirmamos disponibilidad antes de que salgas de casa.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href={`/reservar?servicio=${service.slug}`}>
            Solicitar cita
          </Link>
          <Link className="text-link" href="/servicios">
            Ver todos los precios <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
