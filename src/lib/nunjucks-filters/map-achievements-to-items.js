export default function mapAchievementsToItems(category) {
  return category.achievements.map(({ id, title, code, checked }) => {
    return {
      value: id,
      hint: { text: title },
      text: code,
      checked
    }
  })
}
