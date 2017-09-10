import React, { Component } from 'react'
import { Input, Checkbox } from 'semantic-ui-react'

class Pinboard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { key: '' }
  }
  handleChange = (e, input) => {
    this.setState({ key: input.value })
  }

  save = () => {
    const { saveKey } = this.props
    const { key } = this.state
    console.log('save', key)
    saveKey(key)
  }

  render() {
    return (
      <div>
        <p>
          You can get the API token here <a href="https://pinboard.in/settings/password">here</a>
        </p>
        <Input
          action={{
            onClick: this.save,
            color: 'blue',
            labelPosition: 'right',
            icon: 'save',
            content: 'Verify'
          }}
          label="API Key"
          onChange={this.handleChange}
        />
        <Checkbox label="Make my Pinboard saves private" checked />
      </div>
    )
  }
}

export default Pinboard
