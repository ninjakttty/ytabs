import React, { Component } from 'react'
import { Input, Checkbox } from 'semantic-ui-react'

class Pinboard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { key: props.currentKey }
  }

  handleChange = (e, input) => {
    this.setState({ key: input.value })
  }

  save = () => {
    const { saveKey } = this.props
    const { key } = this.state
    saveKey(key)
  }

  render() {
    const { currentKey } = this.props

    return (
      //TODO disable button if key is entered
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
          defaultValue={currentKey}
          placeholder="Enter API key here"
          label="API Key"
          onChange={this.handleChange}
        />
        <Checkbox label="Make my Pinboard saves private" checked />
      </div>
    )
  }
}

export default Pinboard
