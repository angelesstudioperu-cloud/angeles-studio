'use client';

import { useMemo, useState } from 'react';
import { business } from '../content/business';

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
];
const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** Cuántos meses hacia adelante se puede navegar. */
const MONTHS_AHEAD = 3;

function toMinutes(hhmm: string) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
}

/** 13:00 → «1 p.m.»; las horas en punto se leen sin los dos ceros. */
function toClockLabel(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const suffix = hours >= 12 ? 'p.m.' : 'a.m.';
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  const clock = minutes === 0 ? `${twelve}` : `${twelve}:${String(minutes).padStart(2, '0')}`;
  return `${clock} ${suffix}`;
}

/** Duración por defecto mientras no hay servicio elegido. */
const DEFAULT_DURATION = 60;

/**
 * Una hora en punto desde que abre el salón hasta la última a la que el
 * servicio todavía termina antes del cierre, más ese último tramo exacto
 * cuando no cae en punto.
 */
function buildSlots(durationMinutes: number) {
  const open = toMinutes(business.hours.opens);
  const last = toMinutes(business.hours.closes) - Math.max(durationMinutes, DEFAULT_DURATION);
  const slots: number[] = [];
  if (last < open) return [toClockLabel(open)];
  for (let minute = open; minute <= last; minute += 60) slots.push(minute);
  if (slots[slots.length - 1] !== last) slots.push(last);
  return slots.map(toClockLabel);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Lunes primero: el domingo (0) pasa al final de la semana. */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

/**
 * Calendario siempre abierto y lista de horas con su propio desplazamiento.
 * Ambos paneles comparten fila de rejilla, así que miden exactamente lo mismo.
 */
export function BookingSchedule({ durationMinutes = DEFAULT_DURATION, invalid = false }: {
  /** Duración del servicio elegido: recorta las últimas horas del día. */
  durationMinutes?: number;
  /** El formulario avisa cuando se intentó enviar sin fecha ni hora. */
  invalid?: boolean;
} = {}) {
  const today = useMemo(() => startOfToday(), []);
  const [view, setView] = useState(() => ({ year: today.getFullYear(), month: today.getMonth() }));
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState('');

  const slots = useMemo(() => buildSlots(durationMinutes), [durationMinutes]);

  // Si el servicio nuevo termina más tarde, la hora elegida puede dejar de
  // caber: se deriva en vez de guardarse para no arrastrar un valor inválido.
  const activeTime = slots.includes(time) ? time : '';

  const monthOffset = (view.year - today.getFullYear()) * 12 + (view.month - today.getMonth());

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const blanks = mondayIndex(first);
    const list: (Date | null)[] = Array.from({ length: blanks }, () => null);
    for (let number = 1; number <= daysInMonth; number += 1) list.push(new Date(view.year, view.month, number));
    return list;
  }, [view]);

  function shiftMonth(step: number) {
    setView((current) => {
      const next = new Date(current.year, current.month + step, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  const dateValue = day
    ? `${DAY_NAMES[day.getDay()]} ${day.getDate()} de ${MONTHS[day.getMonth()]}`
    : '';

  return (
    <div className={`schedule field-wide${invalid ? ' is-invalid' : ''}`}>
      <div className="schedule-panel schedule-calendar">
        <div className="schedule-head">
          <span className="schedule-label">Fecha</span>
          <div className="schedule-nav">
            <button type="button" onClick={() => shiftMonth(-1)} disabled={monthOffset <= 0} aria-label="Mes anterior">
              ‹
            </button>
            <strong aria-live="polite">
              {MONTHS[view.month]} {view.year}
            </strong>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              disabled={monthOffset >= MONTHS_AHEAD}
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
            const closed = cell.getDay() === 0;
            const past = cell.getTime() < today.getTime();
            const picked = day?.getTime() === cell.getTime();
            return (
              <button
                key={cell.toISOString()}
                type="button"
                className={`schedule-day${picked ? ' is-picked' : ''}`}
                disabled={closed || past}
                aria-pressed={picked}
                aria-label={`${DAY_NAMES[cell.getDay()]} ${cell.getDate()} de ${MONTHS[cell.getMonth()]}`}
                onClick={() => setDay(cell)}
              >
                {cell.getDate()}
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
            <span className="schedule-label">Hora</span>
            <small>{slots.length} horarios</small>
          </div>
          <div className="schedule-times-scroll">
            <div className="schedule-times-list" role="group" aria-label="Elige la hora de tu cita">
              {slots.map((slot) => (
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
        </div>
      </div>

      <input type="hidden" name="date" value={dateValue} />
      <input type="hidden" name="time" value={activeTime} />
    </div>
  );
}
