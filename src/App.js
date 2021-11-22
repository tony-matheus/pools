import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Login, Pools } from './pages'
import { getAllUsers } from './redux/actions/users'
import { getAllQuestions } from './redux/actions/questions'

import withStoreProvider from './redux/withStoreProvider'
import { Box } from './UI'
import { Navbar } from './components/Navbar'
import { routes } from './routes'
import { NewQuestion } from './pages/NewQuestion'
import { Leaderboard } from './pages/Leaderboard'

const withConnect = (Component) => {
  const actions = {
    getAllQuestions,
    getAllUsers,
  }

  return connect(null, actions)(Component)
}

const App = withConnect((props) => {
  const { isAuthenticated, authenticatedUser, all } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (all.length === 0) {
      props.getAllUsers()
    }
  }, [all])

  return (
    <Router basename='/'>
      <Navbar isAuthenticated={isAuthenticated} />
      <Route path={routes.leaderboard.url} exact>
        <Leaderboard />
      </Route>
      {isAuthenticated ? (
        <Box height='100vh'>
          <Route path={routes.home.url} exact>
            <Home />
          </Route>
          <Route path='/questions/:question_id' exact component={Pools} />
          <Route path={routes.newQuestion.url} exact>
            <NewQuestion />
          </Route>
        </Box>
      ) : (
        <Route path='/login' exact>
          <Login />
        </Route>
      )}
    </Router>
  )
})
export default withStoreProvider(App)
