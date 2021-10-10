/* eslint-disable no-undef */
import {
  USER_GET,
  USER_GET_FAILURE,
  USER_GET_SUCCESS,
  USER_DELETE,
  USER_DELETE_FAILURE,
  USER_DELETE_SUCCESS,
  USER_CREATE,
  USER_CREATE_FAILURE,
  USER_CREATE_SUCCESS,
  USER_AUTHENTICATE,
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAILURE,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  authenticatedUser: {},
  allById: {},
  all: [],
  error: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_GET: {
      return {
        isLoading: true,
      }
    }
    case USER_GET_SUCCESS: {
      const keys = Object.keys(action.payload)
      const users = keys.map((key) => action.payload[key])

      return {
        ...state,
        isLoading: false,
        allById: action.payload,
        all: users,
      }
    }
    case USER_DELETE: {
      return {
        ...state,
        error: '',
      }
    }
    case USER_DELETE_FAILURE: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case USER_DELETE_SUCCESS: {
      const users = state.all.filter((u) => u.id !== action.payload)
      return {
        ...state,
        all: users,
      }
    }
    case USER_CREATE: {
      return {
        ...state,
        error: '',
      }
    }
    case USER_CREATE_FAILURE: {
      return {
        ...state,
      }
    }
    case USER_CREATE_SUCCESS: {
      return {
        ...state,
      }
    }
    case USER_AUTHENTICATE: {
      return {
        ...state,
        authenticating: true,
        isAuthenticated: false,
        error: '',
      }
    }
    case USER_AUTHENTICATE_FAILURE: {
      return {
        ...state,
        authenticating: false,
        isAuthenticated: false,
        error: action.payload,
      }
    }
    case USER_AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
        authenticatedUser: action.payload,
      }
    }
    case USER_SIGNUP: {
      return {
        ...state,
        isRegistered: false,
        error: '',
      }
    }
    case USER_SIGNUP_FAILURE: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isRegistered: true,
      }
    }
    case USER_LOGOUT: {
      return {
        ...initialState,
        isAuthenticated: false,
        error: action.payload,
      }
    }
    default:
      return state
  }
}
