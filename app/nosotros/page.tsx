/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import Link from 'next/link';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';
import { team } from '../content/team';

export const metadata = {
  title: 'El studio',
  description:
    'Cómo trabajamos en Ángeles Nails Salon: higiene, asesoría real y atención con cita previa en Los Olivos, Lima.',
};

const pillars = [
  {
    number: '01',
    title: 'Higiene primero',
    copy: 'Herramientas esterilizadas entre clienta y clienta, limas de un solo uso donde corresponde y superficies desinfectadas antes de cada servicio.',
  },
  {
    number: '02',
    title: 'Asesoría honesta',
    copy: 'Si tu uña no está para un largo extremo, te lo decimos. Preferimos un resultado que dure a uno que se vea bien solo el primer día.',
  },
  {
    number: '03',
    title: 'Una clienta a la vez',
    copy: 'Trabajamos con cita previa para no cruzar horarios. Tu servicio recibe el tiempo técnico que realmente necesita.',
  },
  {
    number: '04',
    title: 'Cuidados que sí funcionan',
    copy: 'Te vas con indicaciones concretas de mantenimiento y con la fecha estimada de tu próximo retoque.',
  },
];

const detail = [
  { src: '/images/studio-asesoria.webp', alt: 'Asesoría de color con muestrario de esmaltes', width: 1400, height: 933, caption: 'Elegimos el color contigo, no por ti.' },
  { src: '/images/studio-atencion.webp', alt: 'Especialista realizando pedicure spa a una clienta', width: 1400, height: 933, caption: 'Pedicure spa con la clienta cómoda y sin apuro.' },
];

export default function AboutPage() {
  return (
    <main className="subpage subpage-nosotros">
      <MotionEffects />
      <a className="skip-link" href="#manifiesto">Saltar al contenido</a>
      <SiteHeader current="/nosotros" />

      <PageHero
        breadcrumb="El studio"
        eyebrow="Quiénes somos"
        title={<>Un salón chico,<br /><em>con estándar grande.</em></>}
        intro="Ángeles Nails Salon nació en Los Olivos con una idea simple: que ir a hacerte las uñas se sienta cuidado, higiénico y sin prisa. Somos especialistas en uñas, pedicure spa y diseño de mirada."
        image={{ src: '/images/studio-cejas.webp', alt: 'Diseño de cejas en cabina', width: 1400, height: 2100 }}
        caption={{ index: 'A/S', text: <>Los Olivos,<br />Lima.</> }}
        actions={
          <>
            <Link className="button button-primary" href="/reservar">Reservar cita</Link>
            <Link className="text-link" href="/servicios">Ver precios <span aria-hidden="true">↗</span></Link>
          </>
        }
      />

      <section className="studio-story" id="manifiesto">
        <div className="story-number" aria-hidden="true">A / S</div>
        <div>
          <p className="eyebrow">Nuestro manifiesto</p>
          <blockquote>«A mal tiempo, uñas lindas.»</blockquote>
          <p>
            Es la frase con la que abrimos cada semana y también nuestra manera de entender el oficio: un servicio
            de belleza bien hecho no es un lujo lejano, es un rato tuyo que te devuelve algo. Por eso cuidamos la
            higiene, el diagnóstico y el tiempo por encima de la moda del mes.
          </p>
        </div>
      </section>

      <section className="pillars" aria-labelledby="pillars-title">
        <div className="pillars-heading">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2 id="pillars-title">Cuatro cosas que<br />no negociamos.</h2>
          <p>No son promesas de marca: son las reglas con las que atendemos todos los días.</p>
        </div>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <article key={pillar.number}>
              <span aria-hidden="true">{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="team" aria-labelledby="team-title">
        <div className="team-heading">
          <p className="eyebrow">Quién te atiende</p>
          <h2 id="team-title">Dos manicuristas,<br />sin apuro.</h2>
          <p>
            Hoy somos dos manicuristas. Trabajamos con cita previa justamente para que ninguna de las dos tenga
            que apurar un servicio.
          </p>
        </div>
        <div className="team-grid">
          {team.map((member, index) => (
            <article className={`team-card team-card-${index + 1}`} key={member.id}>
              <div className="team-portrait"><span aria-hidden="true">{member.initials}</span></div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-strip" aria-label="El studio por dentro">
        {detail.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="social-proof" aria-labelledby="social-title">
        <div className="social-heading">
          <p className="eyebrow">Nuestro trabajo, en vivo</p>
          <h2 id="social-title">Míranos trabajar.</h2>
          <p>Publicamos diseños, procesos y disponibilidad cada semana.</p>
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

      <section className="cta-band">
        <div>
          <p className="eyebrow">Te esperamos</p>
          <h2>Ven a conocernos<br />en Los Olivos.</h2>
          <p>Atendemos con cita previa. Escríbenos y coordinamos el día y la hora que te acomoden.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href="/reservar">Solicitar cita</Link>
          <Link className="text-link" href="/contacto">Cómo llegar <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
