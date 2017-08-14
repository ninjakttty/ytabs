import React from 'react'
import { Button } from 'semantic-ui-react'
import * as Storage from '../storage'
import { openLink } from '../storage'

const removeGroup = id => () => Storage.removeTabGroup(id)

const restoreGroup = id => () => {
  console.log('restoring group', id)
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
