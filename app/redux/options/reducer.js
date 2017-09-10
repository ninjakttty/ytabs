import * as actions from './actions'

const initialState = {
  sortAsc: true
}

export default function sitesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_SORT: {
      const newState = Object.assign({}, state, {
        sortAsc: !state.sortAsc
      })
      return newState
    }
    case actions.SAVE_PINBOARD_KEY: {
      return state
    }
  }

  return state
}
