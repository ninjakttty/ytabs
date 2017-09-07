import React, { PropTypes, Component } from 'react'
import { Button } from 'semantic-ui-react'

const Buttons = props => (
  //   const { saveCurrentWindowTabs } = props.actions
  <Button.Group>
    <Button
      icon="sort numeric ascending"
      content="Sort Asc"
      onClick={() => console.log('click asc')}
    />
    <Button
      icon="sort numeric descending"
      content="Sort Dec"
      onClick={() => console.log('click des')}
    />
  </Button.Group>
)

export default Buttons
