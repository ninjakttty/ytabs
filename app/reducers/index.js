import { combineReducers } from 'redux'
import todos from './todos'
import sites from '../redux/sites/reducer'
import options from '../redux/options/reducer'

export default combineReducers({
  todos,
  sites,
  options
})
