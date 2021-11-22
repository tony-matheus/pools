/* eslint-disable no-undef */
import {
  ANSWER_QUESTION_SUCCESS,
  USER_GET_ALL,
  USER_GET_ALL_SUCCESS,
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
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
} from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  authenticatedUser: {},
  allById: {},
  all: [],
  error: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case ANSWER_QUESTION_SUCCESS: {
      const { authedUser, qid, answer } = action.payload
      const allById = {
        ...state.allById,
        [authedUser]: {
          ...state.allById[authedUser],
          answers: {
            ...state.allById[authedUser].answers,
            [qid]: answer,
          },
        },
      }

      const keys = Object.keys(allById)
      const users = keys.map((key) => allById[key])

      return {
        ...state,
        isLoading: false,
        allById,
        all: users,
        authenticatedUser: allById[state.authenticatedUser.id],
      }
    }
    case USER_GET_ALL: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case USER_GET_ALL_SUCCESS: {
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
    case USER_LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        authenticatedUser: {},
        allById: {},
        all: [],
        error: '',
      }
    }
    case ASK_QUESTION: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ASK_QUESTION_SUCCESS: {
      const { newQuestion } = action.payload

      const allById = {
        ...state.allById,
        [state.authenticatedUser.id]: {
          ...state.allById[state.authenticatedUser.id],
          questions: state.allById[state.authenticatedUser.id].questions.concat(
            [newQuestion.id]
          ),
        },
      }

      const keys = Object.keys(allById)
      const users = keys.map((key) => allById[key])

      return {
        ...state,
        isLoading: false,
        allById,
        all: users,
        authenticatedUser: allById[state.authenticatedUser.id],
      }
    }
    default:
      return state
  }
}
