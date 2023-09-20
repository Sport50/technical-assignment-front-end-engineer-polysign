import { DateTime } from "luxon";

export const getHumanReadableDate = (date: string): string => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}