import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, connect } from 'react-redux'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { routes } from '../routes'
import { Box, Button, Text } from '../UI'
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
    if (isAuthenticated) {
      history.push({
        pathname: routes.home.url,
      })
    } else {
      history.push({
        pathname: routes.login.url,
      })
    }
  }, [isAuthenticated])

  const handleLogout = () => execLogout()

  // const routesNames = Object.keys(routes)

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
              to={routes.home.leaderboard}
              style={{
                textDecoration: 'none',
                color:
                  location.pathname === routes.home.leaderboard
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
            <Box display='inline-flex'>
              <Box pr={2} mr={2}>
                <Text borderRight='1px solid black'>
                  logged as: {authenticatedUser.name}
                </Text>
              </Box>
              <Button p={2} onClick={handleLogout}>
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
