import React from 'react'
import { Button } from 'semantic-ui-react'
import * as Storage from '../storage'

const removeGroup = id => {
  console.log('id', id)
  Storage.removeTabGroup(id)
}

const TabButtons = props => {
  const { tabGroup } = props
  console.log('props', props)

  const ThisRemoveGroup = removeGroup(tabGroup)

  return (
    <div>
      <Button.Group size="tiny">
        <Button icon="home" content="Restore This Tab Group" onClick={ThisRemoveGroup} />
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </div>
  )
}

export { TabButtons }
