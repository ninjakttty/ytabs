export const TOOT = 'TOOT'
export const INC = 'INC'
export const DEC = 'DEC'
export const SAVE = 'SAVE'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_GROUP = 'REMOVE_GROUP'

const uniqSites = (prev, curr) => {
  // console.log(`should push to prev: ${curr.url}`, !prev.some(item => item.url === curr.url))
  if (!prev.some(item => item.url === curr.url)) {
    prev.push(curr)
  }
  return prev
}

const filterChrome = str => !/^chrome.*/.test(str.url)

export function incSite(payload) {
  return { type: INC, payload }
}

export function decSite(payload) {
  return { type: DEC, payload }
}

function saveGroup(sites) {
  const now = new Date().toISOString()
  const payload = {
    name: now,
    sites
  }
  console.log('save SITE TOO', payload)
  return { type: SAVE, payload }
}

// export function saveCurrentWindowTabs(payload) {
//   console.log('actions ', payload)
//   return () => {
//     console.log('in')
//     return { type: TOOT, payload }
//   }
//   // return new Promise((resolve) => {
//   //   resolve({ type: TOOT, payload })
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

export function removeItem(payload) {
  return { type: REMOVE_ITEM, payload }
}

export function removeGroup(name) {
  const payload = {
    gid: name
  }
  return { type: REMOVE_GROUP, payload }
}
