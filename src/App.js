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
import { Loading } from './UI/Loading'
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
  useEffect(() => {
    props.getAllUsers()
  }, [])

  const { isLoading, isAuthenticated } = useSelector((state) => state.user)

  if (isLoading) return <Loading />

  return (
    <Router basename='/'>
      <Navbar isAuthenticated={isAuthenticated} />
      <Route path={routes.leaderboard.url} exact>
        leaderboard
      </Route>
      {isAuthenticated ? (
        <Box height='100vh' display='flex' justifyContent='center'>
          <Route path={routes.home.url} exact>
            <Home />
          </Route>
          <Route path={routes.leaderboard.url} exact>
            <Leaderboard />
          </Route>
          <Route path='/questions/:question_id' exact component={Pools} />
          <Route path={routes.newQuestion.url} exact>
            <NewQuestion />
          </Route>
        </Box>
      ) : (
        <>
          <Route path='/login' exact>
            <Login />
          </Route>
        </>
      )}
    </Router>
  )
})
export default withStoreProvider(App)
