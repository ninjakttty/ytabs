import React from 'react'
import { Button } from 'semantic-ui-react'
import * as Storage from '../storage'

const removeGroup = id => () => Storage.removeTabGroup(id)

const TabButtons = props => {
  const { tabGroup } = props
  const removeThisGroup = removeGroup(tabGroup)

  return (
    <div>
      <Button.Group size="tiny">
        <Button icon="home" content="Restore This Tab Group" onClick={removeThisGroup} />
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </div>
  )
}

export { TabButtons }
