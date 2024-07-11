export const customId = (id: string) => {
  const lenght = id.length

  return `${id.slice(0, 4)}-${id.slice(length - 4)}`
}
