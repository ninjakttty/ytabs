import React from 'react'
import { connect } from 'react-redux'
import List from '../components/List'

const ContainerPage = ({ sites }) => <div>{sites.map(group => <List key={group.name} group={group} />)}</div>

export default connect(state => ({ options: state.options }))(ContainerPage)
