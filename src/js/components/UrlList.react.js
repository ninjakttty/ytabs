import React from 'react'
import { List, Header } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink, removeFromTabGroup } from '../storage'
import { titleDate } from '../date'
import { TabButtons } from './URLListButtons.react'

const LinkListItem = props => {
  const { url, favIconUrl, title, id, removeItem } = props
  const openThis = () => openLink(url).then(removeItem(id))

  return (
    <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={openThis}>
      [id :{id} ]
      {title}
      <p style={{ fontSize: '12px' }}>{url}</p>
    </div>
  )
}

const UrlList = props => {
  const { urls, tabGroup } = props
  const removeFromThisTabGroup = removeFromTabGroup(tabGroup)
  return (
    <List.List>
      <List.Header>
        {titleDate(tabGroup)}
        <TabButtons {...props} />
      </List.Header>
      {urls.map(site => <LinkListItem key={site.id} {...site} removeItem={removeFromThisTabGroup} />)}
    </List.List>
  )
}

export { UrlList }
