export default () => {
  const today = new Date()
  return today.getFullYear() + (today.getMonth() > 10 ? 1 : 0)
}
