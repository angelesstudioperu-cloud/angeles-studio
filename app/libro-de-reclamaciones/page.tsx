import { NativeLink as Link } from '../components/NativeLink';
import { business, emailUrl, whatsappUrl } from '../content/business';

export const metadata = { title: 'Libro de reclamaciones' };

export default function ComplaintsPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Volver al salón</Link>
      <article>
        <p className="eyebrow">Atención al cliente</p>
        <h1>Libro de reclamaciones</h1>
        <p>
          Este espacio está reservado para el Libro de Reclamaciones virtual de {business.name}, conforme al
          Código de Protección y Defensa del Consumidor del Perú.
        </p>

        <div className="legal-placeholder">
          <strong>Formulario pendiente de constitución formal</strong>
          <p>
            El salón todavía no cuenta con razón social ni RUC, y sin esos datos no podemos publicar un libro de
            reclamaciones virtual válido. Mientras tanto, puedes hacernos llegar cualquier reclamo por WhatsApp al{' '}
            <a href={whatsappUrl} target="_blank" rel="noreferrer">{business.whatsappDisplay}</a> o al correo{' '}
            <a href={emailUrl}>{business.email}</a>, y lo registramos en el libro físico del local.
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
