import React from 'react'
import icon from '../../img/icon-128.png'
import * as Chrome from '../storage'
import { Button, List, Header } from 'semantic-ui-react'
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
    this.state = { lists: [], desc: true }
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
        <Button.Group size="mini" style={{ marginRight: 10 }}>
          <Button
            icon="save"
            content="Save All Tabs on This Browser"
            onClick={() => {
              const queryOptions = { currentWindow: true }
              chrome.tabs.query(queryOptions, tabs => {
                Chrome.saveTabGroup(tabs)
              })
            }}
          />
          <Button content="Open Options Page" onClick={chrome.runtime.openOptionsPage} />
        </Button.Group>
        <Button.Group size="mini">
          <Button
            active={!this.state.desc}
            icon="chevron circle up"
            content="Sort Asc"
            onClick={() => this.setState({ lists: this.state.lists.sort(ascDateSort), desc: false })}
          />
          <Button
            active={this.state.desc}
            icon="chevron circle down"
            content="Sort Desc"
            onClick={() => this.setState({ lists: this.state.lists.sort(descDateSort), desc: true })}
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
