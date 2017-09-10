import * as actions from './actions'

const initialState = {
  sortAsc: true,
  pkey: ''
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
      const { payload } = action
      return { ...state, pkey: payload }
    }
  }

  return state
}
