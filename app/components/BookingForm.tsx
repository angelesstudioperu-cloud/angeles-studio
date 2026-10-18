'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { BookingSchedule } from './BookingSchedule';
import { SELECT_SERVICE_EVENT, type SelectServiceDetail } from './bookingBridge';
import { business, whatsappUrl } from '../content/business';
import { categoryContent, categories, getService, priceLabel, services, servicesByCategory } from '../content/services';

const FLASH_MS = 2200;

function optionValue(slug: string) {
  const match = getService(slug);
  return match ? `${match.name} (${priceLabel(match)})` : '';
}

/** El select guarda la etiqueta completa; de ahí volvemos al servicio. */
function serviceFromOption(value: string) {
  return services.find((item) => `${item.name} (${priceLabel(item)})` === value);
}

/**
 * `preselect` es el slug que llega en /reservar?servicio=… desde las fichas de
 * servicio. Lo resuelve la página en el servidor para que el valor ya venga
 * renderizado y no haya salto al hidratar.
 */
export function BookingForm({ preselect }: { preselect?: string } = {}) {
  const [status, setStatus] = useState<'idle' | 'prepared' | 'missing'>('idle');
  const [draftUrl, setDraftUrl] = useState('');
  const [service, setService] = useState(preselect ? optionValue(preselect) : '');
  const [flash, setFlash] = useState(false);
  const [invalid, setInvalid] = useState(false);

  // La última hora del día depende de cuánto dura el servicio elegido.
  const duration = serviceFromOption(service)?.durationMinutes;

  const runFlash = useCallback(() => {
    setFlash(true);
    const timer = window.setTimeout(() => setFlash(false), FLASH_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // El catálogo avisa qué servicio tocaron; el campo se llena y destella.
  useEffect(() => {
    let clear: (() => void) | undefined;
    function onSelect(event: Event) {
      const { slug } = (event as CustomEvent<SelectServiceDetail>).detail ?? {};
      const value = slug ? optionValue(slug) : '';
      if (!value) return;
      setService(value);
      clear?.();
      clear = runFlash();
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => {
      window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
      clear?.();
    };
  }, [runFlash]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const optional = (label: string, key: string) => {
      const value = form.get(key);
      return value ? `${label}: ${value}` : null;
    };

    if (!form.get('date')) {
      setInvalid(true);
      setStatus('missing');
      document.querySelector('.schedule')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setInvalid(false);

    const message = [
      `Hola, ${business.name}. Quisiera solicitar una cita.`,
      `Nombre: ${form.get('name')}`,
      `Servicio: ${form.get('service')}`,
      optional('Retiro previo', 'removal'),
      optional('Fecha preferida', 'date'),
      `Hora preferida: ${form.get('time') || 'Sin especificar'}`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    setDraftUrl(url);
    setStatus('prepared');
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // El enlace manual conserva el mismo borrador si el navegador no abre una ventana.
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-fields">
        <label>
          <span>Nombre</span>
          <input name="name" autoComplete="name" required placeholder="Tu nombre" />
        </label>
        <label>
          <span>Retiro previo</span>
          <select name="removal" defaultValue="">
            <option value="">Sin especificar</option>
            <option>No</option>
            <option>Esmaltado en gel (S/ 10)</option>
            <option>Acrílicas o polygel (S/ 15)</option>
            <option>Rubber / builder / soft gel (S/ 20)</option>
          </select>
        </label>

        <label className={`field-wide${flash ? ' is-flash' : ''}`}>
          <span>Servicio</span>
          <select name="service" required value={service} onChange={(event) => setService(event.target.value)}>
            <option value="" disabled>
              Elige un servicio
            </option>
            {categories.map((category) => (
              <optgroup key={category} label={categoryContent[category].label}>
                {servicesByCategory(category).map((item) => (
                  <option key={item.slug} value={`${item.name} (${priceLabel(item)})`}>
                    {item.name} · {priceLabel(item)}
                  </option>
                ))}
              </optgroup>
            ))}
            <option>No estoy segura — quiero asesoría</option>
          </select>
          <span className="field-flash" role="status" aria-live="polite">
            {flash ? 'Servicio seleccionado' : ''}
          </span>
        </label>

        <BookingSchedule key={service || 'default'} durationMinutes={duration} invalid={invalid} />
      </div>

      <button className="button button-book" type="submit">
        Enviar por WhatsApp <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">
        Adelanto de S/ {business.bookingDeposit} para separar, que se descuenta del total.
      </p>
      <p className="form-note">
        Este formulario envía una solicitud, no confirma la cita ni la disponibilidad. Consulta nuestra{' '}
        <a href="/privacidad">política de privacidad</a>.
      </p>

      {status === 'missing' && (
        <p className="form-status is-error" role="alert">
          Elige el día que prefieras para enviar la solicitud. La hora es opcional.
        </p>
      )}
      {status === 'prepared' && (
        <p className="form-status" role="status">
          Tu solicitud está lista, pero la cita aún no está confirmada. Si WhatsApp no se abrió,{' '}
          <a href={draftUrl} target="_blank" rel="noopener noreferrer">abre el mismo borrador manualmente</a>.
        </p>
      )}
    </form>
  );
}
