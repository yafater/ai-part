import moment from 'jalali-moment';

export function PersianToDate(
  persianDate: string,
  inputFormat: string = 'YYYY-MM-DD HH:mm',
): Date {
  return moment.from(persianDate, 'fa', inputFormat).toDate();
}

export function GetTimeDiffInMinutes(
  timestamp1: number,
  timestamp2: number,
): number {
  const diff = (timestamp2 - timestamp1) / (1000 * 60);
  return diff <= 0 ? 0 : diff;
}
