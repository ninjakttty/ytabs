const saveTabs = tabs => {
  console.info('saveTabs =>', tabs)
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ data: tabs }, () => {
      if (chrome.runtime.error) {
        reject('runtime storage error')
      }
      resolve()
    })
  })

  // chrome.storage.set({tabs: tabs}, () => {
  //     message('Settings saved')
  //   })
  // chrome.runtime.sendMessage({greeting: 'hello', payload: tabs},
  //         (response) => {
  //             // console.log(response.farewell , response)
  // })
}

const filterChrome = str => !/^chrome-extension.*/.test(str.url)

const saveTabGroup = tabs => {
  // console.log('saveTabGroup =>', tabs)

  tabs = tabs.filter(filterChrome)

  const time = new Date().toISOString()

  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [time]: tabs }, () => {
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

const getTabs = id => {
  console.info('getTabs id', id)
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('data', items => {
      if (!chrome.runtime.error) {
        resolve(items.data)
      }
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

const openLink = url => {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url: url, active: false }, resolve())
  })
}

const removeTabGroup = id => {
  console.log('removeing id', id)

  return new Promise((resolve, reject) => {
    // chrome.storage.local.remove(id, () => {
    //   console.log('item removed')
    //   if (chrome.runtime.error) {
    //     reject(chrome.runtime.error)
    //   }
    //   resolve()
    // })
    // chrome.storage.local.get(null, items => {
    //   if (chrome.runtime.error) {
    //     reject(chrome.runtime.error)
    //   }
    //   // resolve(Object.entries(items))
    //   resolve(items)
    // })
  })
}

export { saveTabs, getTabs, removeItem, openLink, saveTabGroup, getTabGroups, removeTabGroup }
