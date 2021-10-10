import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Login } from './pages'
import { getAll } from './redux/actions/users'

import withStoreProvider from './redux/withStoreProvider'
import { Box } from './UI'

const withConnect = (Component) => {
  const actions = {
    getAll,
  }

  return connect(null, actions)(Component)
}

const App = withConnect((props) => {
  useEffect(() => {
    props.getAll()
  }, [])

  const { isLoading, isAuthenticated } = useSelector((state) => state.user)

  if (isLoading)
    return (
      <Box
        height='100vh'
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        ...LOADING
      </Box>
    )

  if (isAuthenticated) {
    return (
      <Router basename='/'>
        <Route path='/' exact>
          duhasud
        </Route>
      </Router>
    )
  }

  return (
    <Router basename='/'>
      <Route path='/' exact>
        <Login />
      </Route>
    </Router>
  )
})
export default withStoreProvider(App)
