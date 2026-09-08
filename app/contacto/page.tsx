import { NativeLink as Link } from '../components/NativeLink';
import { BrandLogo } from '../components/BrandLogo';
import { LocationMap } from '../components/LocationMap';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business, whatsappLink } from '../content/business';

export const metadata = {
  title: 'Contacto y ubicación',
  description:
    'Ángeles Nails Salon está en Los Olivos, Lima. Escríbenos por WhatsApp al +51 947 117 905 o por Instagram para coordinar tu cita.',
};


export default function ContactPage() {
  return (
    <main className="subpage subpage-contacto">
      <MotionEffects />
      <a className="skip-link" href="#datos">Saltar a los datos del salón</a>
      <SiteHeader current="/contacto" />

      <PageHero
        className="page-hero-location"
        breadcrumb="Contacto"
        eyebrow="Cómo llegar"
        title={<>Estamos en<br /><em>Los Olivos</em></>}
        intro="Abrimos de lunes a sábado, de 10:00 a.m. a 8:30 p.m., siempre con cita previa para que nadie espere de más. Escríbenos por el canal que prefieras y coordinamos la hora que te acomode."
        visual={<LocationMap tone="peony" />}
        actions={
          <>
            <a className="button button-primary" href={whatsappLink(`Hola, ${business.name}. Quisiera reservar una cita.`)} target="_blank" rel="noreferrer">
              Escribir por WhatsApp
            </a>
            <a className="text-link" href={business.mapsUrl} target="_blank" rel="noreferrer">
              Abrir en Google Maps <span aria-hidden="true">↗</span>
            </a>
          </>
        }
      />

      <section className="contact-grid" id="datos">
        <div className="contact-card">
          <p className="eyebrow">El dato completo</p>
          <dl>
            <div><dt>Horario</dt><dd>{business.hours.display}</dd></div>
            <div><dt>Días</dt><dd>{business.hours.days}</dd></div>
            <div><dt>Atención</dt><dd>{business.bookingPolicy}</dd></div>
            <div><dt>Distrito</dt><dd>{business.address.district}</dd></div>
            <div><dt>Tienda</dt><dd>{business.address.unit}</dd></div>
            <div><dt>Referencia</dt><dd>{business.address.area}</dd></div>
          </dl>
          <a className="button button-primary" href={business.mapsUrl} target="_blank" rel="noreferrer">
            Ver ubicación exacta
          </a>
          <p className="contact-note">
            El enlace abre la ubicación registrada del salón en Google Maps, con la vista de calle de la puerta.
          </p>
          {/* Cierra la tarjeta en escritorio, donde quedaba un bloque vacío bajo el botón. */}
          <BrandLogo size="lg" className="contact-card-logo" />
        </div>

        {/* Reemplazar por <video controls playsInline> cuando llegue el recorrido grabado. */}
        <div className="contact-video">
          <p className="eyebrow">En video</p>
          <h2>Cómo llegar<br />hasta la puerta</h2>
          <div className="video-frame video-frame-portrait" role="img" aria-label="Espacio reservado para el video de cómo llegar al salón">
            <span className="video-frame-icon" aria-hidden="true">▶</span>
            <p>Cómo llegar al salón</p>
            <small>Próximamente</small>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Reserva</p>
          <h2>¿Prefieres dejarnos<br />tus datos?</h2>
          <p>Completa el formulario y te escribimos por WhatsApp para confirmar disponibilidad.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href="/reservar">Ir al formulario</Link>
          <Link className="text-link" href="/servicios">Ver precios <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
