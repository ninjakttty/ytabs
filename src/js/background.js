import '../img/icon-128.png'
import '../img/icon-34.png'

import BackgroundPage from './pages/BackgroundPage'
import React from 'react'
import { render } from 'react-dom'

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                'from a content script:' + sender.tab.url :
                'from the extension')
    if (request.greeting == 'hello'){
        const urls  = request.payload
        // console.log('request', request)
        console.log('urls', urls)


        render(
            <BackgroundPage urls={urls} />,
            window.document.getElementById('app-container')
        )

      sendResponse({farewell: 'goodbye',  data: sender.tab.url})
    }
  })


  render(
    <BackgroundPage urls={[]} />,
    window.document.getElementById('app-container')
  )