import * as types from './constants'

const uniqSites = (prev, curr) => {
  // console.log(`should push to prev: ${curr.url}`, !prev.some(item => item.url === curr.url))
  if (!prev.some(item => item.url === curr.url)) {
    prev.push(curr)
  }
  return prev
}

const filterChrome = str => !/^chrome.*/.test(str.url)

export function incSite(payload) {
  return { type: types.INC, payload }
}

export function decSite(payload) {
  return { type: types.DEC, payload }
}

function saveGroup(sites) {
  const now = new Date().toISOString()
  const payload = {
    name: `name-${now}`,
    sites
  }
  console.log('save SITE TOO', payload)
  return { type: types.SAVE, payload }
}

// export function saveCurrentWindowTabs(payload) {
//   console.log('actions ', payload)
//   return () => {
//     console.log('in')
//     return { type: types.TOOT, payload }
//   }
//   // return new Promise((resolve) => {
//   //   resolve({ type: types.TOOT, payload })
//   // })
// }

export function saveCurrentWindowTabs() {
  return (dispatch) => {
    const queryOptions = { currentWindow: true }
    chrome.tabs.query(queryOptions, (tabGroup) => {
      // console.log('tabGroup', tabGroup)
      let tabs = tabGroup
      tabs = tabs.filter(filterChrome).reduce(uniqSites, []).map(item => ({
        id: item.id,
        title: item.title,
        url: item.url,
        favIconUrl: item.favIconUrl
      }))
      // console.log('tabs', tabs)
      // console.log('tabs.reduce(uniqSites, [])', tabs.reduce(uniqSites, []))
      // tabs = tabs.reduce(uniqSites, [])
      // // console.log('tabs', tabs)
      // tabs = tabs.filter(filterChrome)
      dispatch(saveGroup(tabs))
    })
  }
}

export function restoreItem(payload) {
  return { type: types.INC, payload }
}
