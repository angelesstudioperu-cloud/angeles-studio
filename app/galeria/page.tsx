import { NativeLink as Link } from '../components/NativeLink';
import { GalleryGrid } from '../components/GalleryGrid';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';

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
        title={<>Detalles que <em>hablan por ti</em></>}
      />

      <GalleryGrid />

      <div className="gallery-after">
        <a className="button button-primary" href={business.social.instagram.url} target="_blank" rel="noreferrer">
          Ver más en Instagram
        </a>
      </div>

      <p className="gallery-disclaimer">
        Imágenes de referencia con licencia libre mientras publicamos nuestro propio material. Los trabajos reales
        del salón se publican a diario en {business.social.instagram.handle}.
      </p>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Tu turno</p>
          <h2>Traes la idea,<br />nosotras la técnica</h2>
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
