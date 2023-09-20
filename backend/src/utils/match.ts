const formatMatchForResponse = (match) => ({
  id: match.id,
  title: match.title,
  hasPassword: !!match.password,
  status: match.status
})

export default { formatMatchForResponse }