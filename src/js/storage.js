const saveTabs = tabs => {
    console.log('tab  saveTabs!!', tabs)
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ data: tabs }, () => {
            if (chrome.runtime.error) { reject('runtime storage error') }
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
        chrome.storage.sync.get('data', items => {
            if (!chrome.runtime.error) {
                resolve(items)
            }
        })
    })
}

const removeItem = (id) => () => console.log('removing', id)

export { saveTabs, getTabs, removeItem }
