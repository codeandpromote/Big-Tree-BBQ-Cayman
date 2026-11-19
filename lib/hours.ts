export interface DaySchedule {
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  isOpen: boolean;
  openMinutes: number | null; // minutes since midnight
  closeMinutes: number | null;
  hoursLabel: string;
}

export interface KitchenStatus {
  isOpen: boolean;
  statusLabel: string;
  detailLabel: string;
  currentDayIndex: number;
}

export const WEEKLY_SCHEDULE: readonly DaySchedule[] = [
  {
    dayIndex: 1,
    dayName: 'Monday',
    isOpen: false,
    openMinutes: null,
    closeMinutes: null,
    hoursLabel: 'Closed',
  },
  {
    dayIndex: 2,
    dayName: 'Tuesday',
    isOpen: true,
    openMinutes: 11 * 60,
    closeMinutes: 18 * 60 + 30,
    hoursLabel: '11:00 AM – 6:30 PM',
  },
  {
    dayIndex: 3,
    dayName: 'Wednesday',
    isOpen: true,
    openMinutes: 11 * 60,
    closeMinutes: 18 * 60 + 30,
    hoursLabel: '11:00 AM – 6:30 PM',
  },
  {
    dayIndex: 4,
    dayName: 'Thursday',
    isOpen: true,
    openMinutes: 11 * 60,
    closeMinutes: 18 * 60 + 30,
    hoursLabel: '11:00 AM – 6:30 PM',
  },
  {
    dayIndex: 5,
    dayName: 'Friday',
    isOpen: true,
    openMinutes: 11 * 60,
    closeMinutes: 18 * 60 + 30,
    hoursLabel: '11:00 AM – 6:30 PM',
  },
  {
    dayIndex: 6,
    dayName: 'Saturday',
    isOpen: true,
    openMinutes: 11 * 60,
    closeMinutes: 18 * 60 + 30,
    hoursLabel: '11:00 AM – 6:30 PM',
  },
  {
    dayIndex: 0,
    dayName: 'Sunday',
    isOpen: true,
    openMinutes: 11 * 60,
    closeMinutes: 18 * 60 + 30,
    hoursLabel: '11:00 AM – 6:30 PM',
  },
];

const CAYMAN_UTC_OFFSET_MINUTES = -5 * 60; // Cayman Islands is EST (UTC-5) year-round

/**
 * Converts any Date instant to Cayman Islands wall-clock day of week and minutes since midnight.
 */
export function getCaymanWallClock(date: Date): {
  dayIndex: number;
  minutesSinceMidnight: number;
} {
  const shiftedMs = date.getTime() + CAYMAN_UTC_OFFSET_MINUTES * 60 * 1000;
  const caymanDate = new Date(shiftedMs);
  return {
    dayIndex: caymanDate.getUTCDay(),
    minutesSinceMidnight:
      caymanDate.getUTCHours() * 60 + caymanDate.getUTCMinutes(),
  };
}

/**
 * Determines current open/closed status for Big Tree BBQ in East End, Grand Cayman.
 */
export function getKitchenStatus(now: Date = new Date()): KitchenStatus {
  const { dayIndex, minutesSinceMidnight } = getCaymanWallClock(now);
  const today = WEEKLY_SCHEDULE.find((entry) => entry.dayIndex === dayIndex);

  if (!today || !today.isOpen || today.openMinutes === null || today.closeMinutes === null) {
    return {
      isOpen: false,
      statusLabel: 'Closed today',
      detailLabel: 'Reopens Tuesday at 11:00 AM (Cayman time)',
      currentDayIndex: dayIndex,
    };
  }

  if (minutesSinceMidnight < today.openMinutes) {
    return {
      isOpen: false,
      statusLabel: 'Preparing the pit',
      detailLabel: `Opens today at 11:00 AM · ${today.dayName}`,
      currentDayIndex: dayIndex,
    };
  }

  if (minutesSinceMidnight >= today.openMinutes && minutesSinceMidnight < today.closeMinutes) {
    return {
      isOpen: true,
      statusLabel: 'Open for service',
      detailLabel: `Serving until 6:30 PM today · ${today.dayName}`,
      currentDayIndex: dayIndex,
    };
  }

  // After 6:30 PM
  const nextDayIndex = (dayIndex + 1) % 7;
  if (nextDayIndex === 1) {
    return {
      isOpen: false,
      statusLabel: 'Closed for the evening',
      detailLabel: 'Closed Monday · Reopens Tuesday at 11:00 AM',
      currentDayIndex: dayIndex,
    };
  }

  const nextDay = WEEKLY_SCHEDULE.find((entry) => entry.dayIndex === nextDayIndex);
  return {
    isOpen: false,
    statusLabel: 'Closed for the evening',
    detailLabel: `Reopens ${nextDay?.dayName ?? 'tomorrow'} at 11:00 AM`,
    currentDayIndex: dayIndex,
  };
}
