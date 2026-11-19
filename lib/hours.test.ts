import test from 'node:test';
import assert from 'node:assert/strict';
import { getKitchenStatus } from './hours';

// Cayman Islands is UTC-5 year-round (EST).
// Example: 2026-11-16 is a Monday.

test('returns closed all day on Monday in Cayman time', () => {
  // Monday 1:00 PM Cayman = 18:00 UTC
  const mondayAfternoon = new Date('2026-11-16T18:00:00Z');
  const status = getKitchenStatus(mondayAfternoon);
  assert.equal(status.isOpen, false);
  assert.equal(status.statusLabel, 'Closed today');
  assert.match(status.detailLabel, /Tuesday at 11:00 AM/);
});

test('returns open at exact 11:00 AM opening on Tuesday', () => {
  // Tuesday 11:00 AM Cayman = 16:00 UTC
  const tuesdayOpen = new Date('2026-11-17T16:00:00Z');
  const status = getKitchenStatus(tuesdayOpen);
  assert.equal(status.isOpen, true);
  assert.equal(status.statusLabel, 'Open for service');
  assert.match(status.detailLabel, /6:30 PM/);
});

test('returns preparing before 11:00 AM on open days', () => {
  // Thursday 9:30 AM Cayman = 14:30 UTC
  const thursdayMorning = new Date('2026-11-19T14:30:00Z');
  const status = getKitchenStatus(thursdayMorning);
  assert.equal(status.isOpen, false);
  assert.equal(status.statusLabel, 'Preparing the pit');
  assert.match(status.detailLabel, /Opens today at 11:00 AM/);
});

test('returns closed at exact 6:30 PM closing on Sunday and notes Tuesday reopening', () => {
  // Sunday 2026-11-22 6:30 PM Cayman = 23:30 UTC
  const sundayClosing = new Date('2026-11-22T23:30:00Z');
  const status = getKitchenStatus(sundayClosing);
  assert.equal(status.isOpen, false);
  assert.equal(status.statusLabel, 'Closed for the evening');
  assert.match(status.detailLabel, /Tuesday at 11:00 AM/);
});

test('returns closed after 6:30 PM on Wednesday and notes Thursday reopening', () => {
  // Wednesday 2026-11-18 7:00 PM Cayman = 2026-11-19T00:00:00Z
  const wednesdayEvening = new Date('2026-11-19T00:00:00Z');
  const status = getKitchenStatus(wednesdayEvening);
  assert.equal(status.isOpen, false);
  assert.match(status.detailLabel, /Reopens Thursday at 11:00 AM/);
});
