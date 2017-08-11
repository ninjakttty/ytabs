import React from 'react'
import icon from '../../img/icon-128.png'
import List from '../components/List.react'
import ListItem from './ListItem.react'
import { Button, Icon } from 'semantic-ui-react'
import { saveTabs, openLink, removeItem, saveTabGroup , getTabGroups} from '../storage'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.onRestoreTabGroup = this.onRestoreTabGroup.bind(this)
    this.onDelete = this.onDelete.bind(this)
    // this.saveAll = this.saveAll.bind(this)
  }
  onRestoreTabGroup(sites) {
    // const { urls } = this
    console.info('onRestoreTabGroup', sites)

    console.log('sites', sites)
  }

  onDelete() {
    console.info('onDelete')
  }

  render() {
    const { urls } = this.props
    console.info('render urls', urls)

    return (
      <div>
        {urls.length} tabs in this list
        <Button
          icon
          size="mini"
          onClick={() => {
            this.onRestoreTabGroup(urls)
          }}
        >
          <Icon name="external" />Restore Tabs
        </Button>
        <Button icon size="mini" onClick={this.onDelete}>
          <Icon name="recycle" />Delete This Group
        </Button>
        <Button
          icon
          size="mini"
          onClick={() => {
            chrome.tabs.query({ currentWindow: true }, tabs => {
              saveTabGroup(tabs)
            })
          }}
        >
          <Icon name="home" />Save All Tabs
        </Button>



        {/* DEBUGGGER */}


        <Button
          icon
          size="mini"
          onClick={() => {
            chrome.tabs.query({ currentWindow: true }, tabs => {
              getTabGroups(tabs).then(  (items)=>{
                console.log('tab group got', items)
              } )
            })
          }}
        >
        load all tabs
        </Button>







        {urls.map(site => <ListItem {...site} key={site.id} />)}
      </div>
    )
  }
}
