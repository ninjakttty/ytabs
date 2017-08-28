import * as actions from './actions'

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
    case actions.REMOVE_ITEM: {
      const { gid, id } = action.payload
      const newState = [...state]
      // console.log('reducer', action.payload)
      // console.log('state', newState)

      const groupIdx = newState.findIndex(item => item.name === `name-${gid}`)
      console.log('state', state[groupIdx].sites.length)
      console.log('newState', newState[groupIdx].sites.length)

      const itemIdx = newState[groupIdx].sites.findIndex(item => item.id === id)
      newState[groupIdx].sites.splice(itemIdx, 1) // mutate

      console.log('state', state[groupIdx].sites.length)
      console.log('newState', newState[groupIdx].sites.length)

      return newState
    }
  }

  return state
}
