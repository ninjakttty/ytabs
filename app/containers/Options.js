import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Container, Header, Segment, Button, Divider } from 'semantic-ui-react'

export default class OptionsPage extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Container>
          <Header as="h2">Options Page</Header>
          <Segment padded>Options 1</Segment>
          <Segment padded>Options 2</Segment>
          <Segment padded>Options 3</Segment>
        </Container>
      </Provider>
    )
  }
}
