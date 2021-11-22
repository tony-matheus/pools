const orderByTimestamp = (questions) =>
  questions.sort((a, b) => a.timestamp - b.timestamp)

export default orderByTimestamp
