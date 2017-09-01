import React from 'react'
import { List, Header, Image } from 'semantic-ui-react'
import { saveTabs, removeItem, openLink, removeFromTabGroup } from '../storage'
import { titleDate } from '../date'
import { TabButtons } from './URLListButtons.react'

const noop = () => {}
const LinkListItem = props => {
  const { url, favIconUrl, title, id, removeItem } = props

  const openThis = e => {
    const { metaKey, altKey, ctrlKey, shiftKey } = e
    openLink(url)
      .then(() => {
        if (metaKey) throw 'meta pressed'
      })
      .then(() => {
        removeItem(id)
      })
      .catch(noop)
  }

  return (
    <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={openThis}>
      <div>
        <Image src={favIconUrl} height={18} shape="circular" inline spaced />
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {title}
        </span>
      </div>

      <p style={{ fontSize: '14px' }}>
        [id :{id} ] {url}
      </p>
    </div>
  )
}

const UrlList = props => {
  const { urls, tabGroup } = props
  const removeFromThisTabGroup = removeFromTabGroup(tabGroup)
  return (
    <List.List>
      <List.Header>
        <span style={{ color: '#5a5a5a', fontSize: 10 }}>
          ({urls.length}) &nbsp;{' '}
        </span>
        {titleDate(tabGroup)}
        <TabButtons {...props} />
      </List.Header>
      {urls.map(site => <LinkListItem key={site.id} {...site} removeItem={removeFromThisTabGroup} />)}
    </List.List>
  )
}

export { UrlList }
