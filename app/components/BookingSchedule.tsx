'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { business } from '../content/business';
import { buildBookingSlots, dateKey, formatPreferredDate, getLimaDateParts, getLimaMinutes, type DateParts } from '../lib/booking-time';

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
];
const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

/** Cuántos meses hacia adelante se puede navegar. */
const MONTHS_AHEAD = 3;
type ClockSnapshot = { today: DateParts; minutes: number };
let clockSnapshot: ClockSnapshot | null = null;

function getClockSnapshot() {
  const today = getLimaDateParts();
  const minutes = getLimaMinutes();
  if (!clockSnapshot || dateKey(clockSnapshot.today) !== dateKey(today) || clockSnapshot.minutes !== minutes) {
    clockSnapshot = { today, minutes };
  }
  return clockSnapshot;
}

function subscribeToClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(timer);
}

/** Duración por defecto mientras no hay servicio elegido. */
const DEFAULT_DURATION = 60;

/** Lunes primero: el domingo (0) pasa al final de la semana. */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

/**
 * Calendario para elegir preferencias de fecha y hora, sin consultar disponibilidad.
 * Ambos paneles comparten fila de rejilla, así que miden exactamente lo mismo.
 */
export function BookingSchedule({ durationMinutes = DEFAULT_DURATION, invalid = false }: {
  /** Duración del servicio elegido: recorta las últimas horas del día. */
  durationMinutes?: number;
  /** El formulario avisa cuando se intentó enviar sin fecha ni hora. */
  invalid?: boolean;
} = {}) {
  const clock = useSyncExternalStore(subscribeToClock, getClockSnapshot, () => null);
  const today = clock?.today ?? null;
  const [viewOverride, setViewOverride] = useState<{ year: number; month: number } | null>(null);
  const view = useMemo(
    () => viewOverride ?? (today ? { year: today.year, month: today.month - 1 } : null),
    [viewOverride, today],
  );
  const [day, setDay] = useState<DateParts | null>(null);
  const [time, setTime] = useState('');

  const slots = useMemo(() => buildBookingSlots(business.hours.opens, business.hours.closes, durationMinutes), [durationMinutes]);

  const monthOffset = view && today ? (view.year - today.year) * 12 + (view.month - (today.month - 1)) : 0;

  const availableSlots = slots.filter((slot) => {
    if (!day || !today || dateKey(day) !== dateKey(today)) return true;
    const [timeText, suffix] = slot.split(' ');
    const [hoursText, minuteText = '0'] = timeText.split(':');
    let hours = Number(hoursText) % 12;
    if (suffix === 'p.m.') hours += 12;
    return hours * 60 + Number(minuteText) > (clock?.minutes ?? 0);
  });

  // Recalcular la selección al cambiar fecha, hora actual o duración.
  const activeTime = availableSlots.includes(time) ? time : '';

  const cells = useMemo(() => {
    if (!view) return [];
    const first = new Date(view.year, view.month, 1);
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const blanks = mondayIndex(first);
    const list: (DateParts | null)[] = Array.from({ length: blanks }, () => null);
    for (let number = 1; number <= daysInMonth; number += 1) list.push({ year: view.year, month: view.month + 1, day: number });
    return list;
  }, [view]);

  function shiftMonth(step: number) {
    if (!view) return;
    const next = new Date(view.year, view.month + step, 1);
    setViewOverride({ year: next.getFullYear(), month: next.getMonth() });
  }

  const dateValue = day && today && dateKey(day) >= dateKey(today) ? formatPreferredDate(day) : '';

  return (
    <div className={`schedule field-wide${invalid ? ' is-invalid' : ''}`}>
      <div className="schedule-panel schedule-calendar">
        <div className="schedule-head">
          <span className="schedule-label">Día preferido</span>
          <div className="schedule-nav">
            <button type="button" onClick={() => shiftMonth(-1)} disabled={!view || monthOffset <= 0} aria-label="Mes anterior">
              ‹
            </button>
            <strong aria-live="polite">
              {view ? `${MONTHS[view.month]} ${view.year}` : 'Cargando fechas…'}
            </strong>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              disabled={!view || monthOffset >= MONTHS_AHEAD}
              aria-label="Mes siguiente"
            >
              ›
            </button>
          </div>
        </div>

        <div className="schedule-weekdays" aria-hidden="true">
          {WEEKDAYS.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>

        <div className="schedule-days" role="group" aria-label="Elige el día de tu cita">
          {cells.map((cell, index) => {
            if (!cell) return <span key={`blank-${index}`} className="schedule-day is-blank" />;
            const date = new Date(cell.year, cell.month - 1, cell.day);
            const closed = date.getDay() === 0;
            const past = !today || dateKey(cell) < dateKey(today);
            const picked = day !== null && dateKey(day) === dateKey(cell);
            return (
              <button
                key={dateKey(cell)}
                type="button"
                className={`schedule-day${picked ? ' is-picked' : ''}`}
                disabled={closed || past}
                aria-pressed={picked}
                aria-label={formatPreferredDate(cell)}
                onClick={() => { setDay(cell); setTime(''); }}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        <p className="schedule-foot">{business.hours.closed}</p>
      </div>

      {/* El interior va en posición absoluta: así la lista de horas nunca
          estira la fila y el panel mide exactamente lo que el calendario. */}
      <div className="schedule-panel schedule-times">
        <div className="schedule-times-inner">
          <div className="schedule-head">
            <span className="schedule-label">Hora preferida</span>
            <small>{availableSlots.length} preferencias</small>
          </div>
          <div className="schedule-times-scroll">
            <div className="schedule-times-list" role="group" aria-label="Elige la hora de tu cita">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`schedule-slot${activeTime === slot ? ' is-picked' : ''}`}
                  aria-pressed={activeTime === slot}
                  onClick={() => setTime(activeTime === slot ? '' : slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          {day && today && dateKey(day) === dateKey(today) && availableSlots.length === 0 && slots.length > 0 && (
            <p className="schedule-preference-note">No quedan horas futuras para hoy. Elige otro día o consulta por WhatsApp.</p>
          )}
        </div>
      </div>

      <p className="schedule-preference-note">Estas son preferencias; la disponibilidad se confirma al coordinar la cita.</p>
      {slots.length === 0 && <p className="schedule-preference-note">Este servicio supera el horario de atención. Consulta por WhatsApp.</p>}

      <input type="hidden" name="date" value={dateValue} />
      <input type="hidden" name="time" value={activeTime} />
    </div>
  );
}
