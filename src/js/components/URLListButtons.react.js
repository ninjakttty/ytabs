import React from 'react'
import { Button } from 'semantic-ui-react'
import * as Storage from '../storage'

const removeGroup = id => () => Storage.removeTabGroup(id)

const restoreGroup = id => async () => {
  const sites = await Storage.getTabs(id)
  const proms = sites.map(site => Storage.openLink(site.url))
  Promise.all(proms).then(Storage.removeTabGroup(id))
}

const TabButtons = props => {
  const { tabGroup } = props
  const removeThisGroup = removeGroup(tabGroup)
  const restoreThisGroup = restoreGroup(tabGroup)

  return (
    <div>
      <Button.Group size="tiny">
        <Button icon="external" content="Restore This Tab Group" onClick={restoreThisGroup} />
        <Button icon="remove" negative content="Delete This Tab Group" onClick={removeThisGroup} />
      </Button.Group>
    </div>
  )
}

export { TabButtons }
