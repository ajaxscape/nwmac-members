export default () => {
  const today = new Date()
  return (
    today.getFullYear() + (today.getMonth() > 9 && today.getDate() > 15 ? 1 : 0)
  )
}
