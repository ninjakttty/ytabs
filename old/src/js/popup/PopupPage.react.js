import React from 'react'
import icon from '../../img/icon-128.png'
import { Button } from 'semantic-ui-react'
import { saveTabGroup } from '../storage'
import * as Chrome from '../storage'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.saveAll = this.saveAll.bind(this)
    this.goToTab = this.goToTab.bind(this)
    this.goToPopup = this.goToPopup.bind(this)
  }

  saveAll() {
    const queryOptions = { currentWindow: true }
    chrome.tabs.query(queryOptions, tabs => {
      Chrome.saveTabGroup(tabs).then(Chrome.closeCurrentTabs).then(() => {
        chrome.tabs.create({ url: chrome.extension.getURL('background.html') })
      })
    })
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
        <Button.Group vertical style={{ float: 'right' }}>
          <Button onClick={this.saveAll} content="Save All tabs" style={{ marginBottom: 6 }} />
          <Button onClick={this.goToTab} content="Go to tab page" style={{ marginBottom: 6 }} />
          <Button onClick={this.goToPopup} content="Go to popup page" style={{ marginBottom: 6 }} />
        </Button.Group>
      </div>
    )
  }
}