import { combineReducers } from 'redux'

import user from './user'
import question from './question'

export default combineReducers({
  user,
  question,
})
