import { categoriseQuestions, orderByTimestamp } from '../../../utils'
import { _getQuestions } from '../../../utils/_DATA'
import { QUESTION_GET_ALL_SUCCESS, QUESTION_GET_ALL } from '../../actionTypes'

export default (userId) => async (dispatch) => {
  dispatch({ type: QUESTION_GET_ALL })
  const response = await _getQuestions()

  const keys = Object.keys(response)
  const questions = keys.map((key) => response[key])
  const { answeredQuestions, unansweredQuestions } = categoriseQuestions(
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
