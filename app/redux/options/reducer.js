import * as actions from './actions'

const initialState = {
  sortAsc: true
}

export default function sitesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_SORT: {
      // console.log('toggle reducer', action.payload)
      const newState = Object.assign({}, state, {
        sortAsc: !state.sortAsc
      })

      // console.log('state, newState', state, newState)

      return newState
    }
  }

  return state
}
