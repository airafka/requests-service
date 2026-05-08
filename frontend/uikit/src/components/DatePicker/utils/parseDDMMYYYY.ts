export function parseDDMMYYYY(dateStr: string | null | undefined): Date | null {
  if (!dateStr || typeof dateStr !== "string") {
    return null;
  }
  const [day, month, year] = dateStr.split(".");
  if (!day || !month || !year) {
    return null;
  }
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(date.getTime()) ? null : date;
}
