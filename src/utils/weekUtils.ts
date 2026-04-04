/** Retourne l'ID ISO d'une semaine sous la forme "YYYY-WNN" */
export function getWeekId(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  // Le jeudi de la semaine courante détermine l'année ISO
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const weekNum =
    1 +
    Math.round(
      ((d.getTime() - jan4.getTime()) / 86400000 -
        3 +
        ((jan4.getDay() + 6) % 7)) /
        7
    );
  return `${year}-W${weekNum.toString().padStart(2, '0')}`;
}

/** Retourne la date du lundi de la semaine donnée */
export function getWeekStartDate(weekId: string): Date {
  const [yearStr, weekStr] = weekId.split('-W');
  const year = parseInt(yearStr);
  const weekNum = parseInt(weekStr);
  // 4 janvier est toujours en semaine 1
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = (jan4.getDay() + 6) % 7; // lundi = 0
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - dayOfWeek + (weekNum - 1) * 7);
  return monday;
}

/** Retourne les 7 dates (lun → dim) de la semaine */
export function getWeekDates(weekId: string): Date[] {
  const start = getWeekStartDate(weekId);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/** Semaine précédente */
export function prevWeekId(weekId: string): string {
  const start = getWeekStartDate(weekId);
  start.setDate(start.getDate() - 7);
  return getWeekId(start);
}

/** Semaine suivante */
export function nextWeekId(weekId: string): string {
  const start = getWeekStartDate(weekId);
  start.setDate(start.getDate() + 7);
  return getWeekId(start);
}

const MOIS = [
  'jan', 'fév', 'mar', 'avr', 'mai', 'juin',
  'juil', 'août', 'sep', 'oct', 'nov', 'déc',
];

/** Label lisible : "31 mar – 6 avr 2026" */
export function getWeekLabel(weekId: string): string {
  const dates = getWeekDates(weekId);
  const first = dates[0];
  const last = dates[6];
  const sameMonth = first.getMonth() === last.getMonth();
  const sameYear = first.getFullYear() === last.getFullYear();

  const fmt = (d: Date, withYear = false) =>
    `${d.getDate()} ${MOIS[d.getMonth()]}${withYear ? ` ${d.getFullYear()}` : ''}`;

  if (sameMonth && sameYear) {
    return `${first.getDate()} – ${last.getDate()} ${MOIS[last.getMonth()]} ${last.getFullYear()}`;
  }
  if (sameYear) {
    return `${fmt(first)} – ${fmt(last, true)}`;
  }
  return `${fmt(first, true)} – ${fmt(last, true)}`;
}

/** Vérifie si une date est aujourd'hui */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
