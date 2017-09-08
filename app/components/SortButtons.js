import React, { PropTypes, Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as OptionActions from '../redux/options/actions'

const SortButtons = (props) => {
  // console.log(props)
  const { changeSort } = props
  const { sortAsc } = props.options
  //   const { saveCurrentWindowTabs } = props.actions
  const sortType = sortAsc ? 'ASC' : 'DEC'

  return (
    <span>
      SortAsc is {sortAsc.toString()} for real
      <div>
        <Button
          icon="sort numeric ascending"
          content="Oldest"
          active={sortAsc}
          onClick={() => {
            //disabled={sortAsc}
            //console.log('props', props)
            //console.log('click asc')
            changeSort('asc')
          }}
        />
        <Button
          icon="sort numeric descending"
          content="Newest"
          active={!sortAsc}
          onClick={() => {
            // disabled={!sortAsc}
            // console.log('props', props)
            //   console.log('click des')
            changeSort('dec')
          }}
        />
      </div>
    </span>
  )
}

// export default SortButtons

export default connect(state => ({ options: state.options }), OptionActions)(SortButtons)
