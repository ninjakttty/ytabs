import React from 'react'
import { Container } from 'semantic-ui-react'
import List from '../components/List'
import { connect } from 'react-redux'
import * as OptionActions from '../redux/options/actions'

const ContainerExampleContainer = (props) => {
  const { sites } = props
  // console.log('props.options', props.options)

  return (
    <Container>
      <p>boot to the head.</p>
      {sites.map(group => <List key={group.name} group={group} />)}
    </Container>
  )
}

export default connect(state => ({ options: state.options }))(ContainerExampleContainer)
// export default ContainerExampleContainer
