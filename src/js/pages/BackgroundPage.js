import React from 'react'
import icon from '../../img/icon-128.png'
import * as Chrome from '../storage'
import { Button, Icon } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink } from '../storage'
import { List, Header } from 'semantic-ui-react'
import { UrlList } from '../components/UrlList.react'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lists: [] }
  }

  // componentWillMount() {
  //   Chrome.getTabs('yuri').then(items => {
  //     console.info('componentWillMount', items)
  //     this.setState({ counter: 0, lists: [] })
  //   })
  // }

  componentWillMount() {
    Chrome.getTabGroups().then(items => this.setState({ lists: Object.entries(items) }))
    chrome.storage.onChanged.addListener(() => {
      Chrome.getTabGroups().then(items => this.setState({ lists: Object.entries(items) }))
    })
  }

  render() {
    // console.info('background page render')
    let { lists } = this.state
    // Chrome.saveTabGroup()
    return (
      <div>
        <Button
          icon
          size="mini"
          onClick={() => {
            const queryOptions = { currentWindow: true }
            chrome.tabs.query(queryOptions, tabs => {
              Chrome.saveTabGroup(tabs)
            })
            /* chrome.tabs.query(queryOptions, tabs => Chrome.saveTabGroup(tabs)) */
          }}
        >
          <Icon name="home" />Save All Tabs on This Page
        </Button>
        <Button
          icon
          size="mini"
          onClick={() => {
            Chrome.getTabGroups().then(items => {
              this.setState({ counter: this.state.counter + 1, lists: Object.entries(items) })
            })
          }}
        >
          <Icon name="home" />Restore This Tab Group
        </Button>
        Counter: {this.state.counter}
        {lists.map(item =>
          <List key={item[0]}>
            <List.Item>
              <UrlList urls={item[1]} tabGroup={item[0]} />
            </List.Item>
          </List>
        )}
      </div>
    )
  }
}

// .then(items => {
//   //console.log('items', items)
//   items.forEach(thing => {
//     {
//       /* console.log('thing.id', thing.id, thing.url) */
//     }
//     if (thing.url.match(/chrome:/)) {
//       console.log(thing.url, thing.url.match(/chrome:/))
//       console.log('match', thing.url)

//     }
//     {
//       /* chrome.tabs.discard(thing.id) */
//     }
//   })
// })
