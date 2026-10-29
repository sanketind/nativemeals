function utcDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/** Calendar date in India, as YYYY-MM-DD. */
export function indiaTodayIso(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addIsoDays(iso: string, days: number) {
  const date = utcDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function mondayOf(iso: string) {
  const day = utcDate(iso).getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addIsoDays(iso, diff);
}

export function sundayOf(iso: string) {
  return addIsoDays(mondayOf(iso), 6);
}

export function formatWeekday(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    timeZone: "UTC",
  }).format(utcDate(iso));
}

/** "26 OCT" */
export function formatDayMonth(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  })
    .format(utcDate(iso))
    .toUpperCase();
}

/** "26–27 Oct" or "30 Oct – 2 Nov" */
export function formatRange(start: string, end: string) {
  const startDate = utcDate(start);
  const endDate = utcDate(end);
  const dayMonth = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  if (start === end) return dayMonth.format(startDate);

  const sameMonth =
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCFullYear() === endDate.getUTCFullYear();

  if (sameMonth) {
    const month = new Intl.DateTimeFormat("en-GB", {
      month: "short",
      timeZone: "UTC",
    }).format(startDate);
    return `${startDate.getUTCDate()}–${endDate.getUTCDate()} ${month}`;
  }

  return `${dayMonth.format(startDate)} – ${dayMonth.format(endDate)}`;
}

/** "2 Nov 2026", for an enquiry. */
export function formatSpokenDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(utcDate(iso));
}

export function isValidIsoDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [year, month, day] = iso.split("-").map(Number);
  const date = utcDate(iso);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
