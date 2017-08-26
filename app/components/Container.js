import React from 'react'
import { Container } from 'semantic-ui-react'
import List from '../components/List'

const ContainerExampleContainer = (props) => {
  const { sites } = props
  return (
    <Container>
      <p>boot to the head.</p>
      {sites.map(group => <List key={group.name} group={group} />) }
    </Container>
  )
}

export default ContainerExampleContainer
