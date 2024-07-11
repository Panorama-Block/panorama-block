export const dayInterval = (date1: any, date2: any) => {
  date1 = new Date(date1 * 1000)
  date2 = new Date(date2 * 1000)
  const difference = date1 - date2;

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  return daysDifference
}
