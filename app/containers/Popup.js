import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import * as SitesActions from '../redux/sites/actions'

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { store, saveCurrentWindowTabs } = this.props

    return (
      <Provider store={store}>
        <Button.Group vertical>
          <Button
            fluid
            positive
            icon="save"
            content="Save All Tabs From This Window..."
            onClick={(e) => {
              const { metaKey } = e
              chrome.tabs.create({ url: chrome.extension.getURL('ytabs.html') })
              saveCurrentWindowTabs()
              if (!metaKey) {
                chrome.tabs.query({ currentWindow: true }, (tabs) => {
                  const filterChrome = str => !/^chrome.*/.test(str.url)
                  const ids = tabs.filter(filterChrome).map(site => site.id)
                  chrome.tabs.remove(ids)
                })
              }
            }}
          />
          <Button
            fluid
            content="Open Ytabs"
            onClick={() => {
              chrome.tabs.create({ url: chrome.extension.getURL('ytabs.html') })
            }}
          />
        </Button.Group>
      </Provider>
    )
  }
}

export default connect(null, SitesActions)(Root)
