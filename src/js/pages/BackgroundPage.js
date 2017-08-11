import React from 'react'
import icon from '../../img/icon-128.png'
// import List from '../components/List.react'
import  * as Chrome from '../storage'
import { Button, Icon } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink } from '../storage'
import {List} from 'semantic-ui-react'



const LinkListItem = (props) => {
  const { url, favIconUrl, title, id } = props
  const openThis = () => openLink(url).then(removeItem(id))

  return (
    <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={openThis} >
        [id :{id} ]
        {title}
        <p style={{ fontSize: '12px' }}>
          {url}
        </p>
      </div>
  )
}

const LinkList = (props) => {
  const {urls } = props

  return (
    <List.List>
      {urls.map( site => <LinkListItem {...site} />)}
    </List.List>
  )
}



export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [], list: [1,2,3] }
  }

  componentWillMount() {
    Chrome.getTabs('yuri').then(items => {
      console.info('componentWillMount', items)
      this.setState({ counter: 0, lists: [] })
    })
  }

  componentDidMount() {
    chrome.storage.onChanged.addListener(() => {
      Chrome.getTabs('yuri').then(items => this.setState({ items: items }))
    })
  }

  render() {
    console.info('background page render')
    const {lists} = this.state

    return (
      <div>

    <Button
        icon
        size="mini"
        onClick={() => {

          Chrome.getTabGroups().then( items =>{
             this.setState({ counter: this.state.counter +1, lists: Object.entries(items) })
          })
        }}
      >
        <Icon name="home" />Save All Tabs
      </Button>
        Counter: {this.state.counter}

        {lists.map( (item) =>
          <List>
            <List.Item>{item[0]}</List.Item>
            <List.Item>
                <LinkList urls={item[1]} />
            </List.Item>

          </List>)
        }

      </div>
    )
  }
}
