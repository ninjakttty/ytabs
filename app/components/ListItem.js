import React from 'react'
import { List, Button, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as SitesActions from '../redux/sites/actions'

const CloseButton = ({ id, gid, removeItem }) => {
  const removeThis = (e) => {
    e.stopPropagation()
    removeItem({ id, gid })
  }

  return (
    <Button icon onClick={removeThis} circular size="mini" compact basic>
      <Icon name="remove" color="red" />
    </Button>
  )
}

const restoreItem = ({ id, gid, url, removeItem }) => (e) => {
  const { metaKey } = e /// altKey, ctrlKey, shiftKey
  chrome.tabs.create({ url, active: false })
  if (!metaKey) {
    removeItem({ id, gid })
  }
}

const ListItem = (props) => {
  const { id, title, url, group, favIconUrl, removeItem } = props
  const gid = group
  const restoreThis = restoreItem({ id, gid, url, removeItem })
  console.log('props', props)

  return (
    <List.Item key={id} style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={restoreThis}>
      <Image src={favIconUrl} height={18} shape="circular" inline spaced />
      <CloseButton {...props} gid={gid} />
      [id :{id} ] <span style={{ fontSize: '14px' }}>{title}</span>
    </List.Item>
  )
}

export default connect(state => ({ sites: state.sites }), SitesActions)(ListItem)
