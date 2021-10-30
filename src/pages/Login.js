import { useState } from 'react'
import { useSelector, connect } from 'react-redux'
import { Box, Button, Text } from '../UI'
import { authenticate } from '../redux/actions/users'
import { Select } from '../UI/Select'

const withConnect = (Component) => {
  const actions = {
    authenticate,
  }

  return connect(null, actions)(Component)
}

export const Login = withConnect(
  // eslint-disable-next-line no-unused-vars
  ({ authenticate: execAuthenticate, ...restProps }) => {
    const [username, setUsername] = useState('sarahedo')

    const handleClick = () => execAuthenticate({ name: username })

    const { error, all: users } = useSelector((state) => state.user)

    return (
      <Box
        height='100vh'
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Box
          borderRadius='10px'
          py={20}
          px={40}
          width={300}
          boxShadow='0 16px 38px -12px rgb(0 0 0 / 56%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);'
        >
          <Text as='h1' mt={0} textAlign='center'>
            Login
          </Text>
          <Select
            name='name'
            options={users.map((u) => u.id)}
            value={username}
            onChange={setUsername}
            width='100%'
          />
          <Text color='red'>{error}</Text>
          <Button mt={10} width='100%' p={2} onClick={handleClick} mr={2}>
            Login
          </Button>
        </Box>
      </Box>
    )
  }
)
