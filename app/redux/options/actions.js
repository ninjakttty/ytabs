import * as siteActions from '../sites/actions'

export const TOGGLE_SORT = 'TOGGLE_SORT'
export const SAVE_PINBOARD_KEY = 'SAVE_PINBOARD_KEY'

export function changeSort(payload) {
  return function (dispatch) {
    dispatch({ type: TOGGLE_SORT, payload })
    if (payload === 'asc') {
      dispatch({ type: siteActions.SORT_ASC })
    } else {
      dispatch({ type: siteActions.SORT_DESC })
    }
  }
}

export function savePinboardKey(payload) {
  return { type: SAVE_PINBOARD_KEY, payload }
}
