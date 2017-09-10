import React, { Component } from 'react'
import { Provider } from 'react-redux'

export default class OptionsPage extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>Options Page</div>
      </Provider>
    )
  }
}
