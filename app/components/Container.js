import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import List from '../components/List'

const ContainerPage = (props) => {
  const { sites } = props
  return <Container>{sites.map(group => <List key={group.name} group={group} />)}</Container>
}

export default connect(state => ({ options: state.options }))(ContainerPage)
