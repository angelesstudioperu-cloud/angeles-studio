/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds locales y de Workers; estos assets ya vienen dimensionados en WebP. */
import { NativeLink as Link } from './components/NativeLink';
import { BookingForm } from './components/BookingForm';
import { HeroCarousel } from './components/HeroCarousel';
import { LocationMap } from './components/LocationMap';
import { MotionEffects } from './components/MotionEffects';
import { ServiceMenu } from './components/ServiceMenu';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { SocialIcon } from './components/SocialIcon';
import { VideoShowcase } from './components/VideoShowcase';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { business, whatsappLink } from './content/business';
import { gallery } from './content/gallery';

const facts = [
  { value: 'Desde S/ 30', label: 'Esmaltado en gel' },
  { value: business.hours.daysShort, label: business.hours.display },
  { value: business.address.district, label: `${business.address.street} · ${business.address.unit}` },
  { value: 'Cita previa', label: 'Reserva por WhatsApp' },
];

const galleryPreview = gallery.slice(0, 6);

export default function Home() {
  return (
    <main>
      <MotionEffects />
      <a className="skip-link" href="#servicios">Saltar al contenido</a>

      <section className="hero" id="inicio">
        <SiteHeader current="/" />
        <HeroCarousel />
      </section>

      {/* Los cuatro datos que una clienta busca antes de escribir. */}
      <section className="facts" aria-label="Datos del salón">
        {facts.map((fact) => (
          <article key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </article>
        ))}
      </section>

      <ServiceMenu />

      <section className="booking" id="reservar">
        <div className="booking-heading">
          <h2 className="booking-title">Hagamos espacio <em>para ti.</em></h2>
          <p className="booking-note">
            Separas tu cita con un adelanto de <strong>S/ {business.bookingDeposit}</strong>, que se
            descuenta del total del servicio.
          </p>
          <dl className="booking-meta">
            <div>
              <dt>Atención</dt>
              <dd>{business.hours.days}, {business.hours.display}</dd>
            </div>
            <div>
              <dt>Respuesta</dt>
              <dd>Te confirmamos disponibilidad el mismo día</dd>
            </div>
          </dl>
          <a className="booking-direct" href={whatsappLink(`Hola, ${business.name}. Quisiera consultar por una cita.`)} target="_blank" rel="noreferrer">
            ¿Prefieres escribirnos directo? {business.whatsappDisplay} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="booking-card">
          <p className="booking-card-title">Solicita tu cita</p>
          <BookingForm />
        </div>
      </section>

      <VideoShowcase />

      <section className="edit" aria-labelledby="edit-title">
        <div className="section-bar">
          <div>
            <p className="eyebrow">The Ángeles edit</p>
            <h2 id="edit-title">Diseños y resultados.</h2>
            <p className="section-lead">
              Formas, colores y acabados que trabajamos en cabina. Guarda el que te represente y muéstranoslo
              el día de tu cita.
            </p>
          </div>
          <Link className="text-link" href="/galeria">
            Ver la galería <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="edit-grid">
          {galleryPreview.map((item) => (
            <Link className="edit-tile" href="/galeria" key={item.src} aria-label={item.caption}>
              <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
            </Link>
          ))}
        </div>
      </section>

      <section className="social-proof" aria-labelledby="social-title">
        <div className="social-heading">
          <p className="eyebrow">Síguenos</p>
          <h2 id="social-title">Cada semana,<br />trabajos nuevos.</h2>
          <p className="section-lead">
            Publicamos diseños, procesos y la disponibilidad de la semana. Es la forma más rápida de ver
            resultados reales antes de reservar.
          </p>
        </div>
        <div className="social-grid">
          <a className="social-card" href={business.social.instagram.url} target="_blank" rel="noreferrer">
            <SocialIcon network="instagram" className="social-mark" />
            <span className="social-text">
              <span className="social-label">Instagram</span>
              <strong>{business.social.instagram.handle}</strong>
            </span>
            <span className="social-go" aria-hidden="true">↗</span>
          </a>
          <a className="social-card" href={business.social.tiktok.url} target="_blank" rel="noreferrer">
            <SocialIcon network="tiktok" className="social-mark" />
            <span className="social-text">
              <span className="social-label">TikTok</span>
              <strong>{business.social.tiktok.handle}</strong>
            </span>
            <span className="social-go" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="visit" id="contacto">
        <div className="visit-card">
          <p className="eyebrow">Visítanos</p>
          <h2>Tu próxima pausa<br />empieza aquí.</h2>
          <ul className="visit-facts">
            <li><span>Dirección</span><b>{business.address.street} · {business.address.unit}</b></li>
            <li><span>Horario</span><b>{business.hours.daysShort} · {business.hours.display}</b></li>
            <li><span>WhatsApp</span><b>{business.whatsappDisplay}</b></li>
          </ul>
          <Link className="visit-cta" href="/contacto">
            <span className="visit-cta-label">Cómo llegar</span>
            <span className="visit-cta-sub">{business.address.district}, Lima</span>
            <span className="visit-cta-go" aria-hidden="true">↗</span>
          </Link>
        </div>
        <LocationMap />
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
