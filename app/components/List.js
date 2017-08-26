import React from 'react'
import { List, Button } from 'semantic-ui-react'
import ListItem from './ListItem'

const URLList = (props) => {
  const { group } = props

  return (
    <List>
      <List.Header style={{ color: 'red' }}>
        {group.name}
      </List.Header>
      <List.Content>
        <Button
          size="mini"
          icon="external"
          content="Restore Tabs"
          onClick={() => {
            console.log('restore tabs click')
          }}
        />
      </List.Content>
      {group.sites.map(item => <ListItem key={item.id} {...item} />)}
    </List>
  )
}

export default URLList
