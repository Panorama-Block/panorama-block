export const dayInterval = (date1: any, date2: any) => {
  date1 = new Date(date1)
  date2 = new Date(date2)
  const difference = date1 - date2;

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  return daysDifference
}

export const getLastDay = (date: any) => {
  const lastDay = new Date(date.getTime() - 86400000)
  return lastDay
}

export const getLastWeek = (date: any) => {
  const lastWeek = new Date(date.getTime() - 86400000 * 7)
  return lastWeek
}

export const hoursInterval = (date1: any, date2: any) => {
  date1 = new Date(date1)
  date2 = new Date(date2)
  const difference = date1 - date2

  const hoursInterval = Math.floor(difference / 1000 / 60 / 60);
  return hoursInterval
}

export const minutesInterval = (date1: any, date2: any) => {
  date1 = new Date(date1)
  date2 = new Date(date2)
  const difference = date1 - date2

  const minutesInterval = Math.floor(difference / 1000 / 60);
  return minutesInterval
}
