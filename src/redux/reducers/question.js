/* eslint-disable no-undef */
import { categoriseQuestions, orderByTimestamp } from '../../utils'
import {
  QUESTION_GET_ALL,
  QUESTION_GET_ALL_SUCCESS,
  ANSWER_QUESTION,
  ANSWER_QUESTION_SUCCESS,
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  USER_LOGOUT,
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

const formatQuestions = (questionsById, authedUser) => {
  const ids = Object.keys(questionsById)
  const allQuestions = ids.map((key) => questionsById[key])

  const { answeredQuestions, unansweredQuestions } = categoriseQuestions(
    authedUser,
    orderByTimestamp(allQuestions)
  )

  return { ids, allQuestions, answeredQuestions, unansweredQuestions }
}

export default function question(state = initialState, action) {
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
      const { authedUser, qid, answer } = action.payload

      const allQuestionsById = {
        ...state.allById,
        [qid]: {
          ...state.allById[qid],
          [answer]: {
            ...state.allById[qid][answer],
            votes: state.allById[qid][answer].votes.concat([authedUser]),
          },
        },
      }

      const { ids, allQuestions, answeredQuestions, unansweredQuestions } =
        formatQuestions(allQuestionsById, authedUser)

      return {
        ...state,
        isLoading: false,
        allById: allQuestionsById,
        all: allQuestions,
        ids,
        userAnsweredQuestions: answeredQuestions,
        userUnansweredQuestions: unansweredQuestions,
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

      const allQuestionsById = {
        ...state.allById,
        [newQuestion.id]: newQuestion,
      }

      const { ids, allQuestions, answeredQuestions, unansweredQuestions } =
        formatQuestions(allQuestionsById, newQuestion.author)

      return {
        ...state,
        allById: allQuestionsById,
        all: allQuestions,
        ids,
        userAnsweredQuestions: answeredQuestions,
        userUnansweredQuestions: unansweredQuestions,
        isLoading: false,
      }
    }
    case USER_LOGOUT: {
      return {
        ...state,
        isLoading: false,
        allById: {},
        ids: [],
        all: [],
        userAnsweredQuestions: [],
        userUnansweredQuestions: [],
        error: '',
      }
    }
    default:
      return state
  }
}
