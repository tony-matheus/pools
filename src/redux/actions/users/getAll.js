import { _getUsers } from '../../../utils/_DATA'
import { USER_GET_ALL_SUCCESS, USER_GET_ALL } from '../../actionTypes'

export default () => async (dispatch) => {
  dispatch({ type: USER_GET_ALL })
  const response = await _getUsers()

  dispatch({
    type: USER_GET_ALL_SUCCESS,
    payload: response,
  })
}
