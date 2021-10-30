import { _saveQuestionAnswer } from '../../../utils/_DATA'
import { ANSWER_QUESTION_SUCCESS, ANSWER_QUESTION } from '../../actionTypes'

export default ({ optionOneText, optionTwoText, author }) =>
  async (dispatch) => {
    dispatch({ type: ANSWER_QUESTION })
    await _saveQuestionAnswer({ optionOneText, optionTwoText, author })
    dispatch({
      type: ANSWER_QUESTION_SUCCESS,
    })
  }
