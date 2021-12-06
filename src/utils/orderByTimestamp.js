const orderByTimestamp = (questions) =>
  questions.sort((a, b) => b.timestamp - a.timestamp)

export default orderByTimestamp
