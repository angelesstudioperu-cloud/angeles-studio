import { NativeLink as Link } from '../components/NativeLink';
import { LocationMap } from '../components/LocationMap';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { addressLines, business, emailUrl, whatsappLink } from '../content/business';

export const metadata = {
  title: 'Contacto y ubicación',
  description:
    'Ángeles Nails Salon está en Los Olivos, Lima. Escríbenos por WhatsApp al +51 947 117 905 o por Instagram para coordinar tu cita.',
};

const channels = [
  {
    label: 'WhatsApp',
    value: business.whatsappDisplay,
    detail: 'El canal más rápido para reservar y consultar disponibilidad.',
    href: whatsappLink(`Hola, ${business.name}. Quisiera consultar por una cita.`),
  },
  {
    label: 'Instagram',
    value: business.social.instagram.handle,
    detail: 'Diseños, procesos y novedades del salón.',
    href: business.social.instagram.url,
  },
  {
    label: 'TikTok',
    value: business.social.tiktok.handle,
    detail: 'Videos de trabajos en cabina.',
    href: business.social.tiktok.url,
  },
  {
    label: 'Correo',
    value: business.email,
    detail: 'Para consultas más largas o coordinaciones formales.',
    href: emailUrl,
  },
];

export default function ContactPage() {
  return (
    <main className="subpage subpage-contacto">
      <MotionEffects />
      <a className="skip-link" href="#canales">Saltar a los canales de contacto</a>
      <SiteHeader current="/contacto" />

      <PageHero
        breadcrumb="Contacto"
        eyebrow="Cómo llegar"
        title={<>Estamos en<br /><em>Los Olivos.</em></>}
        intro="Abrimos de lunes a sábado, de 10:00 a.m. a 8:30 p.m., siempre con cita previa para que nadie espere de más. Escríbenos por el canal que prefieras y coordinamos la hora que te acomode."
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

      <section className="contact-grid" id="canales">
        <div className="contact-card">
          <p className="eyebrow">Dirección</p>
          <address>{addressLines.map((line) => <span key={line}>{line}</span>)}</address>
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
        </div>

        <div className="contact-channels">
          <p className="eyebrow">Canales</p>
          <h2>Escríbenos por donde te quede cómodo.</h2>
          <ul>
            {channels.map((channel) => (
              <li key={channel.label}>
                <a href={channel.href} target="_blank" rel="noreferrer">
                  <span className="channel-label">{channel.label}</span>
                  <strong>{channel.value}</strong>
                  <p>{channel.detail}</p>
                  <span className="social-go" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationMap tone="peony" />

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
