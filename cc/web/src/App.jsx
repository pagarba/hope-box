
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"

import config from '../package.json'
import React from 'react'
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom'

import {Container} from 'shards-react'
import Dashboard from './container/Dashboard'
import Map from './container/Map'
import Navigation from './component/Navigation'
import Responders from './container/Responders'
import Settings from './container/Settings'
import Stations from './container/Stations'
import Users from './container/Users'

const RedirectToDashboard = withRouter(({history}) => {
  history.push('/dashboard')
  return null
})

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Navigation title="HopeBox" version={config.version} />
        <Container>
          <Switch>
            <Route component={Dashboard} path="/dashboard" />
            <Route component={Map} path="/map" />
            <Route component={Responders} path="/responders" />
            <Route component={Stations} path="/stations" />
            <Route component={Settings} path="/settings" />
            <Route component={Users} path="/users" />
            <Route component={RedirectToDashboard} exact path="/" />
          </Switch>
        </Container>
      </HashRouter>
    )
  }
}

export default App
