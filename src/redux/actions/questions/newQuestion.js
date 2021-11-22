import { _saveQuestion } from '../../../utils/_DATA'
import { ASK_QUESTION_SUCCESS, ASK_QUESTION } from '../../actionTypes'

export default ({ optionOneText, optionTwoText, author }) =>
  async (dispatch) => {
    dispatch({ type: ASK_QUESTION })
    const newQuestion = await _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
    dispatch({
      type: ASK_QUESTION_SUCCESS,
      payload: {
        newQuestion,
      },
    })
  }
