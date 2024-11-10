export default (data, achievements) => {
  return data?.achievements
    ?.map((achievementId) => {
      const { code } =
        achievements?.find(
          (achievement) => achievement.id === Number(achievementId)
        ) || {}
      return code
    })
    .join('<br>')
}
