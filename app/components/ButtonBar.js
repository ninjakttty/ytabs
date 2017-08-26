import React, { PropTypes, Component } from 'react'
import { Button } from 'semantic-ui-react'

const Buttons = (props) => {
  const { saveCurrentWindowTabs } = props.actions
  return (
    <div>
      <Button
        icon="save"
        content="Save All Tabs From This Window.."
        onClick={saveCurrentWindowTabs}
      />
    </div>
  )
}

export default Buttons

/*
    <Button.Group size="mini" style={{ marginRight: 10 }}>
      <Button icon="save" content="Save All Tabs From This Window" onClick={saveCurrentWindowTabs} />
      <Button content="Open Options Page" />
    </Button.Group>
    <Button.Group size="mini">
      <Button active icon="sort numeric ascending" content="Sort Asc" />
      <Button icon="sort numeric descending" content="Sort Desc" />
    </Button.Group>
*/
