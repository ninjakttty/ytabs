// const saveTabs = tabs => {
//   console.log('saveTabs =>', tabs)

//   return new Promise((resolve, reject) => {
//     chrome.storage.local.set({ data: tabs }, () => {
//       if (chrome.runtime.error) {
//         reject('runtime storage error')
//       }
//       resolve()
//     })
//   })
//   // chrome.runtime.sendMessage({greeting: 'hello', payload: tabs},
//   //         (response) => {
//   //             // console.log(response.farewell , response)
//   // })
// }

const updateTabGroup = (groupId, tabGroup) => {
  const tabs = tabGroup.filter(filterChrome)

  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [groupId]: tabs }, () => {
      chrome.runtime.error ? reject(chrome.runtime.error) : resolve(tabs)
    })
  })
}

const filterChrome = str => !/^chrome-extension.*/.test(str.url)

const uniqSites = (prev, curr) => {
  if (!prev.some(item => item.url === curr.url)) {
    prev.push(curr)
  }
  return prev
}

const saveTabGroup = tabGroup => {
  console.log('tabGroup', tabGroup)
  let tabs = tabGroup

  // tabs = tabs.map(item => ({
  //   id: item.id,
  //   title: item.title,
  //   pinned: item.pinned,
  //   url: item.url,
  // }))

  tabs = tabs.reduce(uniqSites, [])
  tabs = tabs.filter(filterChrome)

  const now = new Date().toISOString()

  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [now]: tabs }, () => {
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
      }
      resolve(tabs)
    })
  })
}

const getTabGroups = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, items => {
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
      }
      // resolve(Object.entries(items))
      resolve(items)
    })
  })
}

const getTabs = groupId => {
  console.info('groupId', groupId)
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(groupId, items => {
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
      }
      resolve(items[groupId])
    })
  })
}

const removeFromTabGroup = groupId => tabId => {
  console.info(`removing ${tabId} from ${groupId}`)

  return new Promise((resolve, reject) => {
    chrome.storage.local.get(groupId, data => {
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

const removeItem = currentId => {
  chrome.storage.local.get('data', ({ data }) => {
    console.info('removeItem data, currentId', data, currentId)
    const filteredTabs = data.filter(({ id }) => id !== currentId)
    console.info('filteredTabs', filteredTabs)
    return saveTabs(filteredTabs)
  })
}

const openLink = (url, options) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url: url, active: false }, () => {
      chrome.runtime.error ? reject(chrome.runtime.error) : resolve()
    })
  })
}

const removeTabGroup = id => {
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

export { removeFromTabGroup, saveTabs, getTabs, removeItem, openLink, saveTabGroup, getTabGroups, removeTabGroup }
