// Conversion of date format from DD.MM.YYYY to YYYY-MM-DD
export const convertToISODate = (date: string): string => {
  const [day, month, year] = date.split('.').map(Number)
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
