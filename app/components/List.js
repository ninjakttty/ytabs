import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { List, Button } from 'semantic-ui-react'
import ListItem from './ListItem'
import * as SitesActions from '../redux/sites/actions'

class URLList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { group, removeGroup } = this.props
    return (
      <List>
        <List.Header style={{ color: 'rgb(56, 56, 56)' }}>
          <span>
            {group.sites.length} tabs saved on
          </span>
          {moment(group.name).format('MMMM Do h:mm a')}
        </List.Header>
        <List.Content>
          <Button
            size="mini"
            icon="external"
            content="Restore Tabs"
            onClick={() => {
              group.sites.forEach((item) => {
                const { url } = item
                chrome.tabs.create({ url, active: false })
              })
              removeGroup(group.name)
            }}
          />
        </List.Content>
        {group.sites.map(item => <ListItem key={item.id} group={group.name} {...item} />)}
      </List>
    )
  }
}

export default connect(state => ({ sites: state.sites }), SitesActions)(URLList)
