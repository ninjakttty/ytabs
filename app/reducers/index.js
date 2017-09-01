import { combineReducers } from 'redux'
import todos from './todos'
import sites from '../redux/sites/reducer'

export default combineReducers({
  todos,
  sites
})
