import { NativeLink as Link } from '../components/NativeLink';
import { business, emailUrl, whatsappUrl } from '../content/business';

export const metadata = {
  title: 'Libro de reclamaciones',
  alternates: { canonical: '/libro-de-reclamaciones' },
  robots: { index: false, follow: true },
};

export default function ComplaintsPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al salón</Link>
      <article>
        <p className="eyebrow">Atención al cliente</p>
        <h1>Libro de reclamaciones</h1>
        <p>
          Este espacio está reservado para el Libro de Reclamaciones virtual de {business.name}.
          El formulario todavía no está habilitado.
        </p>

        <div className="legal-placeholder">
          <strong>Pendiente de datos y habilitación</strong>
          <p>
            Estamos pendientes de confirmar la identidad legal del proveedor y el procedimiento de atención.
            Mientras tanto, puedes comunicarte por WhatsApp al{' '}
            <a href={whatsappUrl} target="_blank" rel="noreferrer">{business.whatsappDisplay}</a> o al correo{' '}
            <a href={emailUrl}>{business.email}</a>. Estos canales de contacto no sustituyen el Libro de Reclamaciones.
          </p>
        </div>

        <aside>
          Esta página no publica un formulario legal con identidad empresarial inventada. Se habilitará en cuanto
          el negocio proporcione los datos oficiales.
        </aside>
      </article>
    </main>
  );
}
