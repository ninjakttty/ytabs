import React from 'react'
import { List, Header } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink } from '../storage'

import { TabButtons } from './URLListButtons.react'

const LinkListItem = props => {
  const { url, favIconUrl, title, id } = props
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

  return (
    <List.List>
      <List.Header>
        {tabGroup}
        <TabButtons {...props} />
      </List.Header>
      {urls.map(site => <LinkListItem key={site.id} {...site} />)}
    </List.List>
  )
}

export { UrlList }
