import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as OptionActions from '../redux/options/actions'

const SortButtons = (props) => {
  const { changeSort } = props
  const { sortAsc } = props.options
  return (
    <Button.Group>
      <Button
        icon="sort numeric ascending"
        content="Oldest"
        active={sortAsc}
        onClick={() => {
          changeSort('asc')
        }}
      />
      <Button
        icon="sort numeric descending"
        content="Newest"
        active={!sortAsc}
        onClick={() => {
          changeSort('dec')
        }}
      />
    </Button.Group>
  )
}

export default connect(state => ({ options: state.options }), OptionActions)(SortButtons)
