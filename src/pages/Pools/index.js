/* eslint-disable react/prop-types */

import { useSelector, connect } from 'react-redux'
import { answerQuestion } from '../../redux/actions/questions'

import { Box } from '../../UI'
import { Pool } from './Poll'

const withConnect = (Component) => {
  const actions = { answerQuestion }

  return connect(null, actions)(Component)
}

export const Pools = withConnect(
  ({ match, answerQuestion: sendAnswerQuestion }) => {
    const { params } = match
    const { question_id: questionId } = params

    const { authenticatedUser, allById: usersById } = useSelector(
      (state) => state.user
    )
    const { allById: questionsById } = useSelector((state) => state.question)

    const question = questionsById[questionId]

    const handleSubmit = (option) =>
      sendAnswerQuestion({
        authedUser: authenticatedUser.id,
        qid: questionId,
        answer: option,
      })

    const isAnswered =
      question.optionOne.votes.includes(authenticatedUser.id) ||
      question.optionTwo.votes.includes(authenticatedUser.id)

    return (
      <Box maxWidth={['100%', null, '75%']} minWidth={['100%', null, '50%']}>
        <Pool
          id={question.id}
          avatarUrl={usersById[question.author].avatarUrl}
          title={`${usersById[question.author].name} asks:`}
          optionOne={question.optionOne}
          optionTwo={question.optionTwo}
          isAnswered={isAnswered}
          onSubmit={handleSubmit}
        />
      </Box>
    )
  }
)
