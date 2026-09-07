/* eslint-disable @next/next/no-img-element -- el shim de next/image de Vinext duplica React en los builds de Workers; estos assets ya vienen dimensionados en WebP. */
import { MotionEffects } from '../components/MotionEffects';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';
import { team } from '../content/team';

export const metadata = {
  title: 'El studio',
  description:
    'Tres años trabajando uñas, pedicure spa y diseño de mirada en Los Olivos, Lima. Conoce el salón y a quienes te atienden.',
};

/** Fotos del salón para la escalera de la derecha. Se reemplazan por las propias. */
const shotsLeft = [
  { src: '/images/servicios/cabina.webp', width: 1200, height: 800, alt: 'Cabina de atención del salón', caption: 'La cabina' },
  { src: '/images/studio-asesoria.webp', width: 1400, height: 933, alt: 'Muestrario de colores sobre la mesa de trabajo', caption: 'Elegir color' },
];

const shotsRight = [
  { src: '/images/studio-atencion.webp', width: 1400, height: 933, alt: 'Especialista atendiendo a una clienta', caption: 'Atención sin apuro' },
  { src: '/images/servicios/herramientas.webp', width: 1200, height: 1800, alt: 'Herramientas ordenadas y esterilizadas', caption: 'Todo esterilizado' },
];

export default function AboutPage() {
  return (
    <main className="subpage subpage-nosotros">
      <MotionEffects />
      <a className="skip-link" href="#equipo">Saltar al equipo</a>
      <SiteHeader current="/nosotros" />

      <section className="experience-intro">
        <div className="experience-intro-copy">
          <p className="eyebrow">El studio</p>
          <h1>
            Contamos con <em>{business.yearsOfExperience} años de experiencia</em>
          </h1>
          <p className="experience-lead">
            Tres años trabajando uñas, pedicure spa y diseño de mirada en Los Olivos. En ese tiempo aprendimos
            algo simple: lo que hace que una clienta vuelva no es la moda del mes, es que el trabajo aguante y
            que el rato se sienta cuidado.
          </p>
          <ul className="experience-points">
            <li>Herramientas esterilizadas entre clienta y clienta.</li>
            <li>Te decimos qué técnica conviene a tu uña, no la más cara.</li>
            <li>Atendemos con cita previa para no apurar ningún servicio.</li>
          </ul>
        </div>

        {/* Reemplazar por <video autoPlay muted loop playsInline> cuando llegue el material. */}
        <div className="video-frame" role="img" aria-label="Espacio reservado para el video del salón">
          <span className="video-frame-icon" aria-hidden="true">▶</span>
          <p>Video del salón</p>
          <small>Próximamente</small>
        </div>
      </section>

      <section className="tour" aria-labelledby="tour-title">
        <div className="tour-head">
          <p className="eyebrow">El espacio</p>
          <h2 id="tour-title" className="tour-title">Así se ve por dentro</h2>
          <p className="tour-lead">
            Un salón chico y ordenado. Atendemos con cita previa justamente para que nunca haya
            dos clientas esperando su turno de pie.
          </p>
        </div>

        {/* El video manda al centro y las cuatro fotos lo flanquean. */}
        <div className="tour-shots tour-shots-left">
          {shotsLeft.map((shot) => (
            <figure key={shot.src} className="tour-shot">
              <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="tour-video video-frame video-frame-portrait" role="img" aria-label="Espacio reservado para el recorrido en video">
          <span className="video-frame-icon" aria-hidden="true">▶</span>
          <p>Recorrido del salón</p>
          <small>Próximamente</small>
        </div>

        <div className="tour-shots tour-shots-right">
          {shotsRight.map((shot) => (
            <figure key={shot.src} className="tour-shot">
              <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="team" id="equipo" aria-labelledby="team-title">
        <div className="team-heading">
          <p className="eyebrow">Quién te atiende</p>
          <h2 id="team-title">Experiencia<br />a tu cuidado</h2>
          <p>
            Kiara y Liliana. Trabajamos con cita previa justamente para que ninguna de las dos tenga que apurar
            un servicio.
          </p>
        </div>
        <div className="team-grid">
          {team.map((member, index) => (
            <article className={`team-card team-card-${index + 1}`} key={member.id}>
              <div className="team-portrait">
                <img src={member.photo.src} alt={member.photo.alt} width={member.photo.width} height={member.photo.height} loading="lazy" />
                <span aria-hidden="true">{member.initials}</span>
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
