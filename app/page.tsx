/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds locales y de Workers; estos assets ya vienen dimensionados en WebP. */
import Link from 'next/link';
import { BookingForm } from './components/BookingForm';
import { MotionEffects } from './components/MotionEffects';
import { ServiceExplorer } from './components/ServiceExplorer';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { addressLines, business, emailUrl } from './content/business';
import { gallery } from './content/gallery';
import { featuredServices, formatPrice } from './content/services';

const steps = [
  { number: '01', title: 'Observamos', copy: 'Revisamos la condición de tus uñas, tus cejas o tus pestañas naturales, tu estilo y el mantenimiento que deseas.' },
  { number: '02', title: 'Diseñamos contigo', copy: 'Elegimos técnica, forma, largo, color o curvatura antes de comenzar; nada se decide a ciegas.' },
  { number: '03', title: 'Protegemos el resultado', copy: 'Terminamos con cuidados claros para que tu diseño se mantenga bonito y cómodo hasta el próximo retoque.' },
];

const faqs: [string, string][] = [
  ['¿Cómo sé qué técnica de uñas me conviene?', 'Evaluamos largo, flexibilidad y condición de tu uña natural. Si buscas algo discreto, el esmaltado en gel basta; si quieres largo y resistencia, te orientamos entre acrílico, polygel, builder gel, rubber o soft gel.'],
  ['¿El retiro está incluido en el precio?', 'No. Si llegas con un trabajo anterior, el retiro se cobra aparte: S/ 10 el esmaltado en gel, S/ 15 acrílicas o polygel y S/ 20 rubber, builder o soft gel.'],
  ['¿Por qué los precios dicen «desde»?', 'El precio base cubre el servicio estándar. El diseño, el largo, la pedrería y el tiempo técnico adicional pueden subirlo; siempre te lo confirmamos antes de empezar.'],
  ['¿Cómo reservo mi cita?', `Escríbenos por WhatsApp al ${business.whatsappDisplay} o por Instagram ${business.social.instagram.handle}. Validamos disponibilidad y recién ahí tu cita queda confirmada.`],
  ['¿Qué cuidados debo tener después?', 'En pestañas, evita agua, vapor y aceites durante las primeras 24 horas. En uñas, no las uses como herramienta y aplica aceite de cutícula a diario.'],
  ['¿Puedo atenderme si tengo irritación o una lesión?', 'No realizamos el servicio sobre piel, ojos o uñas con irritación, infección o lesión visible. Reprogramamos y te recomendamos evaluación profesional cuando corresponde.'],
];

const galleryPreview = gallery.slice(0, 3);

export default function Home() {
  return (
    <main>
      <MotionEffects />
      <a className="skip-link" href="#servicios">Saltar al contenido</a>

      <section className="hero" id="inicio">
        <SiteHeader current="/" />

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Nail salon · Los Olivos, Lima</p>
            <h1>Pequeños detalles.<br /><em>Gran presencia.</em></h1>
            <p className="hero-intro">
              Uñas, pedicure spa y diseño de mirada con técnica y sin prisa. Esmaltado en gel desde S/ 30,
              pedicure spa desde S/ 40 y lifting de pestañas desde S/ 35.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/reservar">Agenda tu momento</Link>
              <Link className="text-link" href="/servicios">Ver precios <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="hero-visual hero-photo">
            <img src="/images/angeles-nails-hero.webp" alt="Manicure en proceso en Ángeles Nails Salon" width="1536" height="1024" fetchPriority="high" />
            <div className="hero-caption"><span>01</span><p>Precisión de cerca.<br />Belleza que se siente tuya.</p></div>
          </div>
        </div>
        <a className="scroll-cue" href="#servicios"><span aria-hidden="true">↓</span> Explora</a>
      </section>

      <section className="brand-ribbon" role="region" tabIndex={0} aria-label="Principios de Ángeles Nails Salon; desliza horizontalmente para ver todos">
        <p><span>✦</span> Herramientas higienizadas</p>
        <p><span>✦</span> Diseño personalizado</p>
        <p><span>✦</span> Técnica delicada</p>
        <p><span>✦</span> Atención con cita previa</p>
        <p><span>✦</span> 10 a.m. — 8 p.m.</p>
      </section>

      <section className="services-preview" id="servicios">
        <div className="section-heading">
          <p className="eyebrow">Nuestra carta</p>
          <h2>Uñas y miradas<br />con intención.</h2>
          <p>De lo más natural a lo más definido: cada forma, curvatura y acabado se elige contigo.</p>
          <Link className="text-link" href="/servicios">Lista de precios completa <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="service-list">
          {featuredServices.map((service, index) => (
            <Link className="service-row" href="/servicios" key={service.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.shortName ?? service.name}</h3>
              <div><p>{service.note}</p><small>{formatPrice(service.priceFrom)}</small></div>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>

      <ServiceExplorer />

      <section className="experience" id="experiencia">
        <div className="experience-image" role="img" aria-label="Detalle de manicure en Ángeles Nails Salon" />
        <div className="experience-copy">
          <p className="eyebrow">La experiencia Ángeles</p>
          <h2>El lujo está<br /><em>en la precisión.</em></h2>
          <p className="lead">
            No elegimos una técnica solo porque está de moda. Observamos tu base natural, escuchamos lo que buscas
            y diseñamos un resultado que también se vea bonito en la vida real.
          </p>
          <div className="steps" role="region" tabIndex={0} aria-label="Proceso de atención; desliza horizontalmente para ver los pasos">
            {steps.map((step) => (
              <article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>
            ))}
          </div>
          <Link className="text-link" href="/nosotros">Conoce el studio <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="looks" aria-labelledby="looks-title">
        <div className="looks-heading">
          <p className="eyebrow">The Ángeles edit</p>
          <h2 id="looks-title">Detalles que hablan.</h2>
          <p>Forma, color y textura. Tres maneras de elevar tu expresión sin dejar de verte tú.</p>
          <Link className="text-link" href="/galeria">Ver la galería <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="looks-strip">
          {galleryPreview.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="studio-story" id="studio">
        <div className="story-number" aria-hidden="true">A / S</div>
        <div>
          <p className="eyebrow">Nuestro manifiesto</p>
          <blockquote>«A mal tiempo, uñas lindas: algo se endereza por dentro cuando te ves las manos bonitas.»</blockquote>
          <p>
            Ángeles Nails Salon trabaja en Los Olivos con una idea simple: que un servicio de belleza pueda sentirse
            cuidado, higiénico y sin prisa. Atendemos con cita previa para dedicarle a cada clienta el tiempo real
            que su servicio necesita.
          </p>
        </div>
      </section>

      <section className="social-proof" aria-labelledby="social-title">
        <div className="social-heading">
          <p className="eyebrow">Nuestro trabajo, en vivo</p>
          <h2 id="social-title">Míranos trabajar.</h2>
          <p>Publicamos diseños, procesos y disponibilidad cada semana. Ahí ves resultados reales antes de reservar.</p>
        </div>
        <div className="social-grid">
          <a className="social-card" href={business.social.instagram.url} target="_blank" rel="noreferrer">
            <span className="social-label">Instagram</span>
            <strong>{business.social.instagram.handle}</strong>
            <span className="social-go" aria-hidden="true">↗</span>
          </a>
          <a className="social-card" href={business.social.tiktok.url} target="_blank" rel="noreferrer">
            <span className="social-label">TikTok</span>
            <strong>{business.social.tiktok.handle}</strong>
            <span className="social-go" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="visit" id="contacto">
        <div className="visit-card">
          <p className="eyebrow">Visítanos</p>
          <h2>Tu próxima pausa<br />empieza aquí.</h2>
          <address>{addressLines.map((line) => <span key={line}>{line}</span>)}</address>
          <dl>
            <div><dt>Horario</dt><dd>{business.hours.display}</dd></div>
            <div><dt>Atención</dt><dd>{business.bookingPolicy}</dd></div>
            <div><dt>WhatsApp</dt><dd>{business.whatsappDisplay}</dd></div>
            <div><dt>Correo</dt><dd><a href={emailUrl}>{business.email}</a></dd></div>
          </dl>
          <div className="hero-actions">
            <Link className="button button-primary" href="/reservar">Reservar cita</Link>
            <a className="text-link" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="visit-map">
          <div className="map-grid" aria-hidden="true" />
          <span className="map-pin" aria-hidden="true"><b>A</b></span>
          <div className="map-caption">
            <p>{business.address.district}</p>
            <small>{business.address.area} · {business.address.city}</small>
          </div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div><p className="eyebrow">Antes de tu cita</p><h2 id="faq-title">Lo que nos suelen preguntar.</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="booking" id="reservar">
        <div className="booking-heading">
          <p className="eyebrow">Reserva</p>
          <h2>Hagamos espacio<br /><em>para ti.</em></h2>
          <p>Elige lo que buscas y tu horario ideal. Te escribiremos para confirmar disponibilidad.</p>
        </div>
        <BookingForm />
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
