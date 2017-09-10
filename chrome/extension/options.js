import React from 'react'
import ReactDOM from 'react-dom'
import OptionsPage from '../../app/containers/Options'
import './todoapp.css'

console.log('options app started')

chrome.storage.local.get('state', (obj) => {
  const { state } = obj
  const initialState = JSON.parse(state || '{}')

  const createStore = require('../../app/store/configureStore')

  ReactDOM.render(
    <OptionsPage store={createStore(initialState)} />,
    document.querySelector('#root')
  )
})
