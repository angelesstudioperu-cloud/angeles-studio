import Link from 'next/link';

export const metadata = { title: 'Libro de reclamaciones | Ángeles Studio' };

export default function ComplaintsPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al studio</Link>
      <article>
        <p className="eyebrow">Atención al cliente</p><h1>Libro de reclamaciones</h1>
        <p>Este espacio está reservado para el Libro de Reclamaciones virtual de Ángeles Studio conforme a la normativa peruana.</p>
        <div className="legal-placeholder"><strong>Integración pendiente de datos legales</strong><p>Antes de habilitar envíos necesitamos la razón social, RUC, domicilio fiscal y canal responsable reales. Mientras tanto, puedes escribir a reclamos@angelesstudio.pe.</p></div>
        <aside>Esta página evita publicar un formulario legal con identidad empresarial inventada. Se habilitará cuando proporciones los datos oficiales.</aside>
      </article>
    </main>
  );
}
