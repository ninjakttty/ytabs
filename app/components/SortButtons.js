import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as OptionActions from '../redux/options/actions'

const SortButtons = (props) => {
  const { changeSort } = props
  const { sortAsc } = props.options
  return (
    <span>
      <div>
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
      </div>
    </span>
  )
}

export default connect(state => ({ options: state.options }), OptionActions)(SortButtons)
