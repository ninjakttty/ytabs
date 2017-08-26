import * as actions from './constants'

const initialState = []

export default function sitesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.INC: {
      console.log('inc reducer', action.payload)
      return state
    }
    case actions.DEC: {
      console.log('red dec', action.payload)
      return state
    }
    case actions.TOOT: {
      console.log('red toot', action.payload)
      return state
    }
    case actions.SAVE: {
      const { payload } = action
      const now = new Date().toISOString()
      const obj = {
        name: payload.name,
        sites: payload.sites,
        date: now

      }
      return [...state, obj]
    }
  }

  return state
}

