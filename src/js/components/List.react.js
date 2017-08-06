import React from 'react'
import icon from '../../img/icon-128.png'
// import List from '../components/List.react'
import ListItem from './ListItem.react'
import { Button, Icon } from 'semantic-ui-react'
import { saveTabs } from '../storage'

const restoreAllTabs = urls => () => {
  console.log('urls', urls)
}

const handleDelete = urls => () => {
  console.log('handleDelete', urls)
}

const List = props => {
  const { urls } = props
  const onRestore = restoreAllTabs(urls)
  const onDelete = handleDelete(urls)

  return (
    <div>
      {urls.length} tabs in this list
      <Button icon size="mini" onClick={onRestore}>
        <Icon name="external" />Restore Tabs
      </Button>
      <Button icon size="mini" onClick={onDelete}>
        <Icon name="recycle" />Delete This Group
      </Button>
      <Button
        icon
        size="mini"
        onClick={() => {
          console.log('save all...')

          chrome.tabs.query({ currentWindow: true }, tabs => {
            console.log('t', tabs)
            saveTabs(tabs)
          })
        }}
      >
        <Icon name="home" />Save All Tabs
      </Button>
      {urls.map(site => <ListItem {...site} key={site.id} />)}
    </div>
  )
}

export default List
