import { combineReducers } from 'redux'
import sites from '../redux/sites/reducer'
import options from '../redux/options/reducer'

export default combineReducers({
  sites,
  options
})
