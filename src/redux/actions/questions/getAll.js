import { _getQuestions } from '../../../utils/_DATA'
import { QUESTION_GET_ALL_SUCCESS, QUESTION_GET_ALL } from '../../actionTypes'

const getQuestions = (userId, questions) => {
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

const orderByTimestamp = (questions) =>
  questions.sort((a, b) => a.timestamp - b.timestamp)

export default (userId) => async (dispatch) => {
  dispatch({ type: QUESTION_GET_ALL })
  const response = await _getQuestions()

  const keys = Object.keys(response)
  const questions = keys.map((key) => response[key])
  const { answeredQuestions, unansweredQuestions } = getQuestions(
    userId,
    orderByTimestamp(questions)
  )

  dispatch({
    type: QUESTION_GET_ALL_SUCCESS,
    payload: {
      allById: response,
      questions,
      ids: keys,
      answeredQuestions,
      unansweredQuestions,
    },
  })
}
