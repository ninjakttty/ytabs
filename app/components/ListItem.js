import React from 'react'
import { List, Button, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as SitesActions from '../redux/sites/actions'

const CloseButton = (data) => {
  const { id } = data
  const removeThis = (e) => {
    e.stopPropagation()
    console.log('close', id)

    // removeItem(id)
  }

  return (
    <Button icon onClick={removeThis} circular size="mini" compact basic>
      <Icon name="remove" color="red" />
    </Button>
  )
}

const restoreItem = ({ id, gid, url, removeItem }) => (e) => {
  const { metaKey } = e /// altKey, ctrlKey, shiftKey
  console.log('restore item', id, `from group ${gid}, ${url}`)

  chrome.tabs.create({ url, active: false })
  if (!metaKey) {
    console.log('im no meta your the meta')
    removeItem({ id, gid })
  }
}

const ListItem = (props) => {
  const { id, title, url, group, favIconUrl, removeItem } = props
  const gid = group.split('name-')[1]
  const restoreThis = restoreItem({ id, gid, url, removeItem })

  return (
    <List.Item key={id} style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={restoreThis}>
      <Icon name="bars" />
      <Image src={favIconUrl} height={18} shape="circular" inline spaced />
      <CloseButton {...props} />
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {title}
      </span>
      <p style={{ fontSize: '14px' }}>
        [id :{id} ] {url}
      </p>
    </List.Item>
  )
}

export default connect(state => ({ sites: state.sites }), SitesActions)(ListItem)
