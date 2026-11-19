import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidContact, validateInquiryForm } from './inquiry-validation';

test('isValidContact accepts valid email and phone formats and rejects invalid input', () => {
  assert.equal(isValidContact('guest@cayman.ky'), true);
  assert.equal(isValidContact('+1 (345) 938-8314'), true);
  assert.equal(isValidContact('345-555-0192'), true);
  assert.equal(isValidContact('12345'), false);
  assert.equal(isValidContact('not-an-email'), false);
  assert.equal(isValidContact(''), false);
});

test('validateInquiryForm returns structured field errors for empty submission', () => {
  const result = validateInquiryForm({
    guestName: '  ',
    contact: '',
    occasion: '',
    partySize: '',
    preferredDate: '',
    notes: 'short',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.guestName);
  assert.ok(result.errors.contact);
  assert.ok(result.errors.partySize);
  assert.ok(result.errors.notes);
});

test('validateInquiryForm succeeds and trims valid group platter inquiry', () => {
  const result = validateInquiryForm({
    guestName: '  Elena Bodden ',
    contact: ' +1 (345) 555-0148 ',
    occasion: 'Sunday Family Gathering',
    partySize: '12',
    preferredDate: '2026-12-06',
    notes: 'Interested in baby back ribs, stewed conch, and cassava cake for Sunday afternoon.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.guestName, 'Elena Bodden');
  assert.equal(result.sanitized.partySize, 12);
});

test('validateInquiryForm rejects out-of-range party sizes', () => {
  const tooLarge = validateInquiryForm({
    guestName: 'Marcus Ebanks',
    contact: 'marcus@example.com',
    occasion: 'Catering',
    partySize: '300',
    preferredDate: '',
    notes: 'Planning an East End reception dinner for our visiting family.',
  });

  assert.equal(tooLarge.isValid, false);
  assert.ok(tooLarge.errors.partySize);
});
