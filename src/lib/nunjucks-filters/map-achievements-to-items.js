export default function mapAchievementsToItems(category) {
  const { achievements = [] } = category || {}
  return achievements.map(({ id, title, code, checked }) => {
    return {
      value: id,
      hint: { text: title },
      text: code,
      checked
    }
  })
}
