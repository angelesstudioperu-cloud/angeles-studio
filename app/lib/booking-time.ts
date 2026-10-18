export const BOOKING_TIME_ZONE = 'America/Lima';

export type DateParts = { year: number; month: number; day: number };

export function getLimaDateParts(now = new Date()): DateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day') };
}

export function getLimaMinutes(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  return value('hour') * 60 + value('minute');
}

export function dateKey({ year, month, day }: DateParts) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function formatPreferredDate({ year, month, day }: DateParts) {
  const weekday = new Intl.DateTimeFormat('es-PE', { weekday: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day, 12)));
  const monthName = new Intl.DateTimeFormat('es-PE', { month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day, 12)));
  return `${weekday} ${day} de ${monthName} de ${year}`;
}

function clockLabel(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const suffix = hours >= 12 ? 'p.m.' : 'a.m.';
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return `${minutes === 0 ? twelve : `${twelve}:${String(minutes).padStart(2, '0')}`} ${suffix}`;
}

export function buildBookingSlots(opens: string, closes: string, durationMinutes: number) {
  const toMinutes = (clock: string) => {
    const [hours, minutes] = clock.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const open = toMinutes(opens);
  const close = toMinutes(closes);
  const duration = Math.max(durationMinutes, 60);
  const last = close - duration;
  if (duration > close - open || last < open) return [];

  const slots: number[] = [];
  for (let minute = open; minute <= last; minute += 60) slots.push(minute);
  if (slots[slots.length - 1] !== last) slots.push(last);
  return slots.map(clockLabel);
}
