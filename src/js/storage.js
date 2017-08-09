const saveTabs = tabs => {
  console.log('tab  saveTabs!!', tabs)
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
// const makeRequest = async () => {s
const getTabs = id => {
  console.log('getTabs id', id)

  return new Promise((resolve, reject) => {
    chrome.storage.local.get('data', items => {
      if (!chrome.runtime.error) {
        resolve(items)
      }
    })
  })
}

const removeItem = currentId => {
  chrome.storage.local.get('data', ({ data }) => {
    console.log('data', data, currentId)
    const filteredTabs = data.filter(({ id }) => id !== currentId)
    console.log('filteredTabs', filteredTabs)

    return saveTabs(filteredTabs)
  })
}

const openLink = url => {
  chrome.tabs.create({ url: url, active: false })
}

export { saveTabs, getTabs, removeItem, openLink }
