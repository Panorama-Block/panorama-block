export const customId = (id: string) => {
  const length = id.length

  return `${id.slice(0, 4)}-${id.slice(length - 4)}`
}
