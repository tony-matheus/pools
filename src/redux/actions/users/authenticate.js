import {
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAILURE,
} from '../../actionTypes'

export default ({ name }) =>
  async (dispatch, getState) => {
    const { allById } = getState().user

    const user = allById[name.trim()]

    if (user) {
      return dispatch({
        type: USER_AUTHENTICATE_SUCCESS,
        payload: user,
      })
    }
    return dispatch({
      type: USER_AUTHENTICATE_FAILURE,
      payload: 'User does not exist',
    })
  }
