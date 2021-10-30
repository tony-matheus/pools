import { USER_LOGOUT } from '../../actionTypes'

export default () => async (dispatch) => {
  return dispatch({
    type: USER_LOGOUT,
    payload: '',
  })
}
