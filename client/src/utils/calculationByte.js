export default (number) => {
  if (number < 1000) {
    return `${number} б`
  }
  if (number < 1000000) {
    return `${Math.floor(number / 1024)} Кб`
  }
  if (number < 1000000000) {
    return `${Math.floor((number / 1024) / 1024) } Мб`
  }
}