
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import thunk from 'redux-thunk'

import App from './App'
import Reducers from './Reducers'

import './sass/main.scss'

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)

const store = createStore(
  Reducers,
  applyMiddleware(createLogger(), thunk),
)

render((<Root />), document.getElementById('app-root'))
