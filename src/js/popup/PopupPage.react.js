import React from 'react'
import icon from '../../img/icon-128.png'
import { Button } from 'semantic-ui-react'
import { saveTabs } from '../storage'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.saveAll = this.saveAll.bind(this)
    this.goToTab = this.goToTab.bind(this)
    this.goToPopup = this.goToPopup.bind(this)
  }

  saveAll() {
    // console.log('save all...')
    // const queryOptions = { currentWindow: true }
    // chrome.tabs.query(queryOptions, (tabs) => saveTabs(tabs))
    // console.log(
    //   chrome.tabs.query(queryOptions, saveTabs)
    // )
  }

  goToTab() {
    chrome.tabs.create({ url: chrome.extension.getURL('background.html') })
  }

  goToPopup() {
    chrome.tabs.create({ url: chrome.extension.getURL('popup.html') })
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 6, backgroundColor: '#efefef' }}>
          {' '}<Button size="large" onClick={this.goToTab}>
            Go to tab page
          </Button>{' '}
        </div>
        <div style={{ marginBottom: 6 }}>
          {' '}<Button size="mini" onClick={this.saveAll}>
            Save All tabs
          </Button>{' '}
        </div>
        <div style={{ marginBottom: 6 }}>
          {' '}<Button size="medium" onClick={this.goToPopup}>
            Go to popup page
          </Button>{' '}
        </div>
      </div>
    )
  }
}
