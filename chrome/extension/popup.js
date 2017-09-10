import React from 'react'
import ReactDOM from 'react-dom'
import Popup from '../../app/containers/Popup'

chrome.storage.local.get('state', (obj) => {
  const { state } = obj
  const initialState = JSON.parse(state || '{}')

  const createStore = require('../../app/store/configureStore')

  ReactDOM.render(<Popup store={createStore(initialState)} />, document.querySelector('#root'))
})
