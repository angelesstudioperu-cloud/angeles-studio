import Link from 'next/link';
import { business } from '../content/business';

export const metadata = { title: 'Términos del servicio' };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al salón</Link>
      <article>
        <p className="eyebrow">Legal</p>
        <h1>Términos del servicio</h1>
        <p className="legal-date">Versión preliminar · setiembre de 2026</p>

        <h2>Solicitudes de cita</h2>
        <p>
          Enviar una solicitud no garantiza disponibilidad ni confirma una cita. La reserva queda confirmada
          únicamente cuando {business.name} lo comunica por un canal oficial.
        </p>

        <h2>Precios</h2>
        <p>
          Los precios publicados son precios «desde» y corresponden al servicio estándar. Pueden variar según
          diseño, largo, pedrería, productos y tiempo técnico. El precio final se informa antes de iniciar el
          servicio.
        </p>

        <h2>Retiros</h2>
        <p>
          El retiro de un trabajo anterior no está incluido en el precio del servicio nuevo: S/ 10 para esmaltado
          en gel de manos o pies, S/ 15 para uñas acrílicas o polygel y S/ 20 para uñas rubber gel, builder gel o
          soft gel.
        </p>

        <h2>Cambios y cancelaciones</h2>
        <p>
          Las reprogramaciones deben solicitarse con anticipación por WhatsApp. Las condiciones de adelantos y
          devoluciones se informan durante la confirmación de la cita.
        </p>

        <h2>Resultados y cuidados</h2>
        <p>
          Los resultados dependen del diagnóstico, historial y condición de cada persona. Seguir las
          recomendaciones posteriores es parte esencial del mantenimiento. No realizamos servicios sobre piel,
          ojos o uñas con irritación, infección o lesión visible.
        </p>

        <aside>Condiciones preliminares pendientes de revisión legal antes del lanzamiento público.</aside>
      </article>
    </main>
  );
}
