const categoriseQuestions = (userId, questions) => {
  const { answeredQuestions, unansweredQuestions } = questions.reduce(
    (previousQuestions, question) => {
      if (
        question.optionOne.votes.includes(userId) ||
        question.optionTwo.votes.includes(userId)
      ) {
        return {
          ...previousQuestions,
          answeredQuestions: [...previousQuestions.answeredQuestions, question],
        }
      }

      return {
        ...previousQuestions,
        unansweredQuestions: [
          ...previousQuestions.unansweredQuestions,
          question,
        ],
      }
    },
    {
      answeredQuestions: [],
      unansweredQuestions: [],
    }
  )
  return { answeredQuestions, unansweredQuestions }
}

export default categoriseQuestions
