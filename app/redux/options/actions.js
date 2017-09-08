import * as siteActions from '../sites/actions'

export const TOGGLE_SORT = 'TOGGLE_SORT'

export function changeSort(payload) {
  console.log('PPP  ', payload)
  return function (dispatch) {
    dispatch({ type: TOGGLE_SORT, payload })
    if (payload === 'asc') {
      dispatch({ type: siteActions.SORT_ASC })
    } else {
      dispatch({ type: siteActions.SORT_DESC })
    }
    // dispatch({ type: siteActions.SORT, payload })
  }
  // return { type: TOGGLE_SORT, payload }
}
