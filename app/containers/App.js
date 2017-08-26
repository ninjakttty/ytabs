import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Buttons from '../components/ButtonBar'
import Container from '../components/Container'

// import Header from '../components/Header'
// import MainSection from '../components/MainSection'
import * as SitesActions from '../redux/sites/actions'
// import '../containers/App.css'
// import style from './App.css'
// <div className={style.normal}>

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

  inc = () => {
    const { incSite } = this.props.actions
    incSite()
  }

  dec = () => {
    const { decSite } = this.props.actions
    decSite()
  }

  render() {
    const { sites, actions } = this.props
    console.log('sites', sites)


    return (
      <div>
        <div>
          <Buttons name="frank" actions={actions} />
        </div>
        <div>
          <Button>Click Here</Button>
        </div>
        <p onClick={this.inc}>inc</p>
        <p onClick={this.dec}>dec</p>
        <Container sites={sites} />
      </div>
    )
  }
}
