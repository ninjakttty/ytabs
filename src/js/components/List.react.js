import React from 'react'
import icon from '../../img/icon-128.png'
import List from '../components/List.react'
import ListItem from './ListItem.react'
import { Button, Icon } from 'semantic-ui-react'
import { saveTabs } from '../storage'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.onRestore = this.onRestore.bind(this)
    this.onDelete = this.onDelete.bind(this)
    // this.saveAll = this.saveAll.bind(this)
  }
  onRestore() {
    console.log('onRestore')
  }

  onDelete() {
    console.log('onDelete')
  }

  render() {
    const { urls } = this.props
    return (
      <div>
        {urls.length} tabs in this list
        <Button icon size="mini" onClick={this.onRestore}>
          <Icon name="external" />Restore Tabs
        </Button>
        <Button icon size="mini" onClick={this.onDelete}>
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
}
