import '../css/popup.css'
import PopUpPage from './popup/PopupPage.react'
import React from 'react'
import { render } from 'react-dom'

render(
  <PopUpPage />,
  window.document.getElementById('app-container')
)
