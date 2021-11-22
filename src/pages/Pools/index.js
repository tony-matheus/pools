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
      <Box display='flex' justifyContent='center'>
        <Box
          maxWidth={[1, null, 1 / 2, 3 / 4]}
          minWidth={['100%', null, '50%']}
          pt={2}
        >
          <Pool
            id={question.id}
            avatarUrl={usersById[question.author].avatarURL}
            title={`${usersById[question.author].name} asks:`}
            optionOne={question.optionOne}
            optionTwo={question.optionTwo}
            votedOption={authenticatedUser.answers[questionId]}
            isAnswered={isAnswered}
            onSubmit={handleSubmit}
          />
        </Box>
      </Box>
    )
  }
)
