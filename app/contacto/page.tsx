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
  alternates: { canonical: '/contacto' },
  title: 'Contacto y ubicación',
  description:
    'Angeles Studio está en Los Olivos, Lima. Escríbenos por WhatsApp al +51 947 117 905 o por Instagram para coordinar tu cita.',
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

      <section className="contact-grid contact-grid-no-video" id="datos">
        <div className="contact-card">
          <p className="eyebrow">El dato completo</p>
          <dl>
            <div><dt>Horario</dt><dd>{business.hours.display}</dd></div>
            <div><dt>Días</dt><dd>{business.hours.days}</dd></div>
            <div><dt>Atención</dt><dd>{business.bookingPolicy}</dd></div>
            <div><dt>Distrito</dt><dd>{business.address.district}</dd></div>
            <div><dt>Piso</dt><dd>{business.address.unit}</dd></div>
            <div><dt>Referencia</dt><dd>{business.locationReference}</dd></div>
          </dl>
          <a className="button button-primary" href={business.mapsUrl} target="_blank" rel="noreferrer">
            Ver ubicación del local
          </a>
          <p className="contact-note">
            El enlace señala el edificio en Google Maps. Busca el letrero rosado Angeles Studio en el primer piso; si necesitas ayuda para llegar, escríbenos por WhatsApp.
          </p>
          {/* Cierra la tarjeta en escritorio, donde quedaba un bloque vacío bajo el botón. */}
          <BrandLogo size="lg" className="contact-card-logo" />
        </div>

      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Reserva</p>
          <h2>Prepara tu solicitud<br />de cita</h2>
          <p>Elige el servicio y tu fecha preferida. El formulario prepara un mensaje para que lo envíes por WhatsApp y coordinemos la disponibilidad.</p>
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
