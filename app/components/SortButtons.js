import React, { PropTypes, Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as OptionActions from '../redux/options/actions'

const SortButtons = (props) => {
  console.log(props)
  const { toggleSort } = props
  const { sortAsc } = props.options
  //   const { saveCurrentWindowTabs } = props.actions
  const sortType = sortAsc ? 'ASC' : 'DEC'

  return (
    <span>
      SortAsc is {sortAsc.toString()} for real
      <div>
        <Button
          icon="sort numeric ascending"
          content="Sort Asc"
          disabled={sortAsc}
          active={sortAsc}
          onClick={() => {
            console.log('props', props)
            console.log('click asc')
            toggleSort(sortType)
          }}
        />
        <Button
          icon="sort numeric descending"
          content="Sort Dec"
          disabled={!sortAsc}
          active={!sortAsc}
          onClick={() => {
            console.log('props', props)
            console.log('click des')
            toggleSort(sortType)
          }}
        />
      </div>
    </span>
  )
}

// export default SortButtons

export default connect(state => ({ options: state.options }), OptionActions)(SortButtons)
