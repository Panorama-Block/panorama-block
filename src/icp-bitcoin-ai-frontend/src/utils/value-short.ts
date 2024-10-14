export const valueShort = (value: number) => {
  const newValue = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value)

  return newValue
}