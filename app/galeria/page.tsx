/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { NativeLink as Link } from '../components/NativeLink';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';
import { gallery } from '../content/gallery';
import { categoryContent } from '../content/services';

export const metadata = {
  title: 'Galería',
  description:
    'Diseños de uñas, pedicure spa, lifting de pestañas y cejas trabajados en Ángeles Nails Salon, Los Olivos.',
};

export default function GalleryPage() {
  return (
    <main className="subpage subpage-galeria">
      <MotionEffects />
      <a className="skip-link" href="#galeria">Saltar a la galería</a>
      <SiteHeader current="/galeria" />

      <PageHero
        className="page-hero-wide"
        showEmblem={false}
        breadcrumb="Galería"
        eyebrow="The Ángeles edit"
        title={<>Detalles que <em>hablan por ti.</em></>}
        intro="Formas, colores y acabados que trabajamos en cabina. Guarda el que te represente y muéstranoslo el día de tu cita: es la manera más rápida de que salga exactamente como lo imaginas."
        actions={
          <>
            <Link className="button button-primary" href="/reservar">Reservar cita</Link>
            <a className="text-link" href={business.social.instagram.url} target="_blank" rel="noreferrer">
              Ver más en Instagram <span aria-hidden="true">↗</span>
            </a>
          </>
        }
      />

      <section className="gallery-grid" id="galeria" aria-label="Galería de trabajos">
        {gallery.map((item, index) => (
          <figure key={item.src} className="gallery-item">
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading={index < 2 ? 'eager' : 'lazy'} />
            <figcaption>
              <span>{categoryContent[item.tag].label}</span>
              <p>{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <p className="gallery-disclaimer">
        Imágenes de referencia con licencia libre mientras publicamos nuestro propio material. Los trabajos reales
        del salón se publican a diario en {business.social.instagram.handle}.
      </p>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Tu turno</p>
          <h2>Traes la idea.<br />Nosotras la técnica.</h2>
          <p>Cuéntanos qué diseño te gustó y evaluamos juntas si conviene esmaltado, soft gel, polygel o acrílico según tu uña.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href="/reservar">Solicitar cita</Link>
          <Link className="text-link" href="/servicios">Ver precios <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
