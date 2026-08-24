import Link from 'next/link';

export const metadata = { title: 'Términos | Ángeles Studio' };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al studio</Link>
      <article>
        <p className="eyebrow">Legal</p><h1>Términos del servicio</h1>
        <p className="legal-date">Versión preliminar · agosto de 2026</p>
        <h2>Solicitudes de cita</h2><p>Enviar una solicitud no garantiza disponibilidad ni confirma una cita. La reserva queda confirmada únicamente cuando Ángeles Studio lo comunica por un canal oficial.</p>
        <h2>Precios</h2><p>Los precios publicados son referenciales y pueden variar según retiro previo, técnica, diseño, productos y tiempo técnico. El precio final se informa antes de iniciar el servicio.</p>
        <h2>Cambios y cancelaciones</h2><p>Las reprogramaciones deben solicitarse con al menos 24 horas de anticipación. Las condiciones de adelantos y devoluciones se informarán durante la confirmación.</p>
        <h2>Resultados y cuidados</h2><p>Los resultados dependen del diagnóstico, historial y condición de cada persona. Seguir las recomendaciones posteriores es parte esencial del mantenimiento.</p>
        <aside>Condiciones provisionales sujetas a reemplazo por los datos y políticas definitivas del negocio.</aside>
      </article>
    </main>
  );
}
