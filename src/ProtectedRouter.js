/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { routes } from './routes'

export const ProtectedRouter = ({ children, ...restProps }) => {
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <Route
      {...restProps}
      render={({ location }) =>
        !isAuthenticated && location.pathname !== routes.login.url ? (
          <Redirect
            to={{
              pathname: routes.login.url,
              state: { from: location.pathname },
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
