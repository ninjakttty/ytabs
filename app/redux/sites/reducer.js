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
    case actions.SORT: {
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
      const newState = state.map(item => Object.assign({}, item)) //deep copy

      const groupIdx = newState.findIndex(group => group.name === gid)
      // console.warn('state', state[groupIdx].sites.length)s
      // console.warn('newState', newState[groupIdx].sites.length)

      const itemIdx = newState[groupIdx].sites.findIndex(item => item.id === id)
      newState[groupIdx].sites.splice(itemIdx, 1) // mutate

      // console.log('newState[groupIdx].sites', newState[groupIdx].sites)
      // console.log('newState[groupIdx].sites', newState[groupIdx].sites.length)

      if (newState[groupIdx].sites.length === 0) {
        newState.splice(groupIdx, 1)
      }
      // if (newState[groupIdx].sites.length === 0) {
      //   delete newState[groupIdx]
      // }
      // console.log('state', state[groupIdx].sites.length)
      // console.log('newState', newState[groupIdx].sites.length)

      return newState
    }

    case actions.REMOVE_GROUP: {
      const { gid } = action.payload
      const newState = state.filter(item => item.name !== gid)
      return newState
    }
  }

  return state
}
