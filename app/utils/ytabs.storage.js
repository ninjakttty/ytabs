const updateTabGroup = (groupId, tabGroup) =>
new Promise((resolve, reject) => {
  const tabs = tabGroup.filter(filterChrome)
  chrome.storage.local.set({ [groupId]: tabs }, () => {
    chrome.runtime.error ? reject(chrome.runtime.error) : resolve(tabs)
  })
})

const filterChrome = str => !/^chrome.*/.test(str.url)

const uniqSites = (prev, curr) => {
  console.log(`should push to prev: ${curr.url}`, !prev.some(item => item.url === curr.url))
  if (!prev.some(item => item.url === curr.url)) {
    prev.push(curr)
  }
  return prev
}

const saveTabGroup = tabGroup =>
new Promise((resolve, reject) => {
  console.log('tabGroup', tabGroup)
  let tabs = tabGroup
  tabs = tabs.map(item => ({
    id: item.id,
    title: item.title,
    pinned: item.pinned,
    url: item.url,
    favIconUrl: item.favIconUrl,
  }))

  console.log('tabs', tabs)
  console.log('tabs.reduce(uniqSites, [])', tabs.reduce(uniqSites, []))

  tabs = tabs.reduce(uniqSites, [])
  console.log('tabs', tabs)
  tabs = tabs.filter(filterChrome)

  const now = new Date().toISOString()
  chrome.storage.local.set({ [now]: tabs }, () => {
    if (chrome.runtime.error) {
      reject(chrome.runtime.error)
    }
    resolve(tabs)
  })
})

const getTabGroups = () => new Promise((resolve, reject) => {
  chrome.storage.local.get(null, (items) => {
    if (chrome.runtime.error) {
      reject(chrome.runtime.error)
    }
    // resolve(Object.entries(items))
    resolve(items)
  })
})

const getTabs = (groupId) => {
  console.info('groupId', groupId)
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(groupId, (items) => {
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
      }
      resolve(items[groupId])
    })
  })
}

const removeFromTabGroup = groupId => (tabId) => {
  console.info(`removing ${tabId} from ${groupId}`)

  return new Promise((resolve, reject) => {
    chrome.storage.local.get(groupId, (data) => {
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
      }
      console.info('data', data[groupId])
      const arr = data[groupId].filter(item => item.id !== tabId)
      console.info('filtered data', arr)
      arr.length === 0 ? removeTabGroup(groupId) : updateTabGroup(groupId, arr)
    })
  })
}

const removeItem = (currentId) => {
  chrome.storage.local.get('data', ({ data }) => {
    console.info('removeItem data, currentId', data, currentId)
    const filteredTabs = data.filter(({ id }) => id !== currentId)
    console.info('filteredTabs', filteredTabs)
    return saveTabs(filteredTabs)
  })
}

const openLink = (url, options) => new Promise((resolve, reject) => {
  chrome.tabs.create({ url, active: false }, () => {
    chrome.runtime.error ? reject(chrome.runtime.error) : resolve()
  })
})

const closeTabs = sites => new Promise((resolve, reject) => {
  const ids = sites.map(site => site.id)
  console.log('closeTabs', ids)

  chrome.tabs.remove(ids, () => {
    chrome.runtime.error ? reject(chrome.runtime.error) : resolve()
  })
})
const closeCurrentTabs = () =>
new Promise((resolve, reject) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs = tabs.filter(filterChrome)
    const ids = tabs.map(site => site.id)
    chrome.tabs.remove(ids, () => {
      chrome.runtime.error ? reject(chrome.runtime.error) : resolve()
    })
  })
})

const removeTabGroup = (id) => {
  console.log('removeTabGroup id', id)

  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(id, () => {
      console.log('item removed')
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
      }
      resolve()
    })
  })
}

export {
removeFromTabGroup,
closeCurrentTabs,
// saveTabs,
getTabs,
removeItem,
openLink,
saveTabGroup,
getTabGroups,
removeTabGroup,
closeTabs,
}
