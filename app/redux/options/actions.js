import * as siteActions from '../sites/actions'

export const TOGGLE_SORT = 'TOGGLE_SORT'

export function toggleSort(payload) {
  console.log('PPP  ', payload)
  return function (dispatch) {
    dispatch({ type: TOGGLE_SORT, payload })
    dispatch({ type: siteActions.SORT })
  }
  // return { type: TOGGLE_SORT, payload }
}
