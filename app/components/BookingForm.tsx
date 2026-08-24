'use client';

import { useState, type FormEvent } from 'react';
import { business, whatsappUrl } from '../content/business';
import { bookableServices } from '../content/services';

export function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'opened' | 'blocked'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      'Hola, Ángeles Studio. Quisiera solicitar una cita.',
      `Nombre: ${form.get('name')}`,
      `Servicio: ${form.get('service')}`,
      `Fecha preferida: ${form.get('date')}`,
      `Horario: ${form.get('time')}`,
      `Primera visita: ${form.get('firstVisit')}`,
      `Retiro previo: ${form.get('removal')}`,
      `Teléfono: ${form.get('phone')}`,
    ].join('\n');

    const openedWindow = window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setStatus(openedWindow ? 'opened' : 'blocked');
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Nombre y apellido</span>
          <input name="name" autoComplete="name" required placeholder="Cuéntanos cómo llamarte" />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="(?:\+?51\s?)?9\d{8}" title="Ingresa un celular peruano de 9 dígitos" placeholder="+51 999 999 999" />
        </label>
        <label>
          <span>Servicio</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>Elige una experiencia</option>
            {bookableServices.map((service) => <option key={service.slug} value={service.name}>{service.name}</option>)}
            <option>No estoy segura — quiero asesoría</option>
          </select>
        </label>
        <label>
          <span>Fecha preferida</span>
          <input name="date" type="date" required />
        </label>
        <label className="form-wide">
          <span>Horario ideal</span>
          <select name="time" required defaultValue="">
            <option value="" disabled>Selecciona un rango</option>
            <option>Mañana · 9:00 a 12:00</option><option>Tarde · 12:00 a 17:00</option>
            <option>Noche · 17:00 a 20:00</option>
          </select>
        </label>
        <label>
          <span>¿Es tu primera visita?</span>
          <select name="firstVisit" required defaultValue=""><option value="" disabled>Selecciona</option><option>Sí, es mi primera vez</option><option>No, ya soy clienta</option></select>
        </label>
        <label>
          <span>¿Necesitas retiro previo?</span>
          <select name="removal" required defaultValue=""><option value="" disabled>Selecciona</option><option>No</option><option>Sí, de uñas</option><option>Sí, de extensiones de pestañas</option><option>No estoy segura</option></select>
        </label>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>Acepto que Ángeles Studio use estos datos únicamente para coordinar mi solicitud de cita.</span>
      </label>
      <button className="button button-light" type="submit">Solicitar por WhatsApp <span aria-hidden="true">↗</span></button>
      <p className="form-note">La solicitud no confirma la cita. Nuestro equipo validará disponibilidad contigo.</p>
      {status === 'opened' && <p className="form-status" role="status">Abrimos WhatsApp con tu solicitud lista para enviar.</p>}
      {status === 'blocked' && <p className="form-status" role="alert">Tu navegador bloqueó la ventana. <a href={whatsappUrl} target="_blank" rel="noreferrer">Abrir WhatsApp en {business.whatsappDisplay}</a>.</p>}
    </form>
  );
}
