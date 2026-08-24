/* eslint-disable @next/next/no-img-element -- Vinext's next/image shim duplicates React in local/Workers builds; this asset is a pre-sized 73 KB WebP. */
import { BookingForm } from './components/BookingForm';
import { MotionEffects } from './components/MotionEffects';
import { ServiceExplorer } from './components/ServiceExplorer';
import { business, whatsappUrl } from './content/business';
import { featuredServices, formatPrice } from './content/services';

const steps = [
  { number: '01', title: 'Observamos', copy: 'Revisamos la condición de tus uñas o pestañas naturales, tu estilo y el mantenimiento que deseas.' },
  { number: '02', title: 'Diseñamos contigo', copy: 'Elegimos forma, curvatura, largo, color o efecto antes de comenzar; nada se decide a ciegas.' },
  { number: '03', title: 'Protegemos el resultado', copy: 'Terminamos con cuidados claros para que tu diseño se mantenga bonito y cómodo.' },
];

const team = [
  { initials: 'VM', name: 'Valentina Mora', role: 'Nail artist · Estructura' },
  { initials: 'AS', name: 'Alessandra Solís', role: 'Lash artist · Lifting' },
  { initials: 'MC', name: 'Mariana Costa', role: 'Lash designer · Extensiones' },
];

const faqs = [
  ['¿Cómo sé qué técnica de uñas me conviene?', 'Evaluamos largo, flexibilidad y condición de la uña natural. Según el resultado y mantenimiento que buscas, te orientamos entre manicure, rubber gel o Gel X.'],
  ['¿Lifting o extensiones de pestañas?', 'El lifting curva tu pestaña natural; las extensiones añaden largo y densidad. Si no estás segura, agenda una evaluación y diseñamos contigo.'],
  ['¿Cómo reservo mi cita?', 'Envíanos tu solicitud por el formulario o WhatsApp. Nuestro equipo valida la disponibilidad y recién entonces tu cita queda confirmada.'],
  ['¿Qué cuidados debo tener después?', 'Evita agua, vapor y aceites en pestañas durante las primeras 24 horas. En uñas, no las uses como herramientas y aplica aceite de cutícula a diario.'],
  ['¿Puedo atenderme si tengo irritación o una lesión?', 'No realizamos el servicio sobre piel, ojos o uñas con irritación, infección o lesión visible. Reprogramaremos y te recomendaremos evaluación profesional cuando corresponda.'],
];

export default function Home() {
  return (
    <main>
      <MotionEffects />
      <a className="skip-link" href="#servicios">Saltar al contenido</a>
      <section className="hero" id="inicio">
        <header className="site-header" role="banner">
          <a className="brand" href="#inicio" aria-label="Ángeles Studio, inicio">
            <span className="brand-mark" aria-hidden="true">A</span>
            <span className="brand-copy"><strong>Ángeles</strong><small>Studio</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#servicios">Servicios</a><a href="#experiencia">Experiencia</a>
            <a href="#studio">El studio</a><a href="#contacto">Contacto</a>
          </nav>
          <a className="header-cta" href="#reservar">Reservar cita</a>
          <details className="mobile-menu">
            <summary aria-label="Abrir navegación">Menú</summary>
            <nav aria-label="Navegación móvil"><a href="#servicios">Servicios</a><a href="#experiencia">Experiencia</a><a href="#studio">El studio</a><a href="#contacto">Contacto</a><a href="#reservar">Reservar</a></nav>
          </details>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Nail & lash studio · Lima</p>
            <h1>Pequeños detalles.<br /><em>Gran presencia.</em></h1>
            <p className="hero-intro">Uñas, lifting y pestañas diseñadas con precisión en un espacio creado para bajar el ritmo y elevar tu expresión.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#reservar">Agenda tu momento</a>
              <a className="text-link" href="#servicios">Descubre el studio <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-visual hero-photo">
            <img src="/images/angeles-nails-hero.webp" alt="Sesión de manicure precisa en Ángeles Studio" width="1536" height="1024" fetchPriority="high" />
            <div className="hero-caption"><span>01</span><p>Precisión de cerca.<br />Belleza que se siente tuya.</p></div>
          </div>
        </div>
        <a className="scroll-cue" href="#servicios"><span aria-hidden="true">↓</span> Explora</a>
      </section>

      <section className="brand-ribbon" role="region" tabIndex={0} aria-label="Principios de Ángeles Studio; desliza horizontalmente para ver todos">
        <p><span>✦</span> Herramientas higienizadas</p><p><span>✦</span> Diseño personalizado</p>
        <p><span>✦</span> Técnica delicada</p><p><span>✦</span> Atención sin prisa</p>
      </section>

      <section className="services-preview" id="servicios">
        <div className="section-heading">
          <p className="eyebrow">Nuestra edición</p>
          <h2>Uñas y miradas<br />con intención.</h2>
          <p>De lo más natural a lo más definido: cada forma, curvatura y acabado se elige contigo.</p>
          <a className="text-link" href="#reservar">Ver disponibilidad <span aria-hidden="true">↗</span></a>
        </div>
        <div className="service-list">
          {featuredServices.map((service, index) => (
            <a className="service-row" href="#reservar" key={service.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{service.shortName ?? service.name}</h3>
              <div><p>{service.note}</p><small>{formatPrice(service.priceFrom)}</small></div><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <ServiceExplorer />

      <section className="experience" id="experiencia">
        <div className="experience-image" role="img" aria-label="Detalle de manicure en Ángeles Studio" />
        <div className="experience-copy">
          <p className="eyebrow">La experiencia Ángeles</p>
          <h2>El lujo está<br /><em>en la precisión.</em></h2>
          <p className="lead">No elegimos una técnica solo porque está de moda. Observamos tu base natural, escuchamos lo que buscas y diseñamos un resultado bonito también en la vida real.</p>
          <div className="steps" role="region" tabIndex={0} aria-label="Proceso de atención; desliza horizontalmente para ver los pasos">
            {steps.map((step) => <article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="looks" aria-labelledby="looks-title">
        <div className="looks-heading">
          <p className="eyebrow">The Ángeles edit</p>
          <h2 id="looks-title">Detalles que hablan.</h2>
          <p>Forma, curvatura y textura. Tres maneras de elevar tu expresión sin dejar de verte tú.</p>
        </div>
        <div className="looks-image">
          <span className="looks-media" role="img" aria-label="Resultados editoriales de uñas, lifting y extensiones de pestañas" />
          <span className="look-tag look-one">Micro French</span>
          <span className="look-tag look-two">Lifting natural</span>
          <span className="look-tag look-three">Clásicas definidas</span>
        </div>
      </section>

      <section className="studio-story" id="studio">
        <div className="story-number">A / S</div>
        <div>
          <p className="eyebrow">Nuestro manifiesto</p>
          <blockquote>“Hay belleza en lo pequeño: una curva precisa, una forma limpia, una mirada que se abre sin perder naturalidad.”</blockquote>
          <p>Ángeles Studio nace en Lima para elevar el oficio de uñas y pestañas con hospitalidad y sensibilidad editorial. Empezamos íntimos para cuidar cada detalle; creceremos sin perder esa cercanía.</p>
        </div>
      </section>

      <section className="team" aria-labelledby="team-title">
        <div className="team-heading"><p className="eyebrow">Equipo provisional</p><h2 id="team-title">Manos expertas.<br />Mirada sensible.</h2><p>Perfiles de muestra que reemplazaremos por las especialistas reales de Ángeles Studio.</p></div>
        <div className="team-grid" role="region" tabIndex={0} aria-label="Equipo de muestra; desliza horizontalmente para ver todos los perfiles">
          {team.map((member, index) => <article className={`team-card team-card-${index + 1}`} key={member.name}>
            <div className="team-portrait"><span>{member.initials}</span></div><h3>{member.name}</h3><p>{member.role}</p>
          </article>)}
        </div>
      </section>

      <section className="testimonial" aria-label="Ejemplo de presentación para un futuro testimonio real">
        <p className="eyebrow">Espacio reservado para reseña real</p>
        <blockquote>“Quería algo muy natural. Me explicaron cada opción y el lifting abrió mi mirada sin que pareciera exagerado.”</blockquote>
        <p>Texto demostrativo · no publicar como testimonio</p>
      </section>

      <section className="visit" id="contacto">
        <div className="visit-card">
          <p className="eyebrow">Visítanos</p><h2>Tu próxima pausa<br />empieza aquí.</h2>
          <address>Av. Los Almendros 245<br />Miraflores, Lima</address>
          <dl><div><dt>Lun — Sáb</dt><dd>9:00 a.m. — 8:00 p.m.</dd></div><div><dt>Domingo</dt><dd>Previa cita</dd></div></dl>
          <a className="button button-primary" href="#reservar">Reservar en Miraflores</a>
        </div>
        <div className="visit-map">
          <div className="map-grid" aria-hidden="true" />
          <span className="map-pin" aria-hidden="true"><b>A</b></span>
          <div className="map-caption"><p>Flagship Miraflores</p><small>Una sede hoy. Una marca preparada para crecer.</small></div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div><p className="eyebrow">Antes de tu cita</p><h2 id="faq-title">Lo que nos suelen preguntar.</h2></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="booking" id="reservar">
        <div className="booking-heading"><p className="eyebrow">Reserva</p><h2>Hagamos espacio<br /><em>para ti.</em></h2><p>Elige lo que buscas y tu horario ideal. Te escribiremos para confirmar disponibilidad.</p></div>
        <BookingForm />
      </section>

      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark">A</span><h2>Ángeles Studio</h2><p>Belleza de autor en Lima.</p></div>
        <div><h3>Explora</h3><a href="#servicios">Servicios</a><a href="#experiencia">Experiencia</a><a href="#studio">El studio</a><a href="#reservar">Reservar</a></div>
        <div><h3>Conecta</h3><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
        <div><h3>Legal</h3><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a><a href="/libro-de-reclamaciones">Libro de reclamaciones</a></div>
        <p className="footer-bottom">© 2026 Ángeles Studio · Datos y marca provisionales para reemplazo.</p>
      </footer>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar con Ángeles Studio por WhatsApp">WA</a>
    </main>
  );
}
