import React from 'react'
import { List, Button, Icon } from 'semantic-ui-react'

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

const ListItem = (props) => {
  const { id, title, url } = props

  return (
    <List.Item key={id} style={{ marginBottom: 8 }}>
      <CloseButton {...props} />
      <p style={{ fontWeight: 'bold', marginBottom: 0 }}>
        {title}
      </p>
      <p style={{ fontSize: 12 }}>
        {url}
      </p>
    </List.Item>
  )
}

export default ListItem
