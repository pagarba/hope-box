
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"

import config from '../package.json'
import {connect} from 'react-redux'
import React from 'react'
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom'

import {Alert} from 'shards-react'
import {clearError, getSettings, setError} from './lib/actions'
import Dashboard from './container/Dashboard'
import _Map from './container/Map'
import Navigation from './component/Navigation'
import Responders from './container/Responders'
import Settings from './container/Settings'
import Stations from './container/Stations'
import Users from './container/Users'

const RedirectToDashboard = withRouter(({history}) => {
  history.push('/dashboard')
  return null
})

const Routes = () => (
  <Switch>
    <Route component={Dashboard} path="/dashboard" />
    <Route component={_Map} path="/map" />
    <Route component={Responders} path="/responders" />
    <Route component={Stations} path="/stations" />
    <Route component={Settings} path="/settings" />
    <Route component={Users} path="/users" />
    <Route component={RedirectToDashboard} exact path="/" />
  </Switch>
)

class App extends React.Component {
  componentDidMount() {
    this.props._getSettings().then(res => {
      if (!res || !res.id) {
        this.props.updateError('To center the map correctly please update the settings.')
      }
    })
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps)
  }

  handleClose = ev => {
    ev.preventDefault()
    this.props.removeError()
  }

  render() {
    const ok = !!this.props.settings.latitude && !!this.props.settings.longitude

    return (
      <HashRouter>
        {ok && <Navigation title="HopeBox" version={config.version} />}
        <div className="content" style={{margin: 0, padding: 10}}>
          <Alert
            dismissible={this.handleClose}
            open={!!this.props.error}
            theme="danger">
            {this.props.error}
          </Alert>
          {ok ? <Routes /> : <Settings />}
        </div>
      </HashRouter>
    )
  }
}

const mapDispatch = dispatch => ({
  _getSettings: () => dispatch(getSettings()),
  removeError: () => dispatch(clearError()),
  updateError: err => dispatch(setError(err)),
})

const mapState = state => ({
  error: state.error,
  settings: state.settings,
})

export default connect(mapState, mapDispatch)(App)
