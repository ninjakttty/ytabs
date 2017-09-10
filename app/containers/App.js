import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ButtonBar from '../components/ButtonBar'
import Container from '../components/Container'
import * as SitesActions from '../redux/sites/actions'

@connect(
  state => ({
    sites: state.sites
  }),
  dispatch => ({
    actions: bindActionCreators(SitesActions, dispatch)
  })
)
export default class App extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }

  render() {
    const { sites, actions } = this.props

    return (
      <div>
        <ButtonBar actions={actions} />
        <Container sites={sites} />
      </div>
    )
  }
}
