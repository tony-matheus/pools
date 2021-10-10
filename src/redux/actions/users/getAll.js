import { _getUsers } from '../../../utils/_DATA'
import { USER_GET_SUCCESS, USER_GET } from '../../actionTypes'

export default () => async (dispatch) => {
  dispatch({ type: USER_GET })
  const response = await _getUsers()

  dispatch({
    type: USER_GET_SUCCESS,
    payload: response,
  })
}
