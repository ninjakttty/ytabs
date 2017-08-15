import React from 'react'
import icon from '../../img/icon-128.png'
import * as Chrome from '../storage'
import { Button, Icon, List, Header } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink } from '../storage'
import { UrlList } from '../components/UrlList.react'

const descDateSort = (a, b) => {
  // prettier-ignore
  switch (true) {
    case new Date(a[0]) > new Date(b[0]): return -1
    case new Date(a[0]) === new Date(b[0]): return 0
    case new Date(a[0]) < new Date(b[0]): return 1
  }
}
const ascDateSort = (a, b) => {
  // prettier-ignore
  switch (true) {
    case new Date(a[0]) < new Date(b[0]): return -1
    case new Date(a[0]) === new Date(b[0]): return 0
    case new Date(a[0]) > new Date(b[0]): return 1
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lists: [] }
  }

  componentWillMount() {
    Chrome.getTabGroups().then(items => this.setState({ lists: Object.entries(items).sort(descDateSort) }))
    chrome.storage.onChanged.addListener(() => {
      Chrome.getTabGroups().then(items => this.setState({ lists: Object.entries(items).sort(descDateSort) }))
    })
  }

  render() {
    let { lists } = this.state
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
        <Button.Group size="mini" labeled>
          <Button
            icon="chevron circle up"
            content="Sort Asc"
            onClick={() => this.setState({ lists: this.state.lists.sort(ascDateSort) })}
          />
          <Button
            icon="chevron circle down"
            content="Sort Desc"
            onClick={() => this.setState({ lists: this.state.lists.sort(descDateSort) })}
          />
        </Button.Group>
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
