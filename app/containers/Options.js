import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { Container, Header, Segment } from 'semantic-ui-react'
import * as OptionActions from '../redux/options/actions'
import Pinboard from '../components/Pinboard'

class OptionsPage extends Component {
  render() {
    const { store, savePinboardKey } = this.props
    const { pkey } = this.props.options

    return (
      <Provider store={store}>
        <Container>
          <Header as="h2">Options Page</Header>
          <Segment padded>
            <Pinboard saveKey={savePinboardKey} currentKey={pkey} />
          </Segment>
          <Segment padded>Options 2</Segment>
          <Segment padded>Options 3</Segment>
        </Container>
      </Provider>
    )
  }
}

export default connect(state => ({ options: state.options }), OptionActions)(OptionsPage)
