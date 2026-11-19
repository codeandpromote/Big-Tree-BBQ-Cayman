export interface InquiryFormInput {
  guestName: string;
  contact: string;
  occasion: string;
  partySize: string;
  preferredDate: string;
  notes: string;
}

export interface InquiryValidationErrors {
  guestName?: string;
  contact?: string;
  partySize?: string;
  notes?: string;
}

export interface InquiryValidationResult {
  isValid: boolean;
  errors: InquiryValidationErrors;
  sanitized: {
    guestName: string;
    contact: string;
    occasion: string;
    partySize: number;
    preferredDate: string;
    notes: string;
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGIT_PATTERN = /\d/g;

export function isValidContact(raw: string): boolean {
  const value = raw.trim();
  if (!value) return false;
  if (EMAIL_PATTERN.test(value)) return true;

  // Accept valid phone numbers (7 to 15 digits, allowing spaces, +, -, parentheses)
  if (/^[+\d\s().-]+$/.test(value)) {
    const digits = value.match(PHONE_DIGIT_PATTERN) ?? [];
    return digits.length >= 7 && digits.length <= 15;
  }

  return false;
}

export function validateInquiryForm(
  input: InquiryFormInput
): InquiryValidationResult {
  const errors: InquiryValidationErrors = {};

  const guestName = input.guestName.trim();
  const contact = input.contact.trim();
  const occasion = input.occasion.trim() || 'Group Platter Inquiry';
  const preferredDate = input.preferredDate.trim();
  const notes = input.notes.trim();
  const parsedPartySize = Number.parseInt(input.partySize.trim(), 10);

  if (guestName.length < 2) {
    errors.guestName = 'Please enter your name so we know who to address.';
  }

  if (!isValidContact(contact)) {
    errors.contact =
      'Please enter a valid phone number (e.g. 345-555-0192) or email address.';
  }

  if (
    Number.isNaN(parsedPartySize) ||
    parsedPartySize < 1 ||
    parsedPartySize > 150
  ) {
    errors.partySize = 'Please enter a group size between 1 and 150 guests.';
  }

  if (notes.length < 10) {
    errors.notes =
      'Please share a few details about the dishes or gathering you have in mind (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      guestName,
      contact,
      occasion,
      partySize: Number.isNaN(parsedPartySize) ? 0 : parsedPartySize,
      preferredDate,
      notes,
    },
  };
}
