import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, connect } from 'react-redux'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { routes } from '../routes'
import { Box, Button, Image, Text } from '../UI'
import { colors } from '../utils/colors'
import { logout } from '../redux/actions/users'

const withConnect = (Component) => {
  const actions = {
    logout,
  }

  return connect(null, actions)(Component)
}

export const Navbar = withConnect(({ isAuthenticated, logout: execLogout }) => {
  const location = useLocation()
  const history = useHistory()

  const { authenticatedUser } = useSelector((state) => state.user)

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== routes.leaderboard.url) {
      history.push({
        pathname: routes.login.url,
      })
    }

    if (isAuthenticated && location.pathname === routes.login.url) {
      history.push({
        pathname: routes.home.url,
      })
    }
  }, [isAuthenticated, location.pathname])

  const handleLogout = () => execLogout()

  return (
    <Box as='nav' boxShadow='0 5px 10px 0 rgb(0 0 0 / 3%)'>
      <Box
        display='flex'
        justifyContent='space-between'
        py={10}
        px='0.5em'
        mx='auto'
        maxWidth={['100%', null, '70%']}
      >
        <Box my={0} p={10} display='flex'>
          <Box mx={2}>
            <Link
              to={routes.home.url}
              style={{
                textDecoration: 'none',
                color:
                  location.pathname === routes.home.url
                    ? colors.blue.default
                    : colors.black.default,
              }}
            >
              Home
            </Link>
          </Box>
          <Box mx={2}>
            <Link
              to={routes.newQuestion.url}
              style={{
                textDecoration: 'none',
                color:
                  location.pathname === routes.newQuestion.url
                    ? colors.blue.default
                    : colors.black.default,
              }}
            >
              New Question
            </Link>
          </Box>
          <Box mx={2}>
            <Link
              to={routes.leaderboard.url}
              style={{
                textDecoration: 'none',
                color:
                  location.pathname === routes.leaderboard.url
                    ? colors.blue.default
                    : colors.black.default,
              }}
            >
              Leaderboard
            </Link>
          </Box>
        </Box>
        <Box>
          {isAuthenticated && (
            <Box display='inline-flex' alignItems='center'>
              <Box pr={2} mr={2}>
                <Text borderRight='1px solid black'>
                  Hello! {authenticatedUser.name}
                </Text>
              </Box>
              <Image
                borderRadius='100%'
                width={100}
                height={100}
                src={authenticatedUser.avatarURL}
                size='2rem'
                alt=''
                mx='auto'
              />
              <Button ml={4} p={2} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
})

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}
