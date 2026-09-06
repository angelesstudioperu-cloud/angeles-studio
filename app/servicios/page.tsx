import Link from 'next/link';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { PriceTable, RemovalTable } from '../components/PriceTable';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';
import { categories, categoryContent } from '../content/services';

export const metadata = {
  title: 'Servicios y precios',
  description:
    'Lista de precios de Ángeles Nails Salon: esmaltado en gel desde S/ 30, uñas acrílicas y polygel desde S/ 50, pedicure spa desde S/ 40, lifting de pestañas desde S/ 35 y diseño de cejas desde S/ 15.',
};

const notes = [
  ['Precios «desde»', 'Cubren el servicio estándar. El diseño, el largo, la pedrería o el tiempo técnico adicional pueden ajustarlo, y siempre te lo confirmamos antes de empezar.'],
  ['Retiros aparte', 'Si llegas con un trabajo anterior, el retiro se cobra por separado. Lo encuentras al final de esta página.'],
  ['Con cita previa', `Reservamos por WhatsApp al ${business.whatsappDisplay} para darte el tiempo completo que tu servicio necesita.`],
];

export default function ServicesPage() {
  return (
    <main className="subpage subpage-servicios">
      <MotionEffects />
      <a className="skip-link" href="#lista">Saltar a la lista de precios</a>
      <SiteHeader current="/servicios" />

      <PageHero
        breadcrumb="Servicios"
        eyebrow="Lista de precios"
        title={<>Todo lo que hacemos,<br /><em>con su precio.</em></>}
        intro="Manos, pies y mirada. Sin letra chica: acá está la carta completa tal como la trabajamos en el salón."
        image={{ src: '/images/servicio-manos.webp', alt: 'Manicure nude con nail art delicado', width: 1400, height: 937 }}
        caption={{ index: '01', text: <>Esmaltado en gel<br />desde S/ 30.</> }}
        actions={
          <>
            <Link className="button button-primary" href="/reservar">Reservar cita</Link>
            <a className="text-link" href="#retiros">Ver retiros <span aria-hidden="true">↗</span></a>
          </>
        }
      />

      <nav className="anchor-nav" aria-label="Categorías de servicio">
        {categories.map((category) => (
          <a key={category} href={`#${category}`}>{categoryContent[category].label}</a>
        ))}
        <a href="#retiros">Retiros</a>
      </nav>

      <section className="price-sheet" id="lista">
        {categories.map((category, index) => (
          <PriceTable key={category} category={category} index={index + 1} />
        ))}
      </section>

      <div id="retiros">
        <RemovalTable />
      </div>

      <section className="notes-band" aria-label="Cómo leer esta lista">
        {notes.map(([title, copy]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">¿Lista?</p>
          <h2>Elegimos juntas<br />lo que te queda mejor.</h2>
          <p>Si no sabes qué técnica pedir, escríbenos y te orientamos según la condición de tu uña y el mantenimiento que puedas darle.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href="/reservar">Solicitar cita</Link>
          <Link className="text-link" href="/galeria">Ver la galería <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
