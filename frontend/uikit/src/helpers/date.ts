import { parse, format, isValid } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (date: Date, formatString: string) =>
  format(date, formatString, { locale: ru });

export const parseDate = (
  dateString: string,
  formatString: string,
  referenceDate?: number | Date
) => parse(dateString, formatString, referenceDate || new Date());

export { isValid };
