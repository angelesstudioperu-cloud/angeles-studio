import Link from 'next/link';
import { business, emailUrl, whatsappUrl } from '../content/business';

export const metadata = { title: 'Política de privacidad' };

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al salón</Link>
      <article>
        <p className="eyebrow">Legal</p>
        <h1>Política de privacidad</h1>
        <p className="legal-date">Versión preliminar · setiembre de 2026</p>

        <h2>Qué datos recibimos</h2>
        <p>
          Cuando solicitas una cita podemos recibir tu nombre, teléfono, servicio y horario preferido. No
          solicitamos información financiera ni historial clínico en esta web.
        </p>

        <h2>Dónde se guardan</h2>
        <p>
          El formulario de reserva no almacena nada en este sitio: arma un mensaje y lo abre en tu propia
          aplicación de WhatsApp para que seas tú quien lo envíe. La conversación queda en WhatsApp, sujeta a las
          políticas de ese servicio.
        </p>

        <h2>Para qué los usamos</h2>
        <p>
          Usamos tus datos únicamente para responder, coordinar y dar seguimiento a tu solicitud. La cita solo se
          confirma cuando {business.name} te lo comunica expresamente.
        </p>

        <h2>Con quién se comparten</h2>
        <p>No vendemos información personal ni la usamos para publicidad de terceros.</p>

        <h2>Conservación y derechos</h2>
        <p>
          Las solicitudes se conservan solo durante el tiempo necesario para la coordinación y las obligaciones
          aplicables. Puedes solicitar acceso, rectificación o eliminación escribiéndonos a{' '}
          <a href={emailUrl}>{business.email}</a> o por WhatsApp al{' '}
          <a href={whatsappUrl} target="_blank" rel="noreferrer">{business.whatsappDisplay}</a>.
        </p>

        <aside>
          Documento pendiente de revisión por asesoría legal peruana (Ley 29733 de Protección de Datos Personales)
          antes del lanzamiento público.
        </aside>
      </article>
    </main>
  );
}
