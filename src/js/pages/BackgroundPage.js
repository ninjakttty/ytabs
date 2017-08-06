import React from 'react'
import icon from '../../img/icon-128.png'
import List from '../components/List.react'
import { getTabs } from '../storage'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
  }

  componentWillMount() {
    getTabs('yuri').then(items => items.data).then(items => {
      console.log('componentWillMount', items)
      this.setState({ items: items })
    })
  }

  componentDidMount() {
    chrome.storage.onChanged.addListener(() => {
      getTabs('yuri').then(items => items.data).then(items => this.setState({ items: items }))
    })
  }

  render() {
    console.log('background page render')

    return (
      <div>
        Page
        <List urls={this.state.items} />
      </div>
    )
  }
}
