import { useState } from 'react'
import { useSelector, connect } from 'react-redux'
import { Box, Button, Input, Text } from '../UI'
import { authenticate, getAll } from '../redux/actions/users'

const withConnect = (Component) => {
  const actions = {
    authenticate,
    getAll,
  }

  return connect(null, actions)(Component)
}

export const Login = withConnect(
  // eslint-disable-next-line no-unused-vars
  ({ authenticate: execAuthenticate, getAll: execGetAll, ...restProps }) => {
    const [data, setData] = useState({
      name: 'sarahedo',
      password: '',
    })

    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
      execAuthenticate({ name: data.name })
    }

    const { error, isAuthenticated } = useSelector((state) => state.user)

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
          <Input
            value={data.name}
            name='name'
            onChange={handleChange}
            placeholder='Your Username'
            mb={10}
          />
          {/* <Input
          value={data.password}
          name='password'
          onChange={handleChange}
          placeholder='Your Password'
        /> */}
          <Text color='red'>{error}</Text>
          <Button mt={10} width='100%' p={2} onClick={handleClick} mr={2}>
            Login
          </Button>
        </Box>
      </Box>
    )
  }
)
