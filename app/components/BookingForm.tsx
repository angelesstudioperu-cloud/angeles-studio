'use client';

import { useState, type FormEvent } from 'react';
import { business, whatsappUrl } from '../content/business';
import { categoryContent, categories, formatPrice, servicesByCategory } from '../content/services';

/**
 * `preselect` es el slug que llega en /reservar?servicio=… desde las fichas de
 * servicio. Lo resuelve la página en el servidor para que el valor ya venga
 * renderizado y no haya salto al hidratar.
 */
export function BookingForm({ preselect }: { preselect?: string } = {}) {
  const initial = preselect
    ? categories
        .flatMap((category) => servicesByCategory(category))
        .find((item) => item.slug === preselect)
    : undefined;

  const [status, setStatus] = useState<'idle' | 'opened' | 'blocked'>('idle');
  const [service, setService] = useState(initial ? `${initial.name} (${formatPrice(initial.priceFrom)})` : '');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const optional = (label: string, key: string) => {
      const value = form.get(key);
      return value ? `${label}: ${value}` : null;
    };

    const message = [
      `Hola, ${business.name}. Quisiera solicitar una cita.`,
      `Nombre: ${form.get('name')}`,
      `Servicio: ${form.get('service')}`,
      `Teléfono: ${form.get('phone')}`,
      optional('Fecha preferida', 'date'),
      optional('Horario', 'time'),
      optional('Primera visita', 'firstVisit'),
      optional('Retiro previo', 'removal'),
    ]
      .filter(Boolean)
      .join('\n');

    const openedWindow = window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setStatus(openedWindow ? 'opened' : 'blocked');
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-essentials">
        <label>
          <span>Tu nombre</span>
          <input name="name" autoComplete="name" required placeholder="Cómo te llamamos" />
        </label>
        <label>
          <span>Tu WhatsApp</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            pattern="(?:\+?51\s?)?9\d{8}"
            title="Ingresa un celular peruano de 9 dígitos"
            placeholder="999 999 999"
          />
        </label>
        <label>
          <span>Qué te quieres hacer</span>
          <select name="service" required value={service} onChange={(event) => setService(event.target.value)}>
            <option value="" disabled>
              Elige un servicio
            </option>
            {categories.map((category) => (
              <optgroup key={category} label={categoryContent[category].label}>
                {servicesByCategory(category).map((item) => (
                  <option key={item.slug} value={`${item.name} (${formatPrice(item.priceFrom)})`}>
                    {item.name} · {formatPrice(item.priceFrom)}
                  </option>
                ))}
              </optgroup>
            ))}
            <option>No estoy segura — quiero asesoría</option>
          </select>
        </label>
      </div>

      <details className="booking-extras">
        <summary>
          <span>Agregar fecha y detalles</span>
          <small>Opcional · lo podemos coordinar por WhatsApp</small>
        </summary>
        <div className="booking-extras-grid">
          <label>
            <span>Fecha preferida</span>
            <input name="date" type="date" />
          </label>
          <label>
            <span>Horario ideal</span>
            <select name="time" defaultValue="">
              <option value="">Cualquiera</option>
              <option>Mañana</option>
              <option>Tarde</option>
              <option>Noche</option>
            </select>
          </label>
          <label>
            <span>¿Es tu primera visita?</span>
            <select name="firstVisit" defaultValue="">
              <option value="">Prefiero no decirlo</option>
              <option>Sí, es mi primera vez</option>
              <option>No, ya soy clienta</option>
            </select>
          </label>
          <label>
            <span>¿Necesitas retiro previo?</span>
            <select name="removal" defaultValue="">
              <option value="">No lo sé aún</option>
              <option>No</option>
              <option>Sí, esmaltado en gel (S/ 10)</option>
              <option>Sí, acrílicas o polygel (S/ 15)</option>
              <option>Sí, rubber / builder / soft gel (S/ 20)</option>
            </select>
          </label>
        </div>
      </details>

      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>Acepto que {business.name} use estos datos solo para coordinar mi cita.</span>
      </label>

      <button className="button button-book" type="submit">
        Enviar por WhatsApp <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">Son 3 datos. Te respondemos para confirmar disponibilidad.</p>

      {status === 'opened' && (
        <p className="form-status" role="status">
          Abrimos WhatsApp con tu solicitud lista para enviar.
        </p>
      )}
      {status === 'blocked' && (
        <p className="form-status" role="alert">
          Tu navegador bloqueó la ventana.{' '}
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Abrir WhatsApp en {business.whatsappDisplay}
          </a>
          .
        </p>
      )}
    </form>
  );
}
