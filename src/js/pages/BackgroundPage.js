import React from 'react'
import icon from '../../img/icon-128.png'
// import List from '../components/List.react'
import * as Chrome from '../storage'
import { Button, Icon } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink } from '../storage'
import { List, Header } from 'semantic-ui-react'

const LinkListItem = props => {
  const { url, favIconUrl, title, id } = props
  const openThis = () => openLink(url).then(removeItem(id))

  return (
    <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={openThis}>
      [id :{id} ]
      {title}
      <p style={{ fontSize: '12px' }}>{url}</p>
    </div>
  )
}

const UrlList = props => {
  const { urls, tabGroup } = props

  return (
    <List.List>
      <List.Header>
        {tabGroup}
      </List.Header>
      {urls.map(site => <LinkListItem key={site.id} {...site} />)}
    </List.List>
  )
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lists: [] }
  }

  componentWillMount() {
    Chrome.getTabs('yuri').then(items => {
      console.info('componentWillMount', items)
      this.setState({ counter: 0, lists: [] })
    })
  }

  componentWillMount() {
    Chrome.getTabGroups().then(items => this.setState({ lists: Object.entries(items) }))
    // chrome.storage.onChanged.addListener(() => {
    //   Chrome.getTabs('yuri').then(items => this.setState({ items: items }))
    // })
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
          <Icon name="home" />Save All Tabs
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
          <List>
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
