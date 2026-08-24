import Link from 'next/link';

export const metadata = { title: 'Privacidad | Ángeles Studio' };

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al studio</Link>
      <article>
        <p className="eyebrow">Legal</p><h1>Política de privacidad</h1>
        <p className="legal-date">Versión preliminar · agosto de 2026</p>
        <h2>Qué datos recibimos</h2><p>Cuando solicitas una cita podemos recibir tu nombre, teléfono, servicio y horario preferido. No solicitamos información financiera ni historial clínico en esta web.</p>
        <h2>Para qué los usamos</h2><p>Usamos tus datos únicamente para responder, coordinar y dar seguimiento a tu solicitud. La cita solo se confirma cuando nuestro equipo te lo comunica expresamente.</p>
        <h2>Con quién se comparten</h2><p>Los datos podrán transferirse al sistema operativo de Ángeles Studio para gestionar la agenda. No vendemos información personal ni la usamos para publicidad de terceros.</p>
        <h2>Conservación y derechos</h2><p>Las solicitudes se conservan solo durante el tiempo necesario para la coordinación y las obligaciones aplicables. Puedes solicitar acceso, rectificación o eliminación escribiendo a privacidad@angelesstudio.pe.</p>
        <aside>Este texto y todos los datos de empresa son provisionales. Deben ser revisados por asesoría legal peruana antes del lanzamiento.</aside>
      </article>
    </main>
  );
}
