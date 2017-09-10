import React from 'react'
import { Button } from 'semantic-ui-react'
import SortButtons from './SortButtons'

const Buttons = (props) => {
  const { saveCurrentWindowTabs } = props.actions
  return (
    <div>
      <Button
        icon="save"
        content="Save All Tabs From This Window.."
        onClick={(e) => {
          const { metaKey } = e
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
        icon="settings"
        content="Open Options Page"
        onClick={() => {
          chrome.tabs.create({ url: chrome.extension.getURL('options.html') })
        }}
      />
      <SortButtons />
    </div>
  )
}

export default Buttons
