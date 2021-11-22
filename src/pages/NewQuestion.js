import { useState } from 'react'
import { useSelector, connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { newQuestion } from '../redux/actions/questions'
import { routes } from '../routes'

import { Box, Button, Input, Text } from '../UI'

const withConnect = (Component) => {
  const actions = { newQuestion }

  return connect(null, actions)(Component)
}

export const NewQuestion = withConnect((props) => {
  const history = useHistory()

  const [state, setState] = useState({
    optionOneText: '',
    optionTwoText: '',
  })

  const { authenticatedUser } = useSelector((data) => data.user)

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = () => {
    props.newQuestion({
      ...state,
      author: authenticatedUser.id,
    })
    history.push({
      pathname: routes.home.url,
    })
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Box p={1} width={['100%', null, '40%']}>
        <Box textAlign='center'>
          <Text fontSize={24} fontWeight='bold'>
            Create New Question
          </Text>
        </Box>
        <Box>
          <Text fontSize={20} fontWeight='bold'>
            Would you rather...
          </Text>
          <Input
            value={state.optionOneText}
            onChange={onChange}
            name='optionOneText'
            placeholder='Enter option one'
          />
          <Text textAlign='center'>OR</Text>
          <Input
            value={state.optionTwoText}
            onChange={onChange}
            name='optionTwoText'
            placeholder='Enter option two'
          />
          <Button width='100%' mt={4} py={2} onClick={() => onSubmit()}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  )
})
