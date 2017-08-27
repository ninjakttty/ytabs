import React from 'react'
import { List, Button, Icon, Image } from 'semantic-ui-react'

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

const restoreItem = (id, gid) => () => {
  console.log('restore item', id, `from group ${gid}`)
}

const ListItem = (props) => {
  const { id, title, url, group, favIconUrl } = props
  const gid = group.split('name-')[1]
  const restoreThis = restoreItem(id, gid)

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

export default ListItem
