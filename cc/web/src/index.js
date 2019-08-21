
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import thunk from 'redux-thunk'

import App from './App'
import reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(createLogger(), thunk)
)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('app-root'))
