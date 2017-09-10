import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class Pinboard extends Component {
  render() {
    // const { store } = this.props
    return (
      <div>
        <Input
          action={{ color: 'blue', labelPosition: 'right', icon: 'save', content: 'Verify' }}
          actionPosition="right"
          label="API Key"
        />
      </div>
    )
  }
}

export default Pinboard
