import assert from 'node:assert/strict';
import test from 'node:test';
import { buildBookingSlots, dateKey, formatPreferredDate, getLimaDateParts, getLimaMinutes } from './booking-time.ts';

test('Lima date and time do not depend on the visitor time zone', () => {
  const now = new Date('2026-01-01T03:30:00.000Z');
  assert.deepEqual(getLimaDateParts(now), { year: 2025, month: 12, day: 31 });
  assert.equal(getLimaMinutes(now), 22 * 60 + 30);
});

test('preferred date includes the year', () => {
  const date = { year: 2026, month: 10, day: 18 };
  assert.equal(dateKey(date), '2026-10-18');
  assert.match(formatPreferredDate(date), /2026$/);
});

test('a service longer than the working day does not create a time slot', () => {
  assert.deepEqual(buildBookingSlots('10:00', '20:30', 631), []);
});

test('slots fit the selected service before closing', () => {
  const slots = buildBookingSlots('10:00', '20:30', 120);
  assert.ok(slots.length > 0);
  assert.equal(slots.at(-1), '6:30 p.m.');
});
