/* eslint-disable no-undef */
import {
  QUESTION_GET_ALL,
  QUESTION_GET_ALL_SUCCESS,
  ANSWER_QUESTION,
  ANSWER_QUESTION_SUCCESS,
} from '../actionTypes'

const initialState = {
  isLoading: false,
  allById: {},
  ids: [],
  all: [],
  userAnsweredQuestions: [],
  userUnansweredQuestions: [],
  error: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case QUESTION_GET_ALL: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case QUESTION_GET_ALL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allById: action.payload.allById,
        all: action.payload.questions,
        ids: action.payload.ids,
        userAnsweredQuestions: action.payload.answeredQuestions,
        userUnansweredQuestions: action.payload.unansweredQuestions,
      }
    }
    case ANSWER_QUESTION: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ANSWER_QUESTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    default:
      return state
  }
}
