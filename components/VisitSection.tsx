'use client';

import { useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Check, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/menu-data';
import {
  getKitchenStatus,
  WEEKLY_SCHEDULE,
  type KitchenStatus,
} from '@/lib/hours';
import {
  validateInquiryForm,
  type InquiryFormInput,
  type InquiryValidationErrors,
} from '@/lib/inquiry-validation';

const INITIAL_FORM: InquiryFormInput = {
  guestName: '',
  contact: '',
  occasion: 'Group Platter Inquiry',
  partySize: '8',
  preferredDate: '',
  notes: '',
};

const OCCASION_OPTIONS = [
  'Group Platter Inquiry',
  'Sunday Heritage Pre-Order Call',
  'Family Celebration or Gathering',
  'East End Villa / Private Catering',
] as const;

let cachedMinuteBucket = -1;
let cachedStatus: KitchenStatus | null = null;

function subscribeToKitchenClock(onStoreChange: () => void): () => void {
  const intervalId = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(intervalId);
}

function getClientKitchenStatus(): KitchenStatus {
  const now = new Date();
  const minuteBucket = Math.floor(now.getTime() / 60_000);
  if (cachedMinuteBucket !== minuteBucket || cachedStatus === null) {
    cachedMinuteBucket = minuteBucket;
    cachedStatus = getKitchenStatus(now);
  }
  return cachedStatus;
}

function getServerKitchenStatus(): KitchenStatus | null {
  return null;
}

export function VisitSection() {
  const kitchenStatus = useSyncExternalStore(
    subscribeToKitchenClock,
    getClientKitchenStatus,
    getServerKitchenStatus
  );
  const [formData, setFormData] = useState<InquiryFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<{
    guestName: string;
    contact: string;
    occasion: string;
    partySize: number;
    preferredDate: string;
  } | null>(null);

  const handleFieldChange = (
    field: keyof InquiryFormInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof InquiryValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiryForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedSummary({
      guestName: validation.sanitized.guestName,
      contact: validation.sanitized.contact,
      occasion: validation.sanitized.occasion,
      partySize: validation.sanitized.partySize,
      preferredDate: validation.sanitized.preferredDate,
    });
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmittedSummary(null);
  };

  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="bg-[#F7F6F2] text-[#141312]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left Column: Address, Hours, Phone & Directions */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <p className="text-sm font-medium text-[#7A3A18]">
                Visit Gun Bay
              </p>
              <h2
                id="visit-heading"
                className="mt-3 font-serif text-[clamp(2.1rem,3.6vw,3.2rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#141312] [text-wrap:balance]"
              >
                Find us along Austin Connolly Drive.
              </h2>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.68] text-[#4A4641]">
                Follow the coastal road into Gun Bay on Grand Cayman&apos;s quiet East
                End. Look for the smoke rising from the pit and our tables beneath
                the big shade tree.
              </p>
            </div>

            {/* Address & Direct Telephone */}
            <div className="grid grid-cols-1 gap-8 border-t border-[#E4E1DA] pt-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.04em] text-[#59544E]">
                  Address
                </h3>
                <address className="mt-2.5 not-italic text-sm leading-[1.7] text-[#141312]">
                  {BUSINESS_INFO.addressLine1}
                  <br />
                  {BUSINESS_INFO.addressLine2}
                  <br />
                  Cayman Islands
                </address>
                <a
                  href={BUSINESS_INFO.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-[#7A3A18] underline decoration-[#7A3A18]/50 underline-offset-4 hover:text-[#141312] hover:decoration-[#141312]"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-[0.04em] text-[#59544E]">
                  Direct Telephone
                </h3>
                <div className="mt-2.5 space-y-2 text-sm tabular-nums">
                  <p>
                    <a
                      href={BUSINESS_INFO.primaryPhoneHref}
                      className="inline-flex min-h-[36px] items-center gap-2 font-medium text-[#141312] hover:text-[#7A3A18]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#7A3A18]" aria-hidden="true" />
                      <span>{BUSINESS_INFO.primaryPhoneDisplay}</span>
                    </a>
                  </p>
                  <p>
                    <a
                      href={BUSINESS_INFO.secondaryPhoneHref}
                      className="inline-flex min-h-[36px] items-center gap-2 text-[#4A4641] hover:text-[#141312]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#7A3A18]" aria-hidden="true" />
                      <span>{BUSINESS_INFO.secondaryPhoneDisplay}</span>
                    </a>
                  </p>
                </div>
                <p className="mt-3 text-xs leading-[1.6] text-[#59544E]">
                  Calling ahead is encouraged for Sunday stewed conch, stewed
                  turtle, or large family platters.
                </p>
              </div>
            </div>

            {/* Kitchen Schedule Table */}
            <div className="border-t border-[#E4E1DA] pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
                <h3 className="text-xs font-semibold tracking-[0.04em] text-[#59544E]">
                  Weekly Kitchen Hours
                </h3>
                {kitchenStatus && (
                  <p className="text-xs font-medium text-[#7A3A18]">
                    {kitchenStatus.statusLabel}
                    <span aria-hidden="true" className="mx-1.5 text-[#9E968B]">
                      ·
                    </span>
                    <span className="font-normal text-[#4A4641]">
                      {kitchenStatus.detailLabel}
                    </span>
                  </p>
                )}
              </div>

              <dl className="divide-y divide-[#E4E1DA] border-t border-b border-[#E4E1DA]">
                {WEEKLY_SCHEDULE.map((entry) => {
                  const isToday =
                    kitchenStatus?.currentDayIndex === entry.dayIndex;
                  return (
                    <div
                      key={entry.dayName}
                      className={`flex items-center justify-between py-3 text-sm ${
                        isToday ? 'font-semibold text-[#141312]' : 'text-[#423E3A]'
                      }`}
                    >
                      <dt className="flex items-center gap-2">
                        <span>{entry.dayName}</span>
                        {isToday && (
                          <span className="text-xs font-medium text-[#7A3A18]">
                            (Today)
                          </span>
                        )}
                      </dt>
                      <dd
                        className={`tabular-nums ${
                          entry.isOpen ? '' : 'text-[#6B655D]'
                        }`}
                      >
                        {entry.hoursLabel}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-4 text-xs leading-[1.6] text-[#59544E]">
                {BUSINESS_INFO.holidayNote}
              </p>
            </div>
          </div>

          {/* Right Column: Accessible Group Platter & Private Event Inquiry */}
          <div className="lg:col-span-6">
            <div className="border border-[#DEDAD0] bg-[#F2EFE8] p-6 sm:p-10">
              <p className="text-sm font-medium text-[#7A3A18]">
                Gatherings &amp; Group Platters
              </p>
              <h3 className="mt-2 font-serif text-3xl font-normal text-[#141312]">
                Planning a family lunch or East End gathering?
              </h3>
              <p className="mt-3 text-sm leading-[1.65] text-[#4A4641]">
                Share your preferred date, group size, and favorite dishes below.
                This inquiry prepares a note for our kitchen—for same-day meals,
                please call us directly.
              </p>

              {submittedSummary ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-8 border border-[#D4CFC4] bg-[#F7F6F2] p-6 space-y-4"
                >
                  <div className="flex items-center gap-2.5 text-[#141312]">
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-[#141312] text-[#F7F6F2]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h4 className="font-serif text-2xl font-normal">
                      Inquiry prepared for {submittedSummary.guestName}
                    </h4>
                  </div>

                  <p className="text-sm leading-[1.68] text-[#423E3A]">
                    Thank you for reaching out about{' '}
                    <span className="font-medium text-[#141312]">
                      {submittedSummary.occasion}
                    </span>{' '}
                    for{' '}
                    <span className="font-medium tabular-nums text-[#141312]">
                      {submittedSummary.partySize}{' '}
                      {submittedSummary.partySize === 1 ? 'guest' : 'guests'}
                    </span>
                    {submittedSummary.preferredDate
                      ? ` on ${submittedSummary.preferredDate}`
                      : ''}
                    . We will reach back out at{' '}
                    <span className="font-medium text-[#141312]">
                      {submittedSummary.contact}
                    </span>
                    .
                  </p>

                  <p className="text-xs text-[#59544E]">
                    Need immediate confirmation? Call the pit directly at{' '}
                    <a
                      href={BUSINESS_INFO.primaryPhoneHref}
                      className="font-medium text-[#7A3A18] underline underline-offset-4"
                    >
                      {BUSINESS_INFO.primaryPhoneDisplay}
                    </a>
                    .
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[44px] items-center justify-center border border-[#141312] px-5 py-2.5 text-sm font-medium text-[#141312] hover:bg-[#141312] hover:text-[#F7F6F2] transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-semibold text-[#141312] mb-1.5"
                    >
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="guestName"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.guestName}
                      onChange={(e) =>
                        handleFieldChange('guestName', e.target.value)
                      }
                      aria-invalid={Boolean(errors.guestName)}
                      aria-describedby={
                        errors.guestName ? 'inquiry-name-error' : undefined
                      }
                      placeholder="e.g. Elena Bodden"
                      className="min-h-[44px] w-full border border-[#D4CFC4] bg-[#F7F6F2] px-3.5 py-2.5 text-sm text-[#141312] placeholder:text-[#6E6860] focus:border-[#843E1A] focus:outline-none"
                    />
                    {errors.guestName && (
                      <p
                        id="inquiry-name-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#9B2226]"
                      >
                        {errors.guestName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-contact"
                      className="block text-xs font-semibold text-[#141312] mb-1.5"
                    >
                      Phone Number or Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="inquiry-contact"
                      name="contact"
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) =>
                        handleFieldChange('contact', e.target.value)
                      }
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={
                        errors.contact ? 'inquiry-contact-error' : undefined
                      }
                      placeholder="+1 (345) 555-0192 or you@example.com"
                      className="min-h-[44px] w-full border border-[#D4CFC4] bg-[#F7F6F2] px-3.5 py-2.5 text-sm text-[#141312] placeholder:text-[#6E6860] focus:border-[#843E1A] focus:outline-none"
                    />
                    {errors.contact && (
                      <p
                        id="inquiry-contact-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#9B2226]"
                      >
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-occasion"
                        className="block text-xs font-semibold text-[#141312] mb-1.5"
                      >
                        Occasion
                      </label>
                      <select
                        id="inquiry-occasion"
                        name="occasion"
                        value={formData.occasion}
                        onChange={(e) =>
                          handleFieldChange('occasion', e.target.value)
                        }
                        className="min-h-[44px] w-full border border-[#D4CFC4] bg-[#F7F6F2] px-3.5 py-2.5 text-sm text-[#141312] focus:border-[#843E1A] focus:outline-none"
                      >
                        {OCCASION_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-party-size"
                        className="block text-xs font-semibold text-[#141312] mb-1.5"
                      >
                        Estimated Guests <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="inquiry-party-size"
                        name="partySize"
                        type="number"
                        min={1}
                        max={150}
                        required
                        value={formData.partySize}
                        onChange={(e) =>
                          handleFieldChange('partySize', e.target.value)
                        }
                        aria-invalid={Boolean(errors.partySize)}
                        aria-describedby={
                          errors.partySize
                            ? 'inquiry-party-size-error'
                            : undefined
                        }
                        className="min-h-[44px] w-full border border-[#D4CFC4] bg-[#F7F6F2] px-3.5 py-2.5 text-sm tabular-nums text-[#141312] focus:border-[#843E1A] focus:outline-none"
                      />
                      {errors.partySize && (
                        <p
                          id="inquiry-party-size-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#9B2226]"
                        >
                          {errors.partySize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-date"
                      className="block text-xs font-semibold text-[#141312] mb-1.5"
                    >
                      Preferred Date (Optional)
                    </label>
                    <input
                      id="inquiry-date"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        handleFieldChange('preferredDate', e.target.value)
                      }
                      className="min-h-[44px] w-full border border-[#D4CFC4] bg-[#F7F6F2] px-3.5 py-2.5 text-sm tabular-nums text-[#141312] focus:border-[#843E1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-notes"
                      className="block text-xs font-semibold text-[#141312] mb-1.5"
                    >
                      Dishes &amp; Details <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="inquiry-notes"
                      name="notes"
                      rows={4}
                      required
                      value={formData.notes}
                      onChange={(e) =>
                        handleFieldChange('notes', e.target.value)
                      }
                      aria-invalid={Boolean(errors.notes)}
                      aria-describedby={
                        errors.notes ? 'inquiry-notes-error' : undefined
                      }
                      placeholder="Let us know which pit meats, Sunday specials, or sides you are hoping to arrange..."
                      className="w-full border border-[#D4CFC4] bg-[#F7F6F2] px-3.5 py-2.5 text-sm leading-[1.6] text-[#141312] placeholder:text-[#6E6860] focus:border-[#843E1A] focus:outline-none"
                    />
                    {errors.notes && (
                      <p
                        id="inquiry-notes-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#9B2226]"
                      >
                        {errors.notes}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center bg-[#141312] px-6 py-3 text-sm font-medium text-[#F7F6F2] transition-colors duration-150 hover:bg-[#843E1A]"
                  >
                    Send Gathering Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
