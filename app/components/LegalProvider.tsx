import { addressInline, business, emailUrl } from '../content/business';

/** Identidad y contacto confirmados; no sustituye la habilitación del libro. */
export function LegalProvider() {
  return (
    <section aria-label="Identificación del proveedor">
      <h2>Proveedor y contacto</h2>
      <p><strong>Proveedor:</strong> {business.legalName}<br />
        <strong>Nombre comercial:</strong> {business.name}<br />
        <strong>Local:</strong> {addressInline}<br />
        <strong>Correo de contacto:</strong> <a href={emailUrl}>{business.email}</a>
      </p>
    </section>
  );
}
