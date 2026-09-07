import { NativeLink as Link } from '../components/NativeLink';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { PriceTable, RemovalTable } from '../components/PriceTable';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';
import { categories, categoryContent, removals, servicesByCategory } from '../content/services';

export const metadata = {
  title: 'Servicios y precios',
  description:
    'Lista de precios de Ángeles Nails Salon: esmaltado en gel S/ 30, uñas acrílicas y polygel S/ 50, pedicure spa S/ 40, lifting de pestañas S/ 35 y diseño de cejas S/ 15.',
};

const notes = [
  ['Precios claros', 'El monto mostrado cubre el servicio estándar. Si agregas diseño, largo, pedrería o tiempo técnico adicional, siempre te confirmamos el total antes de empezar.'],
  ['Retiros aparte', 'Si llegas con un trabajo anterior, el retiro se cobra por separado. Lo encuentras al final de esta página.'],
  ['Con cita previa', `Reservamos por WhatsApp al ${business.whatsappDisplay}. La cita se separa con un adelanto de S/ ${business.bookingDeposit}, que se descuenta del total.`],
];

export default function ServicesPage() {
  return (
    <main className="subpage subpage-servicios">
      <MotionEffects />
      <a className="skip-link" href="#lista">Saltar a la lista de precios</a>
      <SiteHeader current="/servicios" />

      <PageHero
        className="page-hero-wide"
        showEmblem={false}
        breadcrumb="Servicios"
        eyebrow="Descubre todo"
        title={<>Lo que tenemos <em>para ti.</em></>}
        intro="Manos, pies y mirada. Sin letra chica: acá está la carta completa tal como la trabajamos en el salón."
      />

      <nav className="anchor-nav services-anchor-nav" aria-label="Categorías de servicio">
        {categories.map((category) => (
          <a key={category} href={`#${category}`}>
            <strong>{categoryContent[category].label}</strong>
            <small>{servicesByCategory(category).length} servicios</small>
            <span className="service-anchor-go" aria-hidden="true">↘</span>
          </a>
        ))}
        <a href="#retiros">
          <strong>Retiros</strong>
          <small>{removals.length} opciones</small>
          <span className="service-anchor-go" aria-hidden="true">↘</span>
        </a>
      </nav>

      <section className="price-sheet" id="lista">
        {categories.map((category) => (
          <PriceTable key={category} category={category} />
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
