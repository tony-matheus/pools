import { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { Box, Button } from '../../UI'
import { getAllQuestions } from '../../redux/actions/questions'
import { Question } from '../../components/Question'
import { Loading } from '../../UI/Loading'

const withConnect = (Component) => {
  const actions = { getAllQuestions }

  return connect(null, actions)(Component)
}

const VIEW_OPTIONS = {
  UNANSWERED: 'unansweredQuestions',
  ANSWERED: 'answeredQuestions',
}

export const Home = withConnect((props) => {
  const [viewOptions, setViewOption] = useState(VIEW_OPTIONS.UNANSWERED)
  const { userAnsweredQuestions, userUnansweredQuestions, isLoading } =
    useSelector((state) => state.question)

  const { authenticatedUser, allById: usersById } = useSelector(
    (state) => state.user
  )

  const { all: allQuestions } = useSelector((state) => state.question)

  useEffect(() => {
    if (allQuestions.length === 0) {
      props.getAllQuestions(authenticatedUser.id)
    }
  }, [])

  const currentQuestions =
    viewOptions === VIEW_OPTIONS.ANSWERED
      ? userAnsweredQuestions
      : userUnansweredQuestions

  if (isLoading) return <Loading />

  return (
    <Box display='flex' justifyContent='center'>
      <Box maxWidth={['100%', null, '75%']} minWidth={['100%', null, '50%']}>
        <Box py={2} display='flex' justifyContent='space-between'>
          <Button
            px={2}
            py={3}
            onClick={() => setViewOption(VIEW_OPTIONS.UNANSWERED)}
          >
            Unaswered
          </Button>
          <Button
            px={2}
            py={3}
            onClick={() => setViewOption(VIEW_OPTIONS.ANSWERED)}
          >
            answered
          </Button>
        </Box>
        {currentQuestions.map((question) => (
          <Box key={question.id} mb={2}>
            <Question
              id={question.id}
              avatarUrl={usersById[question.author].avatarURL}
              title={`${usersById[question.author].name} asks:`}
              optionOne={question.optionOne.text}
              optionTwo={question.optionTwo.text}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
})
