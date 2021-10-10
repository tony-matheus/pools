import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  // applyMiddleware(thunk)
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

export default store
