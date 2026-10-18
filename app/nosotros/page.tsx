import { MotionEffects } from '../components/MotionEffects';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business } from '../content/business';
import { team } from '../content/team';

export const metadata = {
  alternates: { canonical: '/nosotros' },
  title: 'El studio',
  description:
    'Tres años trabajando uñas, pedicure spa y diseño de mirada en Los Olivos, Lima. Conoce el salón y a quienes te atienden.',
};

export default function AboutPage() {
  return (
    <main className="subpage subpage-nosotros">
      <MotionEffects />
      <a className="skip-link" href="#equipo">Saltar al equipo</a>
      <SiteHeader current="/nosotros" />

      <section className="experience-intro experience-intro-no-media">
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
              <div className="team-portrait team-portrait-initials" aria-label={`Iniciales de ${member.name}`}>
                <span>{member.initials}</span>
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
