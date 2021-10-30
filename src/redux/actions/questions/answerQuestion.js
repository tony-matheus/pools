import { _saveQuestionAnswer } from '../../../utils/_DATA'
import { ANSWER_QUESTION_SUCCESS, ANSWER_QUESTION } from '../../actionTypes'

export default ({ authedUser, qid, answer }) =>
  async (dispatch) => {
    dispatch({ type: ANSWER_QUESTION })
    await _saveQuestionAnswer({ authedUser, qid, answer })
    dispatch({
      type: ANSWER_QUESTION_SUCCESS,
    })
  }
